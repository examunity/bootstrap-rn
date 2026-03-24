import React from 'react';
import { Portal as BasePortal } from '@rn-primitives/portal';
import usePortalRegistry from '../../hooks/usePortalRegistry';
import TextStyleContext from '../../style/TextStyleContext';

export interface PortalProps {
  name: string;
  hostName?: string;
  children: React.ReactNode;
}

function Portal({ name, hostName, children }: PortalProps) {
  usePortalRegistry(name, hostName);

  return (
    <BasePortal name={name} hostName={hostName}>
      <TextStyleContext.Provider value={null}>
        {children}
      </TextStyleContext.Provider>
    </BasePortal>
  );
}

export default Portal;
