import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity as BasePressable } from 'react-native';
import useElementState from '../hooks/useElementState';
import useStyleName from '../hooks/useStyleName';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

function Pressable({ style, styleName, ...props }) {
  const state = useElementState();
  const utilitiesStyles = useStyleName(styleName);

  // TODO: Use Pressable from react-native here.
  return (
    <BasePressable
      {...props}
      style={[
        utilitiesStyles,
        typeof style === 'function' ? style(state) : style,
      ]}
    />
  );
}

Pressable.propTypes = propTypes;

export default Pressable;
