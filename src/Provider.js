import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { OverlayProvider } from '@react-native-aria/overlays';
import useViewport from './hooks/useViewport';
import Context from './Context';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,
  utilities: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types,
  modifiers: PropTypes.object,
  ssrViewport: PropTypes.string,
};

function Provider(props) {
  const { children, utilities = {}, modifiers = {}, ssrViewport } = props;

  const viewport = useViewport(ssrViewport);

  const counter = useRef(0);

  const context = {
    utilities,
    modifiers,
    getViewport() {
      return viewport;
    },
    generateKey(prefix) {
      counter.current += 1;

      return `ui-${prefix}-${counter.current}`;
    },
  };

  return (
    <Context.Provider value={context}>
      <OverlayProvider>{children}</OverlayProvider>
    </Context.Provider>
  );
}

Provider.propTypes = propTypes;

export default Provider;
