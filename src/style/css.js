import { StyleSheet } from 'react-native';
import applyTheme from './utils/applyTheme';
import parse from './parse';

export default function css(fragments, ...values) {
  return (theme) => {
    const result = parse(applyTheme(theme, fragments, values));

    // If there is only one without conditions
    if (result.length === 1 && result[0].conditions.length === 0) {
      return result[0].declarations;
    }

    const styles = StyleSheet.create({
      ...result.map((item) => item.declarations),
    });

    return (state) => {
      result
        .filter((item) =>
          item.conditions.every((condition) => {
            if (condition.type === 'selector') {
              if (condition.name === 'hover') {
                return state.hover;
              }

              if (condition.name === 'focus') {
                return state.focus;
              }

              if (condition.name === 'active') {
                return state.active;
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
        )
        .map((_, key) => styles[key]);
    };
  };
}
