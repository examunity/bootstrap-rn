import { useContext, useEffect, useMemo } from 'react';
import Context from '../../Context';

export default function useModal(visible: boolean, scrollable: boolean) {
  const context = useContext(Context);

  useEffect(() => {
    if (!visible || !context) {
      return undefined;
    }

    context.scrollbars.hide();

    return () => {
      context.scrollbars.show();
    };
  }, [visible, context]);

  return useMemo(
    () => ({
      scrollable,
    }),
    [scrollable],
  );
}
