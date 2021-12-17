import React from 'react';
import PropTypes from 'prop-types';
import { View as BaseView } from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyleName from '../hooks/useStyleName';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

function View({ style, styleName, ...props }) {
  const media = useMedia();
  const utilitiesStyles = useStyleName(styleName);

  return (
    <BaseView
      {...props}
      style={[
        utilitiesStyles,
        typeof style === 'function' ? style({ media }) : style,
      ]}
    />
  );
}

View.propTypes = propTypes;

export default View;
