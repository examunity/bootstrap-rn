import { rgba, opacity, mix } from '../style/functions';
import { calculate } from '../style/math';
import RgbaValue from '../style/types/RgbaValue';
import UnitValue from '../style/types/UnitValue';
import type { ThemeVariables, StyleValue } from '../types';

export const fn =
  <T extends string | number | null>(
    handle: (input: T[], t: ThemeVariables) => StyleValue,
  ) =>
  (...args: (T | ((t: ThemeVariables) => T))[]) =>
  (t: ThemeVariables) => {
    const input = args.map((arg) => (typeof arg === 'function' ? arg(t) : arg));
    return handle(input, t);
  };

/* eslint-disable arrow-body-style */

const escapedCharacters = {
  '<': '%3c',
  '>': '%3e',
  '#': '%23',
  '(': '%28',
  ')': '%29',
};

export const escapeSvg = (string: string) => {
  const strReplace = (val: string) =>
    Object.entries(escapedCharacters).reduce(
      (result, [char, encoded]) =>
        result.replace(new RegExp(`\\${char}`, 'g'), encoded),
      val,
    );

  return string.startsWith('url(')
    ? `url("${strReplace(string.slice(5, -2))}")`
    : strReplace(string);
};

// Color contrast

// A list of pre-calculated numbers of pow(divide((divide($value, 255) + .055), 1.055), 2.4). (from 0 to 255)
// prettier-ignore
const luminanceList = [0.0008, 0.001, 0.0011, 0.0013, 0.0015, 0.0017, 0.002, 0.0022, 0.0025, 0.0027, 0.003, 0.0033, 0.0037, 0.004, 0.0044, 0.0048, 0.0052, 0.0056, 0.006, 0.0065, 0.007, 0.0075, 0.008, 0.0086, 0.0091, 0.0097, 0.0103, 0.011, 0.0116, 0.0123, 0.013, 0.0137, 0.0144, 0.0152, 0.016, 0.0168, 0.0176, 0.0185, 0.0194, 0.0203, 0.0212, 0.0222, 0.0232, 0.0242, 0.0252, 0.0262, 0.0273, 0.0284, 0.0296, 0.0307, 0.0319, 0.0331, 0.0343, 0.0356, 0.0369, 0.0382, 0.0395, 0.0409, 0.0423, 0.0437, 0.0452, 0.0467, 0.0482, 0.0497, 0.0513, 0.0529, 0.0545, 0.0561, 0.0578, 0.0595, 0.0612, 0.063, 0.0648, 0.0666, 0.0685, 0.0704, 0.0723, 0.0742, 0.0762, 0.0782, 0.0802, 0.0823, 0.0844, 0.0865, 0.0887, 0.0908, 0.0931, 0.0953, 0.0976, 0.0999, 0.1022, 0.1046, 0.107, 0.1095, 0.1119, 0.1144, 0.117, 0.1195, 0.1221, 0.1248, 0.1274, 0.1301, 0.1329, 0.1356, 0.1384, 0.1413, 0.1441, 0.147, 0.15, 0.1529, 0.1559, 0.159, 0.162, 0.1651, 0.1683, 0.1714, 0.1746, 0.1779, 0.1812, 0.1845, 0.1878, 0.1912, 0.1946, 0.1981, 0.2016, 0.2051, 0.2086, 0.2122, 0.2159, 0.2195, 0.2232, 0.227, 0.2307, 0.2346, 0.2384, 0.2423, 0.2462, 0.2502, 0.2542, 0.2582, 0.2623, 0.2664, 0.2705, 0.2747, 0.2789, 0.2831, 0.2874, 0.2918, 0.2961, 0.3005, 0.305, 0.3095, 0.314, 0.3185, 0.3231, 0.3278, 0.3325, 0.3372, 0.3419, 0.3467, 0.3515, 0.3564, 0.3613, 0.3663, 0.3712, 0.3763, 0.3813, 0.3864, 0.3916, 0.3968, 0.402, 0.4072, 0.4125, 0.4179, 0.4233, 0.4287, 0.4342, 0.4397, 0.4452, 0.4508, 0.4564, 0.4621, 0.4678, 0.4735, 0.4793, 0.4851, 0.491, 0.4969, 0.5029, 0.5089, 0.5149, 0.521, 0.5271, 0.5333, 0.5395, 0.5457, 0.552, 0.5583, 0.5647, 0.5711, 0.5776, 0.5841, 0.5906, 0.5972, 0.6038, 0.6105, 0.6172, 0.624, 0.6308, 0.6376, 0.6445, 0.6514, 0.6584, 0.6654, 0.6724, 0.6795, 0.6867, 0.6939, 0.7011, 0.7084, 0.7157, 0.7231, 0.7305, 0.7379, 0.7454, 0.7529, 0.7605, 0.7682, 0.7758, 0.7835, 0.7913, 0.7991, 0.807, 0.8148, 0.8228, 0.8308, 0.8388, 0.8469, 0.855, 0.8632, 0.8714, 0.8796, 0.8879, 0.8963, 0.9047, 0.9131, 0.9216, 0.9301, 0.9387, 0.9473, 0.956, 0.9647, 0.9734, 0.9823, 0.9911, 1];

