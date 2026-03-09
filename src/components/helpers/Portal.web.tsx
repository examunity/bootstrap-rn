import { createPortal } from 'react-dom';

export interface PortalProps {
  // eslint-disable-next-line react/no-unused-prop-types
  name: string;
  hostName?: string;
  children: React.ReactNode;
}

const DEFAULT_PORTAL_HOST = 'INTERNAL_PRIMITIVE_DEFAULT_HOST_NAME';

function Portal({ hostName = DEFAULT_PORTAL_HOST, children }: PortalProps) {
  const element = document.getElementById(hostName);

  if (!element) {
    return null;
  }

  return createPortal(children, element);
}

export default Portal;
