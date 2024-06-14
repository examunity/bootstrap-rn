import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';
import ProgressBar from './ProgressBar';
import ProgressContext from './ProgressContext';
import useProgress from './useProgress';

export interface ProgressProps extends ViewProps {
  min?: number;
  max?: number;
}

const styles = StyleSheet.create({
  '.progress': css`
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    height: $progress-height;
    overflow: hidden; // force rounded corners by cropping it
    background-color: $progress-bg;
    border-radius: $progress-border-radius;
    // @include box-shadow($progress-box-shadow);
  `,
  '.progress --text': css`
    font-size: $progress-font-size;
    line-height: $progress-font-size * $line-height-base; // added for bootstrap-rn
  `,
});

const Progress = React.forwardRef<ViewRef, ProgressProps>((props, ref) => {
  const {
    children,
    min = 0,
    max = 100,
    style,
    textStyle,
    ...elementProps
  } = props;

  const progress = useProgress(min, max);

  const classes = getStyles(styles, ['.progress']);

  const textClasses = getStyles(styles, ['.progress --text']);

  return (
    <View
      {...elementProps}
      ref={ref}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      <ProgressContext.Provider value={progress}>
        {children}
      </ProgressContext.Provider>
    </View>
  );
});

Progress.displayName = 'Progress';

export default Object.assign(Progress, {
  Bar: ProgressBar,
});
