import {
  StyleSheet,
  ViewStyle as BaseViewStyle,
  ImageStyle as BaseImageStyle,
  TextStyle as BaseTextStyle,
} from 'react-native';
import mediaBreakpointBetween from './mixins/mediaBreakpointBetween';
import mediaBreakpointDown from './mixins/mediaBreakpointDown';
import mediaBreakpointOnly from './mixins/mediaBreakpointOnly';
import mediaBreakpointUp from './mixins/mediaBreakpointUp';
import platform from './mixins/platform';
import type { StyleDefinition } from './transform';
import { SpecialInteractionStyle, UniversalStyle } from '../types';

export const BOOTSTRAP_RN_STYLE = Symbol.for('bootstrap-rn.style');

const mixins = {
  'media-breakpoint-between': mediaBreakpointBetween,
  'media-breakpoint-down': mediaBreakpointDown,
  'media-breakpoint-only': mediaBreakpointOnly,
  'media-breakpoint-up': mediaBreakpointUp,
  platform,
};

const hasInteraction = ({ scopes }: StyleDefinition) =>
  scopes.some((scope) => scope.type === 'selector');

function createStyle(definitions: StyleDefinition[]): UniversalStyle {
  // If there is only one definition without conditions, return.
  if (definitions.length === 1 && definitions[0].scopes.length === 0) {
    return definitions[0].declarations;
  }

  // Filter definitions that should not be used based on mixins.
  const platformDefinitions = definitions.filter((item) =>
    item.scopes.every((scope) => {
      if (scope.type !== 'mixin') {
        return true;
      }

      return mixins[scope.name].include(scope);
    }),
  );

  // Create style sheets.
  const styles = StyleSheet.create({
    ...platformDefinitions.map((item) => item.declarations),
  }) as BaseViewStyle | BaseImageStyle | BaseTextStyle;

  const resolve: SpecialInteractionStyle<UniversalStyle> = (state) => {
    const { interaction } = state;
    const basicStyles: (BaseViewStyle | BaseImageStyle | BaseTextStyle)[] = [];
    const interactionStyles: (
      | BaseViewStyle
      | BaseImageStyle
      | BaseTextStyle
    )[] = [];

    Object.values(styles).forEach((style, key) => {
      const active = platformDefinitions[key].scopes.every((scope) => {
        if (scope.type === 'selector') {
          if (scope.name === 'hover') {
            return interaction && interaction.hover;
          }

          if (scope.name === 'focus') {
            return interaction && interaction.focus;
          }

          if (scope.name === 'focus-visible') {
            return interaction && interaction.focusVisible;
          }

          if (scope.name === 'active') {
            return interaction && interaction.active;
          }
        }

        if (scope.type === 'mixin') {
          return mixins[scope.name].apply(scope, state);
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

  resolve.$$typeof = BOOTSTRAP_RN_STYLE;

  return resolve;
}

export default createStyle;
