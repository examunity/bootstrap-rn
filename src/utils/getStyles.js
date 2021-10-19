export default function getStyles(styles, keys) {
  return keys.filter((key) => !!key).map((key) => styles[key]);
}
