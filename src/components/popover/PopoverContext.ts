import React from 'react';
import type { Placement } from '@react-types/overlays';
import { ExtendedViewStyle, StyleProp } from '../../types';

type PopoverContextType = {
  placement: Placement;
  popper?: boolean;
  arrowStyle?: StyleProp<ExtendedViewStyle>;
};

const PopoverContext = React.createContext<PopoverContextType | null>(null);

PopoverContext.displayName = 'PopoverContext';

export default PopoverContext;
