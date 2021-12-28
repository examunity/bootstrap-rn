import { useContext, useMemo } from 'react';
import Context from '../Context';

const normalize = (style) => {
  if (!Array.isArray(style)) {
    return [style];
  }

  return style
    .filter((val) => !!val)
    .reduce((res, val) => [...res, ...normalize(val)], []);
};

function useStyle(style, styleName) {
  const { utilitiesStyles } = useContext(Context);

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
    // Put basic styles first, then interaction styles for hover, focus, pressed.
    const basicStyles = [];
    const priorityStyles = [];

    styles.forEach((def) => {
      if (typeof def === 'function') {
        const resolved = def.resolve(state);

        resolved.forEach((resolvedDef) => {
          if (resolvedDef.priority) {
            priorityStyles.push(resolvedDef.value);
          } else {
            basicStyles.push(resolvedDef.value);
          }
        });
      } else {
        basicStyles.push(def);
      }
    });

    return [basicStyles, priorityStyles];
  };
}

export default useStyle;
