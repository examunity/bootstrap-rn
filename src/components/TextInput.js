import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput as BaseTextInput } from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

const propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const TextInput = React.forwardRef((props, ref) => {
  const {
    onFocus = () => {},
    onBlur = () => {},
    style,
    styleName,
    ...elementProps
  } = props;

  const [focused, setFocused] = useState(false);

  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);

  return (
    <BaseTextInput
      {...elementProps}
      ref={ref}
      onFocus={() => {
        setFocused(true);
        onFocus();
      }}
      onBlur={() => {
        setFocused(false);
        onBlur();
      }}
      style={resolveStyle({ media, interaction: { focused } })}
    />
  );
});

TextInput.displayName = 'TextInput';
TextInput.propTypes = propTypes;

export default TextInput;
