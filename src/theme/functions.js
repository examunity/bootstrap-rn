import { PixelRatio } from 'react-native';
import { mix } from 'polished';

// Color contrast

// A list of pre-calculated numbers of pow(divide((divide($value, 255) + .055), 1.055), 2.4). (from 0 to 255)
export function colorContrast(/* background, colorContrastDark, colorContrastLight, minContrastRatio */) {
  // TODO

  return 'white';
}

/* export function contrastRatio(background, foreground) {
  const l1 = luminance(background);
  const l2 = luminance(opaque(background, foreground));

  return l1 > l2 ? divide(l1 + 0.05, l2 + 0.05) : divide(l2 + 0.05, l1 + 0.05);
} */

// Return WCAG2.0 relative luminance
// See https://www.w3.org/WAI/GL/wiki/Relative_luminance
// See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
/* export function luminance(color) {
  const { red, green, blue } = parseToRgb(color);

  // TODO
} */

// Return opaque color
// opaque(#fff, rgba(0, 0, 0, .5)) => #808080
/* export function opaque(background, foreground) {
  return mix(opacity(foreground), rgba(foreground, 1), background);
} */

// Tint a color: mix a color with white
export function tintColor(weight, color) {
  return mix(weight, 'white', color);
}

// Shade a color: mix a color with black
export function shadeColor(weight, color) {
  return mix(weight, 'black', color);
}

// Shade the color if the weight is positive, else tint it
export function shiftColor(weight, color) {
  return weight > 0 ? shadeColor(weight, color) : tintColor(-weight, color);
}

export function subtract(value1, value2) {
  if (value1 === null && value2 === null) {
    return null;
  }

  if (value1 === null) {
    return `-${value2}`;
  }

  if (value2 === null) {
    return value1;
  }

  // Support px and rem units and convert px to rem if values are not comparable.
  const replaceUnit = (value) =>
    value.replace(
      /([+-]+)?([\d.Ee]+)px/,
      (_, unary, number) =>
        `${unary || ''}${number / (PixelRatio.getFontScale() * 16)}rem`,
    );

  if (value1.endsWith('px') && !value2.endsWith('px')) {
    return `${replaceUnit(value1)} - ${value2}`;
  }

  if (!value1.endsWith('px') && value2.endsWith('px')) {
    return `${value1} - ${replaceUnit(value2)}`;
  }

  return `${value1} - ${value2}`;
}

/* export default function divide(dividend, divisor, precision = 10) {
  // TODO
} */
