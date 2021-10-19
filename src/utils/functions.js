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
