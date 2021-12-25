import { PixelRatio } from 'react-native';
import { mix } from 'polished';

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
