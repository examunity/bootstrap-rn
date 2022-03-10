import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Pressable as BasePressable } from 'react-native';
import TextStyleContext from '../style/TextStyleContext';
import useModifier from '../hooks/useModifier';
import useAction from '../hooks/useAction';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

const propTypes = {
  children: PropTypes.node,
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
// 1) accessibilityRole
// 2) accessibilityLabel + accessibilityHint
// 3) accessibilityActions + onAccessibilityAction
export const getRole = (props) => {
  const { accessibilityRole, accessibilityLabel, accessibilityActions } = props;

  if (accessibilityRole) {
    return accessibilityRole;
  }

  if (accessibilityLabel || accessibilityActions) {
    return null;
  }

  return 'button';
};

const Pressable = React.forwardRef((props, ref) => {
  const [modifierProps, modifierRef] = useModifier('useActionable', props, ref);
  const [actionProps, actionRef] = useAction(modifierProps, modifierRef);

  const {
    children,
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

  const hasTextStyle = (context && context.style) || textStyle;

  return (
    <BasePressable
      {...elementProps}
      ref={actionRef}
      accessibilityRole={getRole(actionProps)}
      style={(interaction) => [
        resolveStyle({ media, interaction }),
        resolveActiveStyle({ media, interaction }),
      ]}
    >
      {hasTextStyle
        ? (interaction) => (
            <TextStyleContext.Provider
              value={{
                style: [
                  resolveTextStyle({ media, interaction }),
                  resolveActiveTextStyle({ media, interaction }),
                ],
                hasAncestor: context && context.hasTextAncestor,
              }}
            >
              {children}
            </TextStyleContext.Provider>
          )
        : children}
    </BasePressable>
  );
});

Pressable.displayName = 'Pressable';
Pressable.propTypes = propTypes;

export default Pressable;
