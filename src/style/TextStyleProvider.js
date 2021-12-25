import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TextStyleContext from './TextStyleContext';

const propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
};

function TextStyleProvider(props) {
  const { children, value } = props;

  const parentValue = useContext(TextStyleContext);

  return (
    <TextStyleContext.Provider
      value={parentValue ? [parentValue, value] : value}
    >
      {children}
    </TextStyleContext.Provider>
  );
}

TextStyleProvider.propTypes = propTypes;

export default TextStyleProvider;
