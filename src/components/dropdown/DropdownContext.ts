import { createContext } from 'react';

export type DropdownDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'start'
  | 'end';

type DropdownContextProps = {
  identifier: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRef: React.RefObject<ViewRef>;
  direction: DropdownDirection;
  center: boolean;
  display: string;
  autoClose: string | boolean;
};

const DropdownContext = createContext<DropdownContextProps | null>(null);

DropdownContext.displayName = 'DropdownContext';

export default DropdownContext;
