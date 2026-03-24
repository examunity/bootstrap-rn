import React from 'react';
import { View } from 'react-native';

export interface PortalHostProps {
  name?: string;
}

const DEFAULT_PORTAL_HOST = 'INTERNAL_PRIMITIVE_DEFAULT_HOST_NAME';

function PortalHost({ name = DEFAULT_PORTAL_HOST }: PortalHostProps) {
  return <View id={name} style={{ position: 'absolute' }} />;
}

export default PortalHost;
