import React from 'react';
import PropTypes from 'prop-types';
import { Pressable as BasePressable } from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyleName from '../hooks/useStyleName';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

function Pressable({ style, styleName, ...props }) {
  const media = useMedia();
  const utilitiesStyles = useStyleName(styleName);

  return (
    <BasePressable
      {...props}
      style={(interaction) => {
        const result = [
          typeof style === 'function' ? style({ media, interaction }) : style,
          utilitiesStyles,
        ];

        return result;
      }}
    />
  );
}

Pressable.propTypes = propTypes;

export default Pressable;
