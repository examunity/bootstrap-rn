import { Platform } from 'react-native';
import { getPropertyName, getStylesForProperty } from 'css-to-react-native';
import rem from './rem';
import formula from './formula';
import rgba from './rgba';
import backgroundSize from './properties/backgroundSize';
import backgroundPosition from './properties/backgroundPosition';
import backgroundPositionX from './properties/backgroundPositionX';
import backgroundPositionY from './properties/backgroundPositionY';
import type { BaseStyle } from '../../types';

type Value = string | ((v: object, k: string | undefined) => string);

export type SelectorStyleScope = {
  type: 'selector';
  name: 'hover' | 'focus' | 'focus-visible' | 'active';
};

export type MixinStyleScope = {
  type: 'mixin';
  name:
    | 'media-breakpoint-between'
    | 'media-breakpoint-down'
    | 'media-breakpoint-only'
    | 'media-breakpoint-up'
    | 'platform';
  args: string[];
};

export type StyleScope = SelectorStyleScope | MixinStyleScope;

export type RootNode = {
  type: 'root';
  // eslint-disable-next-line no-use-before-define
  children: Node[];
};

export type VariableNode = { type: 'variable'; name: string; value: Value[] };

export type DeclarationNode = {
  type: 'declaration';
  name: string;
  value: Value[];
};

export type BlockNode = {
  type: 'block';
  scopes: StyleScope[];
  // eslint-disable-next-line no-use-before-define
  children: Node[];
};

export type Node = RootNode | VariableNode | DeclarationNode | BlockNode;

export type StyleDefinition = {
  scopes: StyleScope[];
  declarations: BaseStyle;
  variables: Record<string, string>;
};

type Options = {
  key?: string;
  preferTheme?: boolean;
};

const urlRE = /^url\(.*?\)$/g;

const applyVariables = (
  variables: Record<string, string>,
  key: string | undefined,
  value: Value,
) => (typeof value === 'function' ? value(variables, key) : value);

const applyTransforms = (result: string) => {
  // Do not transform values that belong to an url().
  if (result.match(urlRE)) {
    return result;
  }

  return rgba(formula(rem(result)));
};

const resolveValue = (
  value: Value[],
  definition: StyleDefinition,
  theme: object,
  options: Options,
) => {
  const variables = options.preferTheme
    ? { ...definition.variables, ...theme }
    : { ...theme, ...definition.variables };

  // If there is only one part, we allow other results than strings as well.
  if (value.length === 1) {
    const result = applyVariables(variables, options.key, value[0]);

    return typeof result === 'string' ? applyTransforms(result) : result;
  }

  const stringifiedResult = value.reduce(
    (previous, current) =>
      `${previous}${applyVariables(variables, options.key, current)}`,
    '',
  );

  return applyTransforms(stringifiedResult as string);
};

export default function transform(
  children: Node[],
  theme: object,
  options: Options = {},
  scopes: StyleScope[] = [],
  variables: Record<string, string> = {},
) {
  let definitions: StyleDefinition[] = [
    {
      scopes,
      declarations: {},
      variables: { ...variables },
    },
  ];

  children.forEach((child) => {
    if (child.type === 'variable' || child.type === 'declaration') {
      // Transform value to react native compatible value.
      const value = resolveValue(child.value, definitions[0], theme, options);

      if (child.type === 'variable') {
        definitions[0].variables[child.name] = value;
      }

      // Only add value if value is not null.
      if (child.type === 'declaration' && value !== 'null') {
        if (child.name === 'box-shadow') {
          if (Platform.OS === 'web') {
            Object.assign(definitions[0].declarations, {
              boxShadow: value,
            });
          }
        } else if (child.name === 'margin-vertical') {
          Object.assign(definitions[0].declarations, {
            ...getStylesForProperty('marginTop', value),
            ...getStylesForProperty('marginBottom', value),
          });
        } else if (child.name === 'margin-horizontal') {
          // Among other things workaround for react-native issue #350
          // https://github.com/facebook/react-native/issues/350#issuecomment-375238958
          Object.assign(definitions[0].declarations, {
            ...getStylesForProperty('marginLeft', value),
            ...getStylesForProperty('marginRight', value),
          });
        } else if (child.name === 'padding-vertical') {
          Object.assign(definitions[0].declarations, {
            ...getStylesForProperty('paddingTop', value),
            ...getStylesForProperty('paddingBottom', value),
          });
        } else if (child.name === 'padding-horizontal') {
          Object.assign(definitions[0].declarations, {
            ...getStylesForProperty('paddingLeft', value),
            ...getStylesForProperty('paddingRight', value),
          });
        } else if (child.name === 'background-size') {
          Object.assign(definitions[0].declarations, backgroundSize(value));
        } else if (child.name === 'background-position') {
          Object.assign(definitions[0].declarations, backgroundPosition(value));
        } else if (child.name === 'background-position-x') {
          Object.assign(
            definitions[0].declarations,
            backgroundPositionX(value),
          );
        } else if (child.name === 'background-position-y') {
          Object.assign(
            definitions[0].declarations,
            backgroundPositionY(value),
          );
        } else if (
          child.name === 'border-color' &&
          value.split(' ').length === 1
        ) {
          // Workaround for react-native issue #19981
          // https://github.com/facebook/react-native/issues/19981
          Object.assign(definitions[0].declarations, {
            borderColor: value,
          });
        } else {
          const style = getStylesForProperty(
            getPropertyName(child.name),
            value,
          );

          // Workaround for react-native issue #47235
          // https://github.com/facebook/react-native/issues/47235
          if (Platform.OS === 'ios') {
            if (style.borderTopLeftRadius) {
              style.borderTopLeftRadius = Math.round(
                style.borderTopLeftRadius as number,
              );
            }
            if (style.borderTopRightRadius) {
              style.borderTopRightRadius = Math.round(
                style.borderTopRightRadius as number,
              );
            }
            if (style.borderBottomRightRadius) {
              style.borderBottomRightRadius = Math.round(
                style.borderBottomRightRadius as number,
              );
            }
            if (style.borderBottomLeftRadius) {
              style.borderBottomLeftRadius = Math.round(
                style.borderBottomLeftRadius as number,
              );
            }
          }

          // TODO: Pre-process css-to-react-native transformation, so that we only
          // need to insert theme variables here.
          Object.assign(definitions[0].declarations, style);
        }
      }
    }

    if (child.type === 'block') {
      definitions = definitions.concat(
        transform(
          child.children,
          theme,
          options,
          // Add child scopes to current scopes.
          [...scopes, ...child.scopes],
          // Pass down variables, so that we can extend them.
          definitions[0].variables,
        ),
      );
    }
  });

  // Filter empty definitions and return.
  return definitions.filter(
    (definition) =>
      Object.keys(definition.declarations).length > 0 ||
      Object.keys(definition.variables).length > 0,
  );
}
