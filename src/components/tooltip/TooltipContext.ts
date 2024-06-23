import React from 'react';
import type { Placement } from '@react-types/overlays';
import { ExtendedViewStyle, StyleProp } from '../../types';

type TooltipContextType = {
  placement: Placement;
  popper?: boolean;
  arrowStyle?: StyleProp<ExtendedViewStyle>;
};

const TooltipContext = React.createContext<TooltipContextType | null>(null);

TooltipContext.displayName = 'TooltipContext';

export default TooltipContext;
