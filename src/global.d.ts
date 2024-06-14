import type { View as BaseView, Text as BaseText } from 'react-native';
import {
  ViewProps as BaseViewProps,
  TextProps as BaseTextProps,
} from 'react-native';

declare global {
  type ViewRef = BaseView;

  type TextRef = BaseText;

  interface ViewProps extends BaseViewProps {
    textStyle?: unknown;
    styleName?: string;
  }

  interface TextProps extends BaseTextProps {
    color?: ThemeColors;
    small?: boolean;
    mark?: boolean;
    bold?: boolean;
    italic?: boolean;
    styleName?: string;
  }
}

export {};
