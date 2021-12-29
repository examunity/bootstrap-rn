import { Platform, StyleSheet } from 'react-native';
import { BOOTSTYLE_STYLE } from './symbols';

const hasInteraction = ({ scopes }) =>
  scopes.some((scope) => scope.type === 'selector');

function createStyle(definitions) {
  // If there is only one without conditions
  if (definitions.length === 1 && definitions[0].scopes.length === 0) {
    return definitions[0].declarations;
  }

  const styles = StyleSheet.create({
    ...definitions.map((item) => item.declarations),
  });

  const resolve = ({ media, interaction = {} }) => {
    const basicStyles = [];
    const interactionStyles = [];

    Object.values(styles).forEach((style, key) => {
      const active = definitions[key].scopes.every((scope) => {
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
      });

      if (active) {
        if (hasInteraction(definitions[key])) {
          interactionStyles.push(style);
        } else {
          basicStyles.push(style);
        }
      }
    });

    return [basicStyles, interactionStyles];
  };

  resolve.$$typeof = BOOTSTYLE_STYLE;

  return resolve;
}

export default createStyle;
