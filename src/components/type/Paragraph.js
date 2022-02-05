import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text from '../Text';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  lead: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  paragraph: css`
    margin-top: 0;
    margin-bottom: $paragraph-margin-bottom;
  `,
  '.lead': css`
    font-size: $lead-font-size;
    line-height: $lead-font-size * $line-height-base; // added for bootstrap-rn
    font-weight: $lead-font-weight;
  `,
});

const Heading = React.forwardRef((props, ref) => {
  const { children, lead, style, ...elementProps } = props;

  const classes = getStyles(styles, ['paragraph', lead && '.lead']);

  // Accessiblity role paragraph is only supported on web.
  const role = Platform.OS === 'web' ? 'paragraph' : null;

  return (
    <Text
      {...elementProps}
      ref={ref}
      accessibilityRole={role}
      style={[classes, style]}
    >
      {children}
    </Text>
  );
});

Heading.displayName = 'Heading';
Heading.propTypes = propTypes;

export default Heading;
