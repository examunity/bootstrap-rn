import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import Text from './Text';
import { getStyles } from '../utils';
import useModifier from '../hooks/useModifier';
import useAction from '../hooks/useAction';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';
import useInteractionState from '../hooks/useInteractionState';
import { getRole } from './Pressable';

const propTypes = {
  children: PropTypes.node.isRequired,
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

  const { children, style, ...elementProps } = actionProps;

  const media = useMedia();

  const classes = getStyles(styles, ['link']);

  const resolveStyle = useStyle([classes, style]);

  const { interaction, interactionProps } = useInteractionState(elementProps);

  return (
    <Text
      {...elementProps}
      {...interactionProps}
      ref={actionRef}
      accessibilityRole={getRole(actionProps)}
      accessible
      style={resolveStyle({
        media,
        interaction,
      })}
    >
      {children}
    </Text>
  );
});

Link.displayName = 'Link';
Link.propTypes = propTypes;

export default Link;
