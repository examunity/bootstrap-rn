import { createPortal } from 'react-dom';

type FloatingProps = {
  children: React.ReactNode;
  id: string;
  onClose?: () => void;
};

function Floating({ children }: FloatingProps) {
  return createPortal(children, document.body);
}

export default Floating;
