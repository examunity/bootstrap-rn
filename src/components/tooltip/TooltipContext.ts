import React from 'react';
import {
  ExtendedViewStyle,
  StyleProp,
  TransformedPlacementAxis,
} from '../../types';

type TooltipContextType = {
  placement: TransformedPlacementAxis;
  popper?: boolean;
  arrowStyle?: StyleProp<ExtendedViewStyle>;
};

const TooltipContext = React.createContext<TooltipContextType | null>(null);

TooltipContext.displayName = 'TooltipContext';

export default TooltipContext;
