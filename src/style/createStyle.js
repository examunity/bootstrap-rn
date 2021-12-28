import { Platform, StyleSheet } from 'react-native';

function createStyle(definitions) {
  // If there is only one without conditions
  if (definitions.length === 1 && definitions[0].scopes.length === 0) {
    return definitions[0].declarations;
  }

  const styles = StyleSheet.create({
    ...definitions.map((item) => item.declarations),
  });

  const resolve = ({ interaction = {}, media }) => {
    const activeDefinitions = Object.values(styles)
      .map((value, key) => ({
        priority: definitions[key].scopes.some(
          (scope) => scope.type === 'selector',
        ),
        value,
      }))
      .filter((_, key) =>
        definitions[key].scopes.every((scope) => {
          if (scope.type === 'selector') {
            if (scope.name === 'hover') {
              return !!interaction.hovered;
            }

            if (scope.name === 'focus') {
              return !!interaction.focused;
            }

            if (scope.name === 'active') {
              return !!interaction.pressed;
            }
          }

          if (scope.type === 'directive') {
            if (scope.name === 'platform') {
              return scope.args[0] === 'native'
                ? Platform.OS === 'android' || Platform.OS === 'ios'
                : Platform.OS === scope.args[0];
            }
            if (scope.name === 'media-breakpoint-up') {
              return media.up(scope.args[0]);
            }
            if (scope.name === 'media-breakpoint-down') {
              return media.down(scope.args[0]);
            }
            if (scope.name === 'media-breakpoint-only') {
              return media.up(scope.args[0]) && media.down(scope.args[0]);
            }
            if (scope.name === 'media-breakpoint-between') {
              return media.up(scope.args[0]) && media.down(scope.args[1]);
            }
          }

          throw new Error(`Unknown scope type "${scope.type}"`);
        }),
      );

    return activeDefinitions;
  };

  const result = (state) => resolve(state).map((def) => def.value);

  result.resolve = resolve;

  return result;
}

export default createStyle;
