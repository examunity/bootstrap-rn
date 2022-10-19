import { Platform } from 'react-native';
import { getPropertyName, getStylesForProperty } from 'css-to-react-native';
import rem from './rem';
import formula from './formula';
import rgba from './rgba';
import backgroundSize from './properties/backgroundSize';
import backgroundPosition from './properties/backgroundPosition';
import backgroundPositionX from './properties/backgroundPositionX';
import backgroundPositionY from './properties/backgroundPositionY';

const urlRE = /^url\(.*?\)$/g;

const applyVariables = (variables, key, value) =>
  typeof value === 'function' ? value(variables, key) : value;

const applyTransforms = (result) => {
  // Do not transform values that belong to an url().
  if (result.match(urlRE)) {
    return result;
  }

  return rgba(formula(rem(result)));
};

const resolveValue = (value, definition, theme, options) => {
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

  return applyTransforms(stringifiedResult);
};

export default function transform(
  children,
  theme,
  options = {},
  scopes = [],
  variables = {},
) {
  let definitions = [
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
          // TODO: Pre-process css-to-react-native transformation, so that we only
          // need to insert theme variables here.
          Object.assign(
            definitions[0].declarations,
            getStylesForProperty(getPropertyName(child.name), value),
          );
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
