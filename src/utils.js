export function each(source, handle) {
  return Object.entries(source)
    .map(([key, value]) => handle(key, (theme) => theme[value]))
    .reduce((carry, item) => Object.assign(carry, item), {});
}

export function getStyles(styles, keys) {
  return keys.filter((key) => !!key).map((key) => styles[key]);
}
