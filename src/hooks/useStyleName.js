import { useContext, useMemo } from 'react';
import Context from '../Context';

function useStyleName(source) {
  const { utilitiesStyles } = useContext(Context);

  return useMemo(() => {
    if (!source) {
      return null;
    }

    const names = source.split(' ');

    return names.map((name) => {
      if (!utilitiesStyles[name]) {
        throw new Error(`Unknown utility style "${name}".`);
      }

      return utilitiesStyles[name];
    });
  }, [source]);
}

export default useStyleName;
