import type {
  Placement as BasePlacement,
  PlacementAxis as BasePlacementAxis,
} from '@react-types/overlays';

export type ContainerMaxWidths = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

export type ThemeVariables = {
  white: string;
  black: string;
  blue: string;
  indigo: string;
  purple: string;
  pink: string;
  red: string;
  yellow: string;
  orange: string;
  green: string;
  teal: string;
  cyan: string;
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

export type RnPlacement = BasePlacement;
export type RnPlacementAxis = BasePlacementAxis;

export type Placement =
  | RnPlacement
  | 'top center'
  | 'bottom center'
  | 'top center';
