import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput as BaseTextInput } from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

const propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  autoFocus: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const TextInput = React.forwardRef((props, ref) => {
  const {
    onFocus = () => {},
    onBlur = () => {},
    autoFocus = false,
    style,
    styleName,
    ...elementProps
  } = props;

  const [focused, setFocused] = useState(autoFocus);

  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);

  return (
    <BaseTextInput
      {...elementProps}
      ref={ref}
      onFocus={(event) => {
        setFocused(true);
        onFocus(event);
      }}
      onBlur={(event) => {
        setFocused(false);
        onBlur(event);
      }}
      autoFocus={autoFocus}
      style={resolveStyle({
        media,
        interaction: { focus: focused, focusVisible: focused },
      })}
    />
  );
});

TextInput.displayName = 'TextInput';
TextInput.propTypes = propTypes;

export default TextInput;
