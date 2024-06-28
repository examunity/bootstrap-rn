import React from 'react';
import type { MouseEvent } from 'react-native';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import Text, { TextProps, TextRef } from './Text';
import { getStyles } from '../utils';
import useModifier from '../hooks/useModifier';
import useAction, { ActionProps } from '../hooks/useAction';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';
import useInteractionState from '../hooks/useInteractionState';
import { getRole } from './Pressable';

export interface LinkProps extends ActionProps, TextProps {
  onMouseEnter?: (event?: MouseEvent) => void;
  onMouseLeave?: (event?: MouseEvent) => void;
  to?: string;
}

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

const Link = React.forwardRef<TextRef, LinkProps>((props, ref) => {
  const [modifierProps, modifierRef] = useModifier('useActionable', props, ref);
  const [actionProps, actionRef] = useAction(modifierProps, modifierRef);

  const {
    children,
    // Filter hover handlers, because Text component does not have hover
    // handlers. Instead we use mouse enter/leave handlers.
    // @ts-expect-error see comment above
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onHoverIn,
    // @ts-expect-error see comment above
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onHoverOut,
    onMouseEnter: handleMouseEnter = () => {},
    onMouseLeave: handleMouseLeave = () => {},
    style,
    ...elementProps
  } = actionProps;

  const media = useMedia();

  const classes = getStyles(styles, ['link']);

  const resolveStyle = useStyle([classes, style]);

  const {
    interaction,
    interactionProps: {
      onHoverIn: handleMouseEnterInteraction,
      onHoverOut: handleMouseLeaveInteraction,
      ...interactionProps
    },
  } = useInteractionState(elementProps);

  return (
    <Text
      {...elementProps}
      {...interactionProps}
      // @ts-expect-error web only event
      onMouseEnter={(event: MouseEvent) => {
        handleMouseEnter(event);
        handleMouseEnterInteraction(event);
      }}
      onMouseLeave={(event: MouseEvent) => {
        handleMouseLeave(event);
        handleMouseLeaveInteraction(event);
      }}
      ref={actionRef}
      role={getRole(actionProps)}
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

export default Link;
