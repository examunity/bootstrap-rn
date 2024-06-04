import type { View as BaseView, Text as BaseText } from 'react-native';

declare global {
  type ViewRef = BaseView;

  type TextRef = BaseText;
}

export {};
