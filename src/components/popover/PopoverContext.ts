import React from 'react';
import { Placement } from '../../types';

type PopoverContextType = {
  placement: Placement;
  popper?: boolean;
  arrowStyle?: unknown;
};

const PopoverContext = React.createContext<PopoverContextType | null>(null);

PopoverContext.displayName = 'PopoverContext';

export default PopoverContext;
