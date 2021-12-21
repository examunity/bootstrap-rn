import { StyleSheet } from 'react-native';

function createStyle(definitions) {
  // If there is only one without conditions
  if (definitions.length === 1 && definitions[0].scopes.length === 0) {
    return definitions[0].declarations;
  }

  const styles = StyleSheet.create({
    ...definitions.map((item) => item.declarations),
  });

  return ({ interaction, media }) => {
    const activeStyles = Object.values(styles).filter((_, key) =>
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

    return activeStyles;
  };
}

export default createStyle;
