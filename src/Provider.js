import React, {  useRef } from 'react';
import useViewport from './hooks/useViewport';
import Context from './Context';

function Provider(props) {
  const {
    children,
    ssrViewport,
    theme: { breakpoints, variables, styles },
  } = props;

  const viewport = useViewport({ initialViewport: ssrViewport, breakpoints });

  const counter = useRef(0);

  const context = {
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

export default Provider;
