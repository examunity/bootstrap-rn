import React from 'react';
import { Platform } from 'react-native';
import View from './View';
import { concatRefs } from '../utils';

export type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  disabled?: boolean;
  style?: unknown;
  textStyle?: unknown;
};

const Label = React.forwardRef<ViewRef, LabelProps>((props, ref) => {
  const { children, htmlFor, ...elementProps } = props;

  // Ref: https://github.com/necolas/react-native-web/issues/1651
  const forRef = React.useCallback((node: HTMLElement | null) => {
    if (Platform.OS !== 'web' || !htmlFor || !node) {
      return;
    }

    node.setAttribute('for', htmlFor);
  }, []);

  const role = Platform.OS === 'web' ? 'label' : undefined;

  return (
    <View {...elementProps} ref={concatRefs(forRef, ref)} role={role}>
      {children}
    </View>
  );
});

Label.displayName = 'Label';

export default Label;
