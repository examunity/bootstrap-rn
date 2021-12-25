import { getPropertyName, getStylesForProperty } from 'css-to-react-native';
import rem from './rem';
import percentage from './percentage';
import formula from './formula';
import rgba from './rgba';

const applyVariables = (variables, value) =>
  typeof value === 'function' ? value(variables) : value;

const resolveValue = (value, definition, theme) => {
  const variables = { ...theme.variables, ...definition.variables };

  const stringifiedValue = value.reduce(
    (previous, current) => `${previous}${applyVariables(variables, current)}`,
    '',
  );

  return rem(rgba(formula(percentage(stringifiedValue))));
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
    if (child.type === 'variable' || child.type === 'declaration') {
      // Transform value to react native compatible value.
      const value = resolveValue(child.value, definitions[0], theme);

      if (child.type === 'variable') {
        definitions[0].variables[child.name] = value;
      }

      // Only add value if value is not null.
      if (child.type === 'declaration' && value !== 'null') {
        // TODO: Pre-process css-to-react-native transformation, so that we only
        // need to insert theme variables here.
        Object.assign(
          definitions[0].declarations,
          getStylesForProperty(getPropertyName(child.name), value),
        );
      }
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
