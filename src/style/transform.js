import { Platform, PixelRatio } from 'react-native';
import { getPropertyName, getStylesForProperty } from 'css-to-react-native';

const transformREMUnitRE = /([+-\d.Ee]+)rem/;

const transformREMUnit = (value) => {
  if (Platform.OS === 'web') {
    return value;
  }

  return value.replace(
    transformREMUnitRE,
    (_, number) => `${PixelRatio.getFontScale() * 16 * number}px`,
  );
};

const applyVariables = (variables, value) =>
  typeof value === 'function' ? value(variables) : value;

const resolveValue = (value, definition, theme) => {
  const variables = { ...theme.variables, ...definition.variables };

  return transformREMUnit(
    value.reduce(
      (previous, current) => `${previous}${applyVariables(variables, current)}`,
      '',
    ),
  );
};

export default function transform(
  children,
  theme,
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
    if (child.type === 'variable') {
      definitions[0].variables[child.name] = resolveValue(
        child.value,
        definitions[0],
        theme,
      );
    }

    if (child.type === 'declaration') {
      // Transform value to react native compatible value.

      // TODO: Pre-process css-to-react-native transformation, so that we only
      // need to insert theme variables here.
      Object.assign(
        definitions[0].declarations,
        getStylesForProperty(
          getPropertyName(child.name),
          resolveValue(child.value, definitions[0], theme),
        ),
      );
    }

    if (child.type === 'block') {
      definitions = definitions.concat(
        transform(
          child.children,
          theme,
          // Add child scopes to current scopes.
          [...scopes, ...child.scopes],
          // Pass down variables, so that we can extend them.
          definitions[0].variables,
        ),
      );
    }
  });

  return definitions;
}
