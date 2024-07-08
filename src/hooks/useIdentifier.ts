import { useRef } from 'react';
import Context from '../Context';
import useForcedContext from './useForcedContext';

export default function useIdentifier(prefix: string): string {
  const context = useForcedContext(Context);

  const ref = useRef<string | null>(null);

  if (!ref.current) {
    ref.current = context.generateKey(prefix);
  }

  return ref.current;
}
