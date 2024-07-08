import { useContext, useEffect, useMemo } from 'react';
import Context from '../../Context';

export default function useOffcanvas(visible: boolean, scroll: boolean) {
  const context = useContext(Context);

  useEffect(() => {
    if (!visible || scroll) {
      return () => {}; // No cleanup needed
    }

    context?.scrollbars.hide();

    return () => {
      context?.scrollbars.show();
    };
  }, [visible, scroll, context?.scrollbars]);

  return useMemo(() => ({}), []); // You can return any memoized value here if needed
}
