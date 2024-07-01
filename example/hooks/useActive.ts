import { useResolvedPath, useMatch } from '../libs/react-router';

interface UseActiveProps {
  to?: string;
  external?: boolean;
  active?: boolean;
}

export default function useActive(props: UseActiveProps) {
  const { to, external, active } = props;

  if (!to || external) {
    return active;
  }

  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return !!match;
}
