import { useContext, useRef } from 'react';
import Context from '../Context';

export default function useIdentifier(prefix: string): string {
  const context = useContext(Context);

  const ref = useRef<string | null>(null);

  if (!ref.current) {
    ref.current = context.generateKey(prefix) as string;
  }

  return ref.current as string;
}
