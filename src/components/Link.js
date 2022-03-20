import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import Text from './Text';
import { getStyles } from '../utils';
import useModifier from '../hooks/useModifier';
import useAction from '../hooks/useAction';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';
import { getRole } from './Pressable';

const propTypes = {
  children: PropTypes.node.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  link: css`
    color: $link-color;
    text-decoration-color: $link-color; // added for bootstrap-rn
    text-decoration-line: $link-decoration;

    &:hover {
      color: $link-hover-color;
      text-decoration-color: $link-hover-color; // added for bootstrap-rn
      text-decoration-line: $link-hover-decoration;
    }
  `,
});

const Link = React.forwardRef((props, ref) => {
  const [modifierProps, modifierRef] = useModifier('useActionable', props, ref);
  const [actionProps, actionRef] = useAction(modifierProps, modifierRef);

  const {
    children,
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onPressIn = () => {},
    onPressOut = () => {},
    style,
    ...elementProps
  } = actionProps;

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const media = useMedia();

  const classes = getStyles(styles, ['link', hovered]);

  const resolveStyle = useStyle([classes, style]);

  return (
    <Text
      {...elementProps}
      ref={actionRef}
      accessibilityRole={getRole(actionProps)}
      accessible
      onMouseEnter={() => {
        setHovered(true);
        onMouseEnter();
      }}
      onMouseLeave={() => {
        setHovered(false);
        onMouseLeave();
      }}
      onFocus={() => {
        setFocused(true);
        onFocus();
      }}
      onBlur={() => {
        setFocused(false);
        onBlur();
      }}
      onPressIn={() => {
        setPressed(true);
        onPressIn();
      }}
      onPressOut={() => {
        setPressed(false);
        onPressOut();
      }}
      style={resolveStyle({
        media,
        interaction: { hovered, focused, pressed },
      })}
    >
      {children}
    </Text>
  );
});

Link.displayName = 'Link';
Link.propTypes = propTypes;

export default Link;
