import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import BasePopover from 'react-native-popover-view'; // { PopoverMode }
import PopoverBody from './PopoverBody';
import PopoverHeader from './PopoverHeader';
import Button from '../buttons/Button';

const PLACEMENTS = ['top', 'bottom', 'left', 'right', 'auto'];

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(PLACEMENTS),
  visible: PropTypes.bool,
};

const Popover = (props) => {
  const { children, title = null, content, placement, visible = false } = props;

  const [showPopover, setShowPopover] = useState(visible);
  const tooltipButton = useRef();

  return (
    <>
      <Button ref={tooltipButton} onPress={() => setShowPopover(true)}>
        {children}
      </Button>
      <BasePopover
        isVisible={showPopover}
        arrowStyle={{ backgroundColor: 'transparent' }}
        onRequestClose={() => setShowPopover(false)}
        placement={placement}
        from={tooltipButton}
      >
        {title && <PopoverHeader>{title}</PopoverHeader>}
        <PopoverBody>{content}</PopoverBody>
      </BasePopover>
    </>
  );
};

Popover.propTypes = propTypes;

export default Popover;