// Return WCAG2.0 relative luminance
// See https://www.w3.org/WAI/GL/wiki/Relative_luminance
// See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
const luminance = (color: string) => {
  const rgb = RgbaValue.parse(color).toRgb();

  const [red, green, blue] = rgb.map((value: number) => {
    return value / 255 < 0.04045 ? value / 255 / 12.92 : luminanceList[value];
  });

  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
};

// Return opaque color
// opaque(#fff, rgba(0, 0, 0, .5)) => #808080
const opaque = (background: string, foreground: string) => {
  const foregroundRgba = RgbaValue.parse(foreground);
  return mix(rgba(foregroundRgba, 1), background, opacity(foregroundRgba));
};

const contrastRatio = (background: string, foreground: string) => {
  const l1 = luminance(background);
  const l2 = luminance(opaque(background, foreground));

  return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};

export const colorContrast = fn(([background]: [background: string], t) => {
  const foregrounds = [
    t['color-contrast-light'] as string,
    t['color-contrast-dark'] as string,
    t.white as string,
    t.black as string,
  ];
  let maxRatio: number = 0;
  let maxRatioColor: string | null = null;

  const result = foregrounds.find((color) => {
    const ratio = contrastRatio(background as string, color);

    if (ratio > (t['min-contrast-ratio'] as number)) {
      return true;
    }

    if (ratio > maxRatio) {
      maxRatio = ratio;
      maxRatioColor = color;
    }

    return false;
  });

  if (result) {
    return result;
  }

  // eslint-disable-next-line no-console
  console.warn(
    `Found no color leading to ${t['min-contrast-ratio']}:1 contrast ratio against ${background}...`,
  );

  return maxRatioColor;
});

// Tint a color: mix a color with white
export const tintColor = fn(
  ([color, weight]: [color: string, weight: number], t) => {
    return mix(t.white, color, weight);
  },
);

// Shade a color: mix a color with black
export const shadeColor = fn(
  ([color, weight]: [color: string, weight: number], t) => {
    return mix(t.black, color, weight);
  },
);

// Shade the color if the weight is positive, else tint it
export const shiftColor = fn(
  ([color, weight]: [color: string, weight: number], t) => {
    const percentage = UnitValue.parse(weight).toNumber();

    const handle =
      percentage > 0
        ? shadeColor(color, percentage)
        : tintColor(color, -percentage);

    return handle(t);
  },
);

export const add = fn(
  ([value1, value2]: [
    value1: string | number | null,
    value2: string | number | null,
  ]) => {
    if (value1 === null) {
      return value2;
    }

    if (value2 === null) {
      return value1;
    }

    return calculate(value1, '+', value2);
  },
);

export const subtract = fn(
  ([value1, value2]: [
    value1: string | number | null,
    value2: string | number | null,
  ]) => {
    if (value1 === null && value2 === null) {
      return null;
    }

    if (value1 === null) {
      return `-${value2}`;
    }

    if (value2 === null) {
      return value1;
    }

    return calculate(value1, '-', value2);
  },
);

export const divide = fn(
  ([dividend, divisor]: [color: string | number, weight: string | number]) => {
    if (Math.abs(parseFloat(dividend as string)) === 0) {
      return 0;
    }

    if (Math.abs(parseFloat(divisor as string)) === 0) {
      throw new Error('Cannot divide by 0');
    }

    return calculate(dividend, '/', divisor);
  },
);

/* eslint-enable */
