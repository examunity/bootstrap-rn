import { useContext, useRef, useEffect } from 'react';
import Context from '../Context';

export default function useFixedElement() {
  const context = useContext(Context);
  const ref = useRef();

  useEffect(() => {
    const link = context.addFixedElement(ref);

    return () => {
      link.remove();
    };
  }, []);

  return ref;
}
