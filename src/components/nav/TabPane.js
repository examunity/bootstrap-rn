import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles, getElementId } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import TabContext from './TabContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.tab-pane': css`
    display: none;
  `,
  '.active': css`
    display: flex;
  `,
});

const TabPane = React.forwardRef((props, ref) => {
  const { id: target, style, ...elementProps } = props;

  const tabbable = useForcedContext(TabContext);

  const classes = getStyles(styles, [
    '.tab-pane',
    tabbable.activeTarget === target && '.active',
  ]);

  const id = getElementId(tabbable.identifier, target);

  const role = Platform.OS === 'web' ? 'tabpanel' : null;

  return (
    <View
      {...elementProps}
      ref={ref}
      nativeID={id}
      accessibilityRole={role}
      accessibilityLabelledBy={`${id}-tab`}
      style={[classes, style]}
    />
  );
});

TabPane.displayName = 'TabPane';
TabPane.propTypes = propTypes;

export default TabPane;
