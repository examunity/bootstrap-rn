import { GRID_BREAKPOINTS } from './proxies';

export function next(name: keyof typeof GRID_BREAKPOINTS) {
  const names = Object.keys(GRID_BREAKPOINTS) as Array<
    keyof typeof GRID_BREAKPOINTS
  >;
  const n = names.indexOf(name);

  if (n === -1) {
    throw new Error(`Breakpoint ${name} not found.`);
  }

  return n < names.length ? names[n + 1] : '';
}

export function infix(breakpoint: keyof typeof GRID_BREAKPOINTS | '') {
  if (!breakpoint || breakpoint === 'xs') {
    return '';
  }

  return `-${breakpoint}`;
}
