import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView as BaseSafeAreaView } from 'react-native';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import { getStyles } from '../utils';
import TextStyleContext from '../style/TextStyleContext';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const styles = StyleSheet.create({
  body: css`
    background-color: $body-bg;
    height: 100%; // added for bootstrap-rn
  `,
  'body --text': css`
    color: $body-color;
    text-align: $body-text-align;
  `,
});

const Body = React.forwardRef((props, ref) => {
  const { children, style, textStyle, styleName, ...elementProps } = props;

  const classes = getStyles(styles, ['body']);
  const textClasses = getStyles(styles, ['body --text']);

  const media = useMedia();

  const resolveStyle = useStyle([classes, style], styleName);
  const resolveTextStyle = useStyle([textClasses, textStyle]);

  return (
    <BaseSafeAreaView
      {...elementProps}
      ref={ref}
      style={resolveStyle({ media })}
    >
      <TextStyleContext.Provider
        value={{
          style: resolveTextStyle({ media }),
        }}
      >
        {children}
      </TextStyleContext.Provider>
    </BaseSafeAreaView>
  );
});

Body.displayName = 'Body';
Body.propTypes = propTypes;

export default Body;
