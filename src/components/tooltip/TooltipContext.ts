import React from 'react';
import type { Placement } from '@react-types/overlays';
import { ExtendedTextStyle, StyleProp } from '../../types';

type TooltipContextType = {
  placement: Placement | undefined;
  popper?: boolean;
  arrowStyle?: StyleProp<ExtendedTextStyle>;
};

const TooltipContext = React.createContext<TooltipContextType | null>(null);

TooltipContext.displayName = 'TooltipContext';

export default TooltipContext;
