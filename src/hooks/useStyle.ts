import { useMemo } from 'react';
import type { StyleProp, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { BOOTSTRAP_RN_STYLE } from '../style/createStyle';
import Context from '../Context';
import type { UniversalStyle, StyleName, InteractionState } from '../types';
import useForcedContext from './useForcedContext';

type BaseStyle = StyleProp<ViewStyle | ImageStyle | TextStyle>;

type FalsyValue = false | undefined | null | '' | 0;

const normalize = <T extends UniversalStyle>(
  style: T | (T | FalsyValue)[],
): UniversalStyle[] => {
  if (!Array.isArray(style)) {
    return [style];
  }

  return style
    .filter((val: T | FalsyValue): val is T => !!val)
    .reduce((res, val) => [...res, ...normalize(val)], []);
};

export default function useStyle(style: UniversalStyle, styleName?: StyleName) {
  const { utilities: utilitiesStyles } = useForcedContext(Context);

  const utilities = useMemo(() => {
    if (!styleName) {
      return null;
    }

    const names = styleName.split(' ');

    return names.map((name) => {
      if (!utilitiesStyles[name]) {
        // eslint-disable-next-line no-console
        console.warn(`Unknown utility style "${name}".`);

        return null;
      }

      return utilitiesStyles[name];
    });
  }, [styleName]);

  const styles = normalize(utilities ? [style, ...utilities] : style);

  return (state: InteractionState) => {
    const basicStyles: BaseStyle[] = [];
    const interactionStyles: BaseStyle[] = [];

    styles.forEach((value) => {
      if (value && value.$$typeof === BOOTSTRAP_RN_STYLE) {
        // Style is a bootstrap style that contains basic and interaction styles.
        const [resolvedBasicStyles, resolvedInteractionStyles] = value(state);

        basicStyles.push(...resolvedBasicStyles);
        interactionStyles.push(...resolvedInteractionStyles);
      } else if (typeof value === 'function') {
        // Style is some other custom function type style.
        basicStyles.push(value(state) as BaseStyle);
      } else {
        // Style is basic object style.
        basicStyles.push(value as BaseStyle);
      }
    });

    // Put basic styles first, then interaction styles for hover, focus, pressed.
    return [...basicStyles, ...interactionStyles];
  };
}
