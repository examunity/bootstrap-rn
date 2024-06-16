import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import View from '../View';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';
import ButtonGroupContext from './ButtonGroupContext';
import useList from '../../hooks/useList';

export interface ButtonGroupProps extends ViewProps {
  size?: 'lg' | 'sm';
}

const styles = StyleSheet.create({
  '.btn-group': css`
    flex-direction: row; // added for bootstrap-rn
    border-radius: $btn-border-radius;
  `,
});

const ButtonGroup = React.forwardRef<ViewRef, ButtonGroupProps>(
  (props, ref) => {
    const { children, size, style, ...elementProps } = props;

    const list = useList(children);

    const classes = getStyles(styles, ['.btn-group']);

    // Accessiblity role tabpanel is only supported on web.
    const role = Platform.OS === 'web' ? 'group' : undefined;

    const contextValue = useMemo(() => ({ size }), [size]);

    return (
      <View {...elementProps} ref={ref} role={role} style={[classes, style]}>
        <ButtonGroupContext.Provider value={contextValue}>
          {list}
        </ButtonGroupContext.Provider>
      </View>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
