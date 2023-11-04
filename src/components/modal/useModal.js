import { useContext, useEffect, useMemo } from 'react';
import Context from '../../Context';

export default function useModal(visible, scrollable) {
  const context = useContext(Context);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    context.scrollbars.hide();

    return () => {
      context.scrollbars.show();
    };
  }, [visible]);

  return useMemo(
    () => ({
      scrollable,
    }),
    [scrollable],
  );
}
