import { Platform, StyleSheet } from 'react-native';
import { BOOTSTYLE_STYLE } from './symbols';

const matchesPlatform = ({ scopes }) =>
  scopes.every((scope) => {
    if (scope.type !== 'directive' || scope.name !== 'platform') {
      return true;
    }

    return scope.args[0] === 'native'
      ? Platform.OS === 'android' || Platform.OS === 'ios'
      : Platform.OS === scope.args[0];
  });

const hasInteraction = ({ scopes }) =>
  scopes.some((scope) => scope.type === 'selector');

function createStyle(definitions) {
  // If there is only one definition without conditions, return.
  if (definitions.length === 1 && definitions[0].scopes.length === 0) {
    return definitions[0].declarations;
  }

  // Filter definitions that should not be used on this platform.
  const platformDefinitions = definitions.filter(matchesPlatform);

  const styles = StyleSheet.create({
    ...platformDefinitions.map((item) => item.declarations),
  });

  const resolve = ({ media, interaction = {} }) => {
    const basicStyles = [];
    const interactionStyles = [];

    Object.values(styles).forEach((style, key) => {
      const active = platformDefinitions[key].scopes.every((scope) => {
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
            // Return true, because we have already checked the platform in matchesPlatform above.
            return true;
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
        if (hasInteraction(platformDefinitions[key])) {
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
