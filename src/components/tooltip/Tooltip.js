import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-native-popover-view'; // { PopoverMode }
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
  '.tooltip': css`
    margin: $tooltip-margin;
    font-size: $tooltip-font-size;
  `,
  '.tooltip-inner': css`
    max-width: $tooltip-max-width;
    padding: $tooltip-padding-y $tooltip-padding-x;
    color: $tooltip-color;
    text-align: center;
    background-color: $tooltip-bg;
  `,
});

const Tooltip = (props) => {
  const { children, title, placement, visible = false } = props;

  const [showTooltip, setShowTooltip] = useState(visible);
  const tooltipClasses = getStyles(styles, ['.tooltip']);
  const tooltipInnerClasses = getStyles(styles, ['.tooltip-inner']);

  const tooltipButton = useRef();

  return (
    <>
      <Button ref={tooltipButton} onPress={() => setShowTooltip(true)}>
        {children}
      </Button>
      <Popover
        isVisible={showTooltip}
        onRequestClose={() => setShowTooltip(false)}
        placement={placement}
        from={tooltipButton}
        arrowStyle={{ backgroundColor: StyleSheet.value('tooltip-bg') }}
      >
        <View style={[tooltipClasses]}>
          <Text style={[tooltipInnerClasses]}>{title}</Text>
        </View>
      </Popover>
    </>
  );
};

Tooltip.propTypes = propTypes;

export default Tooltip;
