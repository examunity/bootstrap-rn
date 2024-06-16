import { useRef, useEffect } from 'react';
import Context from '../Context';
import useForcedContext from './useForcedContext';

export default function useFixedElement() {
  const context = useForcedContext(Context);
  const ref = useRef(null);

  useEffect(() => {
    const link = context.addFixedElement(ref);

    return () => {
      link.remove();
    };
  }, [context]);

  return ref;
}
