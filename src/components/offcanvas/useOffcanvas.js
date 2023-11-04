import { useContext, useEffect, useMemo } from 'react';
import Context from '../../Context';

export default function useOffcanvas(visible, scroll) {
  const context = useContext(Context);

  useEffect(() => {
    if (!visible || scroll) {
      return undefined;
    }

    context.scrollbars.hide();

    return () => {
      context.scrollbars.show();
    };
  }, [visible, scroll]);

  return useMemo(() => ({}), []);
}
