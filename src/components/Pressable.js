import React from 'react';
import PropTypes from 'prop-types';
import { Pressable as BasePressable } from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const Pressable = React.forwardRef((props, ref) => {
  const { style, styleName, ...elementProps } = props;

  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);

  return (
    <BasePressable
      {...elementProps}
      ref={ref}
      style={(interaction) => resolveStyle({ media, interaction })}
    />
  );
});

Pressable.displayName = 'Pressable';
Pressable.propTypes = propTypes;

export default Pressable;
