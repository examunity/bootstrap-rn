import RgbaValue from './types/RgbaValue';
import UnitValue from './types/UnitValue';

// Sass equivalent
export function rgb(value) {
  const color = RgbaValue.parse(value);
  return `rgb(${color.red},${color.green},${color.blue})`;
}

// Sass equivalent
export function rgba(value, alpha) {
  const color = RgbaValue.parse(value);
  return `rgba(${color.red},${color.green},${color.blue},${alpha})`;
}

// Sass equivalent
export function opacity(value) {
  return RgbaValue.parse(value).alpha;
}

// Sass equivalent
export function mix(color1, color2, weight = 0.5) {
  const rgb1 = RgbaValue.parse(color1).toRgb();
  const rgb2 = RgbaValue.parse(color2).toRgb();
  const percentage = UnitValue.parse(weight).toPercentage();

  const [r, g, b] = rgb1.map((value, key) =>
    Math.round(rgb2[key] + (value - rgb2[key]) * percentage),
  );

  return new RgbaValue(r, g, b).toHex();
}
