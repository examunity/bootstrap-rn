import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import BasePopover from 'react-native-popover-view'; // { PopoverMode }
import View from '../View';
import Text from '../Text';
import Button from '../buttons/Button';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';

const PLACEMENTS = ['top', 'bottom', 'left', 'right', 'auto'];

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(PLACEMENTS),
  visible: PropTypes.bool,
};

const styles = StyleSheet.create({
  '.popover': css`
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
});

const Popover = (props) => {
  const { children, title, placement, visible = false } = props;

  const [showPopover, setShowPopover] = useState(visible);
  const classes = getStyles(styles, ['.popover']);

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
        <View style={[classes]}>
          <Text>{title}</Text>
        </View>
      </BasePopover>
    </>
  );
};

Popover.propTypes = propTypes;

export default Popover;
