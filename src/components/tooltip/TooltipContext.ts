import React from 'react';
import type { Placement } from '../../types';

type TooltipContextType = {
  placement: Placement;
  popper?: boolean;
  arrowStyle?: unknown;
};

const TooltipContext = React.createContext<TooltipContextType | null>(null);

TooltipContext.displayName = 'TooltipContext';

export default TooltipContext;
