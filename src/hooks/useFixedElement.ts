import { useContext, useRef, useEffect } from 'react';
import Context, { ContextType } from '../Context';

export default function useFixedElement() {
  const context = useContext<ContextType | null>(Context);
  const ref = useRef(null);

  useEffect(() => {
    const link = context?.addFixedElement(ref);

    return () => {
      link?.remove();
    };
  }, [context]);

  return ref;
}
