import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import useViewport from './hooks/useViewport';
import StyleSheet from './style/StyleSheet';
import utilities from './theme/utilities';
import Context from './Context';

const propTypes = {
  children: PropTypes.node.isRequired,
  ssrViewport: PropTypes.string,
  breakpoints: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
  }).isRequired,
};

function Provider(props) {
  const { children, ssrViewport, breakpoints } = props;

  const viewport = useViewport({ initialViewport: ssrViewport, breakpoints });

  const utilitiesStyles = useMemo(() => StyleSheet.create(utilities), []);

  const counter = useRef(0);

  const context = {
    utilitiesStyles,
    getBreakpoints() {
      return breakpoints;
    },
    getViewport() {
      return viewport;
    },
    generateKey(prefix) {
      counter.current += 1;

      return `ui-${prefix}-${counter.current}`;
    },
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

Provider.propTypes = propTypes;

export default Provider;
