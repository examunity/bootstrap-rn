import { useContext, useMemo } from 'react';
import { BOOTSTYLE_STYLE } from '../symbols';
import Context from '../Context';

const normalize = (style) => {
  if (!Array.isArray(style)) {
    return [style];
  }

  return style
    .filter((val) => !!val)
    .reduce((res, val) => [...res, ...normalize(val)], []);
};

export default function useStyle(style, styleName) {
  const { utilities: utilitiesStyles } = useContext(Context);

  const utilities = useMemo(() => {
    if (!styleName) {
      return null;
    }

    const names = styleName.split(' ');

    return names.map((name) => {
      if (!utilitiesStyles[name]) {
        throw new Error(`Unknown utility style "${name}".`);
      }

      return utilitiesStyles[name];
    });
  }, [styleName]);

  const styles = normalize(utilities ? [style, ...utilities] : style);

  return (state) => {
    const basicStyles = [];
    const interactionStyles = [];

    styles.forEach((value) => {
      if (value && value.$$typeof === BOOTSTYLE_STYLE) {
        // Style is a bootstrap style that contains basic and interaction styles.
        const [resolvedBasicStyles, resolvedInteractionStyles] = value(state);

        basicStyles.push(...resolvedBasicStyles);
        interactionStyles.push(...resolvedInteractionStyles);
      } else if (typeof value === 'function') {
        // Style is some other custom function type style.
        basicStyles.push(value(state));
      } else {
        // Style is basic object style.
        basicStyles.push(value);
      }
    });

    // Put basic styles first, then interaction styles for hover, focus, pressed.
    return [...basicStyles, ...interactionStyles];
  };
}
