import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TextStyleContext from './TextStyleContext';

const propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

function TextStyleProvider(props) {
  const { children, style } = props;

  const parentContext = useContext(TextStyleContext);

  return (
    <TextStyleContext.Provider
      value={{
        style: parentContext ? [parentContext.style, style] : style,
        hasTextAncestor: parentContext && parentContext.hasTextAncestor,
      }}
    >
      {children}
    </TextStyleContext.Provider>
  );
}

TextStyleProvider.propTypes = propTypes;

export default TextStyleProvider;
