import type { UseTabbableProps } from 'bootstrap-rn';
import { useResolvedPath, useMatch } from '../libs/react-router';

export default function useActive<T>(props: T & UseTabbableProps) {
  const { to, external, active } = props;

  if (!to || external) {
    return active;
  }

  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return !!match;
}
