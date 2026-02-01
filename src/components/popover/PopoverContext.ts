import React from 'react';
import type { OverlayPlacement } from '../../types';

type PopoverContextType = {
  placement: OverlayPlacement;
  floating?: boolean;
};

const PopoverContext = React.createContext<PopoverContextType | null>(null);

PopoverContext.displayName = 'PopoverContext';

export default PopoverContext;
