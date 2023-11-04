import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { OverlayProvider } from '@react-native-aria/overlays';
import useViewport from './hooks/useViewport';
import useScrollbarEffects from './hooks/useScrollbarEffects';
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

  const fixed = useMemo(() => [], []);

  const counter = useRef(0);

  const scrollbars = useScrollbarEffects(fixed);

  const context = {
    utilities,
    modifiers,
    scrollbars,
    fixed,
    getViewport() {
      return viewport;
    },
    addFixedElement(ref) {
      fixed.push(ref);

      return {
        remove() {
          const index = fixed.findIndex((item) => item === ref);

          fixed.splice(index, 1);
        },
      };
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
