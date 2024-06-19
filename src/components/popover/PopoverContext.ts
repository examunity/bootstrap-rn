import React from 'react';
import type { Placement } from '@react-types/overlays';

type PopoverContextType = {
  placement: Placement;
  popper?: boolean;
  arrowStyle?: unknown;
};

const PopoverContext = React.createContext<PopoverContextType | null>(null);

PopoverContext.displayName = 'PopoverContext';

export default PopoverContext;
