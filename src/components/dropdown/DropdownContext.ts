import { createContext } from 'react';

type DropdownContextProps = {
  visible: boolean;
  toggle?: () => void;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownContext = createContext<DropdownContextProps | null>(null);

DropdownContext.displayName = 'DropdownContext';

export default DropdownContext;
