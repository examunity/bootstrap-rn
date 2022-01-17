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

const Popover = (props) => {
  const { children, title = null, content, placement, visible = false } = props;

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
        <View style={[classes]}>
          {title && <PopoverHeader>{title}</PopoverHeader>}
          <PopoverBody>{content}</PopoverBody>
        </View>
      </BasePopover>
    </>
  );
};

Popover.propTypes = propTypes;

export default Popover;
