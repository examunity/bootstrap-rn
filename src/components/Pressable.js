import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Text, I18nManager, Pressable as BasePressable } from 'react-native';
import TextStyleContext from '../style/TextStyleContext';
import useModifier from '../hooks/useModifier';
import useAction from '../hooks/useAction';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';
import useInteractionState from '../hooks/useInteractionState';
import Caret from './Caret';

const DIRECTIONS = ['up', 'down', 'start', 'end'];

const propTypes = {
  children: PropTypes.node,
  caret: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      direction: PropTypes.oneOf(DIRECTIONS),
      color: PropTypes.string,
    }),
  ]),
  active: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  activeStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  activeTextStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

// One of the following should be set for aria support:
// 1) role
// 2) aria-label + aria-hint
// 3) accessibilityActions + onAccessibilityAction
export const getRole = (props) => {
  const { role, accessibilityActions } = props;

  if (role) {
    return role;
  }

  if (props['aria-label'] || accessibilityActions) {
    return null;
  }

  return 'button';
};

const applyCaret = (children, caret) => {
  if (!caret) {
    return children;
  }

  const options = caret === true ? {} : caret;

  const element = <Caret color={options.color} direction={options.direction} />;
  const space = <Text> </Text>;

  const isLeftCaret =
    options.direction === (I18nManager.isRTL ? 'end' : 'start');

  if (isLeftCaret) {
    return (
      <>
        {element}
        {space}
        {children}
      </>
    );
  }

  return (
    <>
      {children}
      {space}
      {element}
    </>
  );
};

const Pressable = React.forwardRef((props, ref) => {
  const [modifierProps, modifierRef] = useModifier('useActionable', props, ref);
  const [actionProps, actionRef] = useAction(modifierProps, modifierRef);

  const {
    children,
    caret = false,
    active = false,
    style,
    activeStyle,
    textStyle,
    activeTextStyle,
    styleName,
    ...elementProps
  } = actionProps;

  const media = useMedia();
  const context = useContext(TextStyleContext);

  const resolveStyle = useStyle(style, styleName);
  const resolveActiveStyle = useStyle(active && activeStyle);
  const resolveTextStyle = useStyle([context && context.style, textStyle]);
  const resolveActiveTextStyle = useStyle(active && activeTextStyle);

  const { interaction, interactionProps } = useInteractionState(elementProps);

  const hasTextStyle = (context && context.style) || textStyle;
  const wrappedChildren = applyCaret(children, caret);

  const contextValue = useMemo(
    () => ({
      style: [
        resolveTextStyle({ media, interaction }),
        resolveActiveTextStyle({ media, interaction }),
      ],
      hasAncestor: context && context.hasTextAncestor,
    }),
    [resolveTextStyle, resolveActiveTextStyle, media, interaction],
  );

  return (
    <BasePressable
      {...elementProps}
      {...interactionProps}
      ref={actionRef}
      role={getRole(actionProps)}
      style={[
        resolveStyle({ media, interaction }),
        resolveActiveStyle({ media, interaction }),
      ]}
    >
      {hasTextStyle ? (
        <TextStyleContext.Provider value={contextValue}>
          {wrappedChildren}
        </TextStyleContext.Provider>
      ) : (
        wrappedChildren
      )}
    </BasePressable>
  );
});

Pressable.displayName = 'Pressable';
Pressable.propTypes = propTypes;

export default Pressable;
