import { StyleSheet } from 'react-native';

function createStyle(definitions) {
  // If there is only one without conditions
  if (definitions.length === 1 && definitions[0].conditions.length === 0) {
    return definitions[0].declarations;
  }

  const styles = StyleSheet.create({
    ...definitions.map((item) => item.declarations),
  });

  return (state) => {
    const activeStyles = Object.values(styles).filter((_, key) =>
      definitions[key].conditions.every((condition) => {
        if (condition.type === 'selector') {
          if (condition.name === 'hover') {
            return !!state.interaction.hovered;
          }

          if (condition.name === 'focus') {
            return !!state.interaction.focused;
          }

          if (condition.name === 'active') {
            return !!state.interaction.pressed;
          }
        }

        if (condition.type === 'directive') {
          if (condition.name === 'media-breakpoint-up') {
            return state.media.up(condition.args[0]);
          }
          if (condition.name === 'media-breakpoint-down') {
            return state.media.down(condition.args[0]);
          }
          if (condition.name === 'media-breakpoint-only') {
            return (
              state.media.up(condition.args[0]) &&
              state.media.down(condition.args[0])
            );
          }
          if (condition.name === 'media-breakpoint-between') {
            return (
              state.media.up(condition.args[0]) &&
              state.media.down(condition.args[1])
            );
          }
        }

        throw new Error(`Unknown condition type "${condition.type}"`);
      }),
    );

    return activeStyles;
  };
}

export default createStyle;
