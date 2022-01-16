import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text from '../Text';
import { each, getStyles } from '../../utils';
import { FORM_VALIDATION_STATES } from '../../theme/proxies';

const propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(Object.keys(FORM_VALIDATION_STATES)),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  ...each(FORM_VALIDATION_STATES, (state, data) => ({
    [`.${state}-feedback`]: css`
      // display: none;
      width: 100%;
      margin-top: $form-feedback-margin-top;
      font-size: $form-feedback-font-size;
      font-style: $form-feedback-font-style;
      color: ${(t) => data(t).color};
    `,
  })),
});

const Feedback = React.forwardRef((props, ref) => {
  const { children, type, style, ...elementProps } = props;

  const classes = getStyles(styles, [`.${type}-feedback`]);

  return (
    <Text {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Text>
  );
});

Feedback.displayName = 'Feedback';
Feedback.propTypes = propTypes;

export default Feedback;
