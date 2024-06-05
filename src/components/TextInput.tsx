import React, { useState } from 'react';
import {
  TextInput as BaseTextInput,
  TextInputProps as BaseTextInputProps,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

export interface TextInputProps extends BaseTextInputProps {
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  autoFocus?: boolean;
  styleName?: unknown;
}

const TextInput = React.forwardRef<BaseTextInput, TextInputProps>(
  (props, ref) => {
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
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
