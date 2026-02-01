import { createContext } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { PressableRef } from '../Pressable';
import type { ViewRef } from '../View';
import { OverlayAlignment } from '../../types';

export type DropdownDirection = 'up' | 'down' | 'start' | 'end';

export interface DropdownContextProps {
  identifier: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  align: OverlayAlignment | null;
  setAlign: React.Dispatch<React.SetStateAction<OverlayAlignment | null>>;
  direction: DropdownDirection;
  display: string;
  trigger: {
    ref: React.RefObject<PressableRef | null>;
    getProps: (props: Record<string, unknown>) => Record<string, unknown>;
  };
  content: {
    ref: React.RefObject<ViewRef | null>;
    getProps: (props: Record<string, unknown>) => Record<string, unknown>;
    style: StyleProp<ViewStyle>;
  };
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

DropdownContext.displayName = 'DropdownContext';

export default DropdownContext;
