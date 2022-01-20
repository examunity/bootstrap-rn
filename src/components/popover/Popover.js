import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import BasePopover from 'react-native-popover-view'; // { PopoverMode }
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import PopoverBody from './PopoverBody';
import PopoverHeader from './PopoverHeader';
import Button from '../buttons/Button';
import View from '../View';

const PLACEMENTS = ['top', 'bottom', 'left', 'right', 'auto'];

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  content: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(PLACEMENTS),
  visible: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.popover': css`
    background-color: $popover-bg;
    border-radius: $popover-border-radius;
    max-width: $popover-max-width;
    border-width: $popover-border-width;
    border-color: $popover-border-color;
  `,
});

const Popover = React.forwardRef((props, ref) => {
  const {
    children,
    title = null,
    content,
    placement,
    visible = false,
    style,
    ...elementProps
  } = props;

  const [showPopover, setShowPopover] = useState(visible);
  const tooltipButton = useRef();

  const classes = getStyles(styles, ['.popover']);
  return (
    <>
      <Button ref={tooltipButton} onPress={() => setShowPopover(true)}>
        {children}
      </Button>
      <BasePopover
        isVisible={showPopover}
        // arrowStyle={{ backgroundColor: 'transparent' }}
        onRequestClose={() => setShowPopover(false)}
        placement={placement}
        from={tooltipButton}
        popoverStyle={{
          backgroundColor: 'transparent',
        }}
      >
        <View {...elementProps} ref={ref} style={[classes]}>
          {title && <PopoverHeader>{title}</PopoverHeader>}
          <PopoverBody>{content}</PopoverBody>
        </View>
      </BasePopover>
    </>
  );
});

Popover.propTypes = propTypes;

export default Popover;
