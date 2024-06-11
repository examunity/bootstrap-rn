import type { Placement as BasePlacement } from '@react-types/overlays';

export type ContainerMaxWidths = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

export type ThemeVariables = {
  // is this for colors only? seems t.white and t.black are only used as properties and other as ['string']
  white: string;
  black: string;
  containerMaxWidths: ContainerMaxWidths;
  [key: string]: string | ContainerMaxWidths;
};

type ThemeDataReturn = {
  color: unknown;
};

export type ThemeData = (t: ThemeVariables) => ThemeDataReturn;

export type NavbarExpand = true | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type NavbarVariant = 'light' | 'dark';
export type NavVariant = 'tabs' | 'pills';
export type SpinnerVariant = 'border' | 'grow';

export type DropDownDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'start'
  | 'end';

// Copty from @react-native-aria/overlays
export type Axis = 'top' | 'bottom' | 'left' | 'right';
export type PlacementAxis = Axis | 'center';
export type RnPlacement = BasePlacement;

export type Placement =
  | RnPlacement
  | 'top center'
  | 'bottom center'
  | 'top center';
