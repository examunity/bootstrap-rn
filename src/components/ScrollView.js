import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ScrollView as BaseScrollView } from 'react-native';
import TextStyleContext from '../style/TextStyleContext';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

const propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  contentContainerStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const ScrollView = React.forwardRef((props, ref) => {
  const {
    children,
    contentContainerStyle,
    style,
    textStyle,
    styleName,
    ...elementProps
  } = props;

  const media = useMedia();
  const context = useContext(TextStyleContext);

  const resolveContentContainerStyle = useStyle(contentContainerStyle);
  const resolveStyle = useStyle(style, styleName);
  const resolveTextStyle = useStyle([context && context.style, textStyle]);

  const hasTextStyle = (context && context.style) || textStyle;

  return (
    <BaseScrollView
      {...elementProps}
      ref={ref}
      contentContainerStyle={resolveContentContainerStyle({ media })}
      style={resolveStyle({ media })}
    >
      {hasTextStyle ? (
        <TextStyleContext.Provider
          value={{
            style: resolveTextStyle({ media }),
            hasAncestor: context && context.hasTextAncestor,
          }}
        >
          {children}
        </TextStyleContext.Provider>
      ) : (
        children
      )}
    </BaseScrollView>
  );
});

ScrollView.displayName = 'ScrollView';
ScrollView.propTypes = propTypes;

export default ScrollView;
