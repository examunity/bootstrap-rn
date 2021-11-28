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
      },
  });

  function ProgressBar(props) {
    const {
      children,
      min = 0,
      max = 100,
      ...elementProps
    } = props;
  
    const classes = getStyles(styles, [
      'progressBar',
    ]);
  
    return (
      <View style={[classes, elementProps.style]} {...elementProps}>
        <TextStyleContext.Provider>
          {children}
        </TextStyleContext.Provider>
      </View>
    );
  }

ProgressBar.propTypes = propTypes;

export default ProgressBar;