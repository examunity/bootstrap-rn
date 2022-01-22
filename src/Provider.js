import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useViewport from './hooks/useViewport';
import Context from './Context';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,
  utilities: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types,
  components: PropTypes.object,
  ssrViewport: PropTypes.string,
};

function Provider(props) {
  const { children, utilities = {}, components = {}, ssrViewport } = props;

  const viewport = useViewport(ssrViewport);

  const counter = useRef(0);

  const context = {
    utilities,
    components,
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
