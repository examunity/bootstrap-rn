import type { View as BaseView, Text as BaseText } from 'react-native';
import type { ViewProps as ComponentViewProps } from './components/View';
import type { TextProps as ComponentTextProps } from './components/Text';

declare global {
  type ViewRef = BaseView;

  type TextRef = BaseText;

  interface ViewProps extends ComponentViewProps {}

  interface TextProps extends ComponentTextProps {}
}
