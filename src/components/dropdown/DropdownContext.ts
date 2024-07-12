import { createContext } from 'react';
import type { ViewRef } from '../View';

export type DropdownDirection = 'up' | 'down' | 'start' | 'end';

export interface DropdownContextProps {
  identifier: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRef: React.RefObject<ViewRef>;
  direction: DropdownDirection;
  center: boolean;
  display: string;
  autoClose: string | boolean;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

DropdownContext.displayName = 'DropdownContext';

export default DropdownContext;
