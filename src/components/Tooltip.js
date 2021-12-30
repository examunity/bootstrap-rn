import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-native-popover-view'; // { PopoverMode }
import View from './View';
import Text from './Text';
import Button from './buttons/Button';
import StyleSheet from '../style/StyleSheet';
import { getStyles } from '../utils';
import css from '../style/css';

const PLACEMENTS = ['top', 'bottom', 'left', 'right', 'auto'];

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(PLACEMENTS),
  visible: PropTypes.bool,
};

const styles = StyleSheet.create({
  '.tooltip': css`
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
});

const Tooltip = (props) => {
  const { children, title, placement, visible = false } = props;

  const [showTooltip, setShowTooltip] = useState(visible);
  const classes = getStyles(styles, ['.tooltip']);

  const tooltipButton = useRef();

  return (
    <>
      <Button ref={tooltipButton} onPress={() => setShowTooltip(true)}>
        {children}
      </Button>
      <Popover
        isVisible={showTooltip}
        // showBackground={false}
        // mode={PopoverMode.TOOLTIP} // not working
        // backgroundStyle={{ backgroundColor: 'transparent' }}
        // debug={true}
        onRequestClose={() => setShowTooltip(false)}
        placement={placement}
        from={tooltipButton}
      >
        <View style={[classes]}>
          <Text>{title}</Text>
        </View>
      </Popover>
    </>
  );
};

Tooltip.propTypes = propTypes;

export default Tooltip;
