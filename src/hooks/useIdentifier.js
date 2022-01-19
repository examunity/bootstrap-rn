import { useContext, useRef } from 'react';
import Context from '../Context';

export default function useIdentifier(prefix) {
  const context = useContext(Context);

  const ref = useRef();

  if (!ref.current) {
    ref.current = context.generateKey(prefix);
  }

  return ref.current;
}
