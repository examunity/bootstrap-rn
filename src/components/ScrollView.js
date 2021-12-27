import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView as BaseScrollView } from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyleName from '../hooks/useStyleName';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

function ScrollView({ style, styleName, ...props }) {
  const media = useMedia();
  const utilitiesStyles = useStyleName(styleName);

  return (
    <BaseScrollView
      {...props}
      style={[
        typeof style === 'function' ? style({ media }) : style,
        utilitiesStyles,
      ]}
    />
  );
}

ScrollView.propTypes = propTypes;

export default ScrollView;
