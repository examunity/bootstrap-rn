import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Pressable as BasePressable } from 'react-native';
import TextStyleContext from '../style/TextStyleContext';
import useAction from '../hooks/useAction';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

const propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const Pressable = React.forwardRef((props, ref) => {
  const [actionProps, actionRef] = useAction(props, ref);

  const {
    children,
    style,
    textStyle,
    styleName,
    ...elementProps
  } = actionProps;

  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);
  const context = useContext(TextStyleContext);
  const resolveTextStyle = useStyle([context && context.style, textStyle]);

  const hasTextStyle = (context && context.style) || textStyle;

  return (
    <BasePressable
      {...elementProps}
      ref={actionRef}
      style={(interaction) => resolveStyle({ media, interaction })}
    >
      {hasTextStyle
        ? (interaction) => (
            <TextStyleContext.Provider
              value={{
                style: resolveTextStyle({ media, interaction }),
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
