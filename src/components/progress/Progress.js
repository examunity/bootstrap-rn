import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import TextStyleProvider from '../../style/TextStyleProvider';
import View from '../View';
import { getStyles } from '../../utils';
import ProgressBar from './ProgressBar';
import ProgressContext from './ProgressContext';
import useProgress from './useProgress';

const propTypes = {
  children: PropTypes.node.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.progress': css`
    display: flex;
    flex-direction: row; // added for bootstyle
    height: $progress-height;
    overflow: hidden; // force rounded corners by cropping it
    background-color: $progress-bg;
    border-radius: $progress-border-radius;
    // @include box-shadow($progress-box-shadow);
  `,
  '.progress-text': css`
    font-size: $progress-font-size;
    line-height: $progress-font-size * $line-height-base; // added for bootstyle
  `,
});

function Progress(props) {
  const { children, min = 0, max = 100, style, ...elementProps } = props;

  const progress = useProgress(min, max);

  const classes = getStyles(styles, ['.progress']);

  const textClasses = getStyles(styles, ['.progress-text']);

  return (
    <View {...elementProps} style={[classes, style]}>
      <ProgressContext.Provider value={progress}>
        <TextStyleProvider style={textClasses}>{children}</TextStyleProvider>
      </ProgressContext.Provider>
    </View>
  );
}

Progress.propTypes = propTypes;
Progress.Bar = ProgressBar;

export default Progress;
