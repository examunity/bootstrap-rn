import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View as BaseView } from 'react-native';
import TextStyleContext from '../style/TextStyleContext';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

const propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const View = React.forwardRef((props, ref) => {
  const { children, style, textStyle, styleName, ...elementProps } = props;

  const media = useMedia();
  const context = useContext(TextStyleContext);

  const resolveStyle = useStyle(style, styleName);
  const resolveTextStyle = useStyle([context && context.style, textStyle]);

  const hasTextStyle = (context && context.style) || textStyle;

  const contextValue = useMemo(
    () => ({
      style: resolveTextStyle({ media }),
      hasAncestor: context && context.hasTextAncestor,
    }),
    [resolveTextStyle, media, context],
  );

  return (
    <BaseView {...elementProps} ref={ref} style={resolveStyle({ media })}>
      {hasTextStyle ? (
        <TextStyleContext.Provider value={contextValue}>
          {children}
        </TextStyleContext.Provider>
      ) : (
        children
      )}
    </BaseView>
  );
});

View.displayName = 'View';
View.propTypes = propTypes;

export default View;
