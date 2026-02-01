import React from 'react';
import type { OverlayPlacement } from '../../types';

type TooltipContextType = {
  placement: OverlayPlacement;
  floating?: boolean;
};

const TooltipContext = React.createContext<TooltipContextType | null>(null);

TooltipContext.displayName = 'TooltipContext';

export default TooltipContext;
