import applyTheme from './utils/applyTheme';
import transform from './utils/transform';

export default function css(fragments, ...values) {
  return (theme) => {
    const result = transform(applyTheme(theme, fragments, values));

    // If there is only one
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
            if (condition.type === 'hover') {
              return state.hover;
            }

            if (condition.type === 'focus') {
              return state.focus;
            }

            if (condition.type === 'active') {
              return state.active;
            }

            if (condition.type === 'media') {
              return (
                state.media.up(condition.min) && state.media.down(condition.max)
              );
            }

            throw new Error(`Unknown condition type "${condition.type}"`);
          }),
        )
        .map((_, key) => styles[key]);
    };
  };
}
