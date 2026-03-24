import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import usePortalRegistry from '../../hooks/usePortalRegistry';
import TextStyleContext from '../../style/TextStyleContext';

export interface PortalProps {
  name: string;
  hostName?: string;
  children: React.ReactNode;
}

const DEFAULT_PORTAL_HOST = 'INTERNAL_PRIMITIVE_DEFAULT_HOST_NAME';

function Portal({
  name,
  hostName = DEFAULT_PORTAL_HOST,
  children,
}: PortalProps) {
  const [element, setElement] = useState(() =>
    document.getElementById(hostName),
  );

  usePortalRegistry(name, hostName);

  // Retry lookup after mount, before paint, in case the host element
  // was not yet committed to the DOM during the initial render.
  useLayoutEffect(() => {
    if (!element) {
      const host = document.getElementById(hostName);

      if (host) {
        setElement(host);
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          `Portal: No host element found with id "${hostName}". Make sure <PortalHost /> is rendered in the component tree.`,
        );
      }
    }
  }, [hostName]);

  if (!element) {
    return null;
  }

  return createPortal(
    <TextStyleContext.Provider value={null}>
      {children}
    </TextStyleContext.Provider>,
    element,
  );
}

export default Portal;
