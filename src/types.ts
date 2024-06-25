import {
  ViewStyle as BaseViewStyle,
  ImageStyle as BaseImageStyle,
  TextStyle as BaseTextStyle,
} from 'react-native';
import type { Placement, Axis, PlacementAxis } from '@react-types/overlays';
import { BOOTSTRAP_RN_STYLE } from './style/createStyle';

// Media

export type Viewport = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type MediaHandler = {
  up: (point: Viewport) => boolean;
  down: (point: Viewport) => boolean;
  only: (point: Viewport) => boolean;
  between: (lower: Viewport, upper: Viewport) => boolean;
};

// Styles

export type BaseStyle = BaseViewStyle | BaseImageStyle | BaseTextStyle;

export type InteractionState = {
  interaction?: {
    hover?: boolean;
    focus: boolean;
    focusVisible: boolean;
    active?: boolean;
  };
  media: MediaHandler;
};

// Ref: https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/StyleSheet/StyleSheet.d.ts
type Falsy = undefined | null | undefined | false | '';
interface RecursiveArray<T>
  extends Array<T | ReadonlyArray<T> | RecursiveArray<T>> {}
type RegisteredStyle<T> = number & { __registeredStyleBrand: T };

export type SpecialInteractionStyle<T> = {
  (state: InteractionState): [T[], T[]];
  $$typeof: typeof BOOTSTRAP_RN_STYLE;
};

export type ExtendedStyleType<T> =
  | T
  | SpecialInteractionStyle<T>
  | ((state: InteractionState) => T);

export type StyleProp<T> =
  | ExtendedStyleType<T>
  | RegisteredStyle<T>
  | RecursiveArray<ExtendedStyleType<T> | RegisteredStyle<T> | Falsy>
  | Falsy;

export type ExtendedViewStyle = ExtendedStyleType<BaseViewStyle>;

export type ExtendedImageStyle = ExtendedStyleType<BaseImageStyle>;

export type ExtendedTextStyle = ExtendedStyleType<BaseTextStyle>;

export type ExtendedStyle =
  | ExtendedViewStyle
  | ExtendedImageStyle
  | ExtendedTextStyle;

export type StyleName = string;

// Theme

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StyleValue = any;

export type ThemeVariables = {
  [key: string]: StyleValue;
};

export type StyleUtility = {
  responsive?: boolean;
  print?: boolean;
  rfs?: boolean;
  property: string;
  class?: string;
  values: Record<string, string | ((t: ThemeVariables) => StyleValue)>;
};

export type FormValidationState = (t: ThemeVariables) => {
  color: string;
  icon: string;
};

// Overlay

export type Trigger =
  | 'press'
  | 'hover'
  | 'focus'
  | 'manual'
  | 'press hover'
  | 'hover press'
  | 'hover focus'
  | 'focus hover'
  | 'press focus'
  | 'focus press';

export { Placement, Axis, PlacementAxis };

export type TransformedPlacementAxis =
  | 'top'
  | 'bottom'
  | 'end'
  | 'start'
  | 'center';
