export default function each(source, handle) {
  return Object.entries(source)
    .map(([key, value]) => handle(key, value))
    .reduce((carry, item) => Object.assign(carry, item), {});
}
