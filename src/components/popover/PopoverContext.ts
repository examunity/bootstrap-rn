import React from 'react';
import type { Placement } from '@react-types/overlays';
import { ExtendedTextStyle, StyleProp } from '../../types';

type PopoverContextType = {
  placement: Placement | undefined;
  popper?: boolean;
  arrowStyle?: StyleProp<ExtendedTextStyle>;
};

const PopoverContext = React.createContext<PopoverContextType | null>(null);

PopoverContext.displayName = 'PopoverContext';

export default PopoverContext;
