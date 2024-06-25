import React from 'react';
import {
  ExtendedViewStyle,
  StyleProp,
  TransformedPlacementAxis,
} from '../../types';

type PopoverContextType = {
  placement: TransformedPlacementAxis;
  popper?: boolean;
  arrowStyle?: StyleProp<ExtendedViewStyle>;
};

const PopoverContext = React.createContext<PopoverContextType | null>(null);

PopoverContext.displayName = 'PopoverContext';

export default PopoverContext;
