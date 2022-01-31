import { useResolvedPath, useMatch } from '../libs/react-router';

export default function useActive(props) {
  const { to, external, active } = props;

  if (!to || external) {
    return active;
  }

  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return !!match;
}
