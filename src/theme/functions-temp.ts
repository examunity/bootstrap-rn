import { mix } from '../style/functions';
import UnitValue from '../style/types/UnitValue';
import { ThemeVariables } from './types';

type HandleFunction = (
  [color, weight]: [string, number],
  t: ThemeVariables,
) => string;

const fn =
  (handle: HandleFunction) =>
  (...args: unknown[]) =>
  (t: ThemeVariables): string => {
    // Ensure that args is processed as a tuple
    const input = args as [string, number];
    return handle(input, t);
  };

// Tint a color: mix a color with white
export const tintColor = fn(
  ([color, weight]: [string, number], t: ThemeVariables) =>
    mix(t.white, color, weight),
);

// Shade a color: mix a color with black
export const shadeColor = fn(
  ([color, weight]: [string, number], t: ThemeVariables) =>
    mix(t.black, color, weight),
);

// Shade the color if the weight is positive, else tint it
export const shiftColor = fn(
  ([color, weight]: [string, number], t: ThemeVariables) => {
    const percentage = UnitValue.parse(weight).toNumber();

    const handle =
      percentage > 0
        ? shadeColor(color, percentage)
        : tintColor(color, -percentage);

    return handle(t);
  },
);
