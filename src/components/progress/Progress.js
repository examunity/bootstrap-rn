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
.progress {
  overflow: hidden; // force rounded corners by cropping it
  @include box-shadow($progress-box-shadow);
}
*/
const styles = StyleSheet.create({
    progress: {
        display: 'flex',
        height: v.progressHeight,
        fontSize: v.progressFontSize,
        backgroundColor: v.progressBg,
        borderRadius: v.progressBorderRadius,
      },
  });

  function Progress(props) {
    const {
      children,
      min = 0,
      max = 100,
      ...elementProps
    } = props;
  
    const classes = getStyles(styles, [
      'progress',
    ]);
  
  
    return (
      <View style={[classes, elementProps.style]} {...elementProps}>
        <TextStyleContext.Provider>
          {children}
        </TextStyleContext.Provider>
      </View>
    );
  }

Progress.propTypes = propTypes;
Progress.Bar = ProgressBar;

export default Progress;