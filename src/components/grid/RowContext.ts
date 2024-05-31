import { createContext } from 'react';

interface RowContext {
  // value?: unknown;
}

const RowContext = createContext<RowContext | null>(null);

RowContext.displayName = 'RowContext';

export default RowContext;
