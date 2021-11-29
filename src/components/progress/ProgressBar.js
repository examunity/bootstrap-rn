import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from './../View';
import TextStyleContext from '../../style/TextStyleContext';
import each from '../../utils/each';
import getStyles from '../../utils/getStyles';
import ucfirst from '../../utils/ucfirst';
import v from '../../theme/variables';

const propTypes = {
  children: PropTypes.node.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number.isRequired,
  color: PropTypes.oneOf(Object.keys(v.themeColors)),
};

/*
.progress-bar {
  overflow: hidden;
  white-space: nowrap;
  @include transition($progress-bar-transition);
}
*/
const styles = StyleSheet.create({
  progressBar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: v.progressBarColor,
    backgroundColor: v.progressBarBg,
    textAlign: 'center',
    height: v.progressHeight,
    borderRadius: v.progressBorderRadius,
  },
  ...each(v.themeColors, (state, value) => ({
    [`progressBar${ucfirst(state)}`]: {
      backgroundColor: value,
    },
  })),
});

function ProgressBar(props) {
  const {
    color = 'primary',
    children,
    min = 0,
    max = 100,
    value,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    'progressBar',
    `progressBar${ucfirst(color)}`,
  ]);

  return (
    <View style={[classes, elementProps.style, { width: `${value}%` }]} {...elementProps}>
      {children}
    </View>
  );
}

ProgressBar.propTypes = propTypes;

export default ProgressBar;