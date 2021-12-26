export function each(source, apply) {
  return Object.entries(source)
    .map(([key, value]) => {
      const resolve =
        typeof value === 'function' ? value : (theme) => theme[value];

      return apply(key, resolve);
    })
    .reduce((carry, item) => Object.assign(carry, item), {});
}

export function getStyles(styles, keys) {
  return keys.filter((key) => !!key).map((key) => styles[key]);
}
