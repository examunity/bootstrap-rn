import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import useViewport from './hooks/useViewport';
import StyleSheet from './style/StyleSheet';
import utilities from './theme/utilities';
import Context from './Context';

const propTypes = {
  children: PropTypes.node.isRequired,
  ssrViewport: PropTypes.string,
};

function Provider(props) {
  const { children, ssrViewport } = props;

  const viewport = useViewport(ssrViewport);

  const utilitiesStyles = useMemo(() => StyleSheet.create(utilities), []);

  const counter = useRef(0);

  const context = {
    utilitiesStyles,
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
