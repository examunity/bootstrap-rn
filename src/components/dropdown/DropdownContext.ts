import { createContext } from 'react';
import { UseDropdownReturnType } from './useDropdown';

interface DropdownContextProps extends UseDropdownReturnType {
  visible: boolean;
  toggle: () => void;
  setVisible: (visible: boolean) => void;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

DropdownContext.displayName = 'DropdownContext';

export default DropdownContext;
