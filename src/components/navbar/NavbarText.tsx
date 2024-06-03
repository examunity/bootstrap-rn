import React from 'react';
import type { View as BaseView } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import Text from '../Text';
import { getStyles } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from './NavbarContext';

export type NavbarTextProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  textStyle?: unknown;
};

const styles = StyleSheet.create({
  '.navbar-text': css`
    padding-top: $nav-link-padding-y;
    padding-bottom: $nav-link-padding-y;
  `,
  '.navbar-light .navbar-text --text': css`
    color: $navbar-light-color;
  `,
  '.navbar-dark .navbar-text --text': css`
    color: $navbar-dark-color;
  `,
});

const NavbarText = React.forwardRef<BaseView, NavbarTextProps>((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const { variant } = useForcedContext(NavbarContext);

  const classes = getStyles(styles, ['.navbar-text']);
  const textClasses = getStyles(styles, [
    `.navbar-${variant} .navbar-text --text`,
  ]);

  // composite component
  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <Text style={[textClasses, textStyle]}>{children}</Text>
    </View>
  );
});

NavbarText.displayName = 'NavbarText';

export default NavbarText;
