import React from 'react';
import { Platform } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View, { ViewProps, ViewRef } from '../View';
import { getStyles, getElementId } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import TabContext from './TabContext';

export interface TabPaneProps extends ViewProps {
  id: string;
}

const styles = StyleSheet.create({
  '.tab-pane': css`
    display: none;
  `,
  '.active': css`
    display: flex;
  `,
});

function TabPane(props: TabPaneProps & React.RefAttributes<ViewRef>) {
  const { ref, id: target, style, ...elementProps } = props;

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
}

export default TabPane;
