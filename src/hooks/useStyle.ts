import { useMemo } from 'react';
import { BOOTSTRAP_RN_STYLE } from '../style/createStyle';
import Context from '../Context';
import type {
  StyleProp,
  StyleName,
  InteractionState,
  ExtendedStyle,
  ExtendedStyleType,
  BaseStyle,
} from '../types';
import useForcedContext from './useForcedContext';

type FalsyValue = false | undefined | null | '' | 0;

const normalize = <T extends ExtendedStyle | ExtendedStyle[]>(
  style: StyleProp<T> | (StyleProp<T> | FalsyValue)[],
): StyleProp<T>[] => {
  if (!Array.isArray(style)) {
    return [style];
  }

  return style
    .filter((val: T | FalsyValue): val is T => !!val)
    .reduce((res, val) => [...res, ...normalize(val)], []);
};

export default function useStyle<T extends BaseStyle>(
  style: StyleProp<ExtendedStyleType<T>>,
  styleName?: StyleName,
) {
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

  const styles = normalize<ExtendedStyleType<T> | ExtendedStyleType<T>[]>(
    utilities ? [style, ...utilities] : style,
  );

  return (state: InteractionState) => {
    const basicStyles: T[] = [];
    const interactionStyles: T[] = [];

    styles.forEach((value) => {
      // @ts-expect-error $$typeof is defined on InteractionStyle<T> but somehow leads to this error.
      if (value && value.$$typeof === BOOTSTRAP_RN_STYLE) {
        // Style is a bootstrap style that contains basic and interaction styles.
        // @ts-expect-error $$typeof is defined on InteractionStyle<T> but somehow leads to this error.
        const [resolvedBasicStyles, resolvedInteractionStyles] = value(state);

        basicStyles.push(...(resolvedBasicStyles as T[]));
        interactionStyles.push(...(resolvedInteractionStyles as T[]));
      } else if (typeof value === 'function') {
        // Style is some other custom function type style.
        basicStyles.push(value(state) as T);
      } else {
        // Style is basic object style.
        basicStyles.push(value as T);
      }
    });

    // Put basic styles first, then interaction styles for hover, focus, pressed.
    return [...basicStyles, ...interactionStyles];
  };
}
