import { Portal } from '@rn-primitives/portal';

export interface PortalProps {
  // eslint-disable-next-line react/no-unused-prop-types
  name: string;
  hostName?: string;
  children: React.ReactNode;
}

export default Portal;
