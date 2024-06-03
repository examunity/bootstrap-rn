import React from 'react';
import { Platform } from 'react-native';
import type { View as BaseView } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles, getElementId } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import TabContext from './TabContext';

export type TabPaneProps = {
  children: React.ReactNode;
  id: string;
  style?: React.CSSProperties;
};

const styles = StyleSheet.create({
  '.tab-pane': css`
    display: none;
  `,
  '.active': css`
    display: flex;
  `,
});

const TabPane = React.forwardRef<BaseView, TabPaneProps>((props, ref) => {
  const { id: target, style, ...elementProps } = props;

  const tabbable = useForcedContext(TabContext);

  const classes = getStyles(styles, [
    '.tab-pane',
    tabbable.activeTarget === target && '.active',
  ]);

  const id = getElementId(tabbable.identifier, target);

  // Accessiblity role tabpanel is only supported on web.
  const role = Platform.OS === 'web' ? 'tabpanel' : undefined;

  return (
    <View
      {...elementProps}
      ref={ref}
      id={id}
      role={role}
      aria-labelledby={`${id}-tab`}
      style={[classes, style]}
    />
  );
});

TabPane.displayName = 'TabPane';

export default TabPane;
