import { useLayoutEffect } from 'react';

const DEFAULT_PORTAL_HOST = 'INTERNAL_PRIMITIVE_DEFAULT_HOST_NAME';

const registry = new Map<string, Set<string>>();

export default function usePortalRegistry(
  name: string,
  hostName: string = DEFAULT_PORTAL_HOST,
) {
  useLayoutEffect(() => {
    let names = registry.get(hostName);

    if (!names) {
      names = new Set();
      registry.set(hostName, names);
    }

    if (names.has(name)) {
      // eslint-disable-next-line no-console
      console.warn(
        `Portal: A portal with name "${name}" is already registered on host "${hostName}".`,
      );
    }

    names.add(name);

    return () => {
      names.delete(name);

      if (names.size === 0) {
        registry.delete(hostName);
      }
    };
  }, [name, hostName]);
}
