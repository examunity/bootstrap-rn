import React from 'react';
import { Portal as BasePortal } from '@rn-primitives/portal';
import TextStyleContext from '../../style/TextStyleContext';

export interface PortalProps {
  // eslint-disable-next-line react/no-unused-prop-types
  name: string;
  hostName?: string;
  children: React.ReactNode;
}

function Portal({ children, ...rest }: PortalProps) {
  return (
    <BasePortal {...rest}>
      <TextStyleContext.Provider value={null}>
        {children}
      </TextStyleContext.Provider>
    </BasePortal>
  );
}

export default Portal;
