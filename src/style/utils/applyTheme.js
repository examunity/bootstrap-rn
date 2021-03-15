const pattern = /\$[a-zA-Z0-9]*/g;

const getValue = (theme, value) => {
  if (!value) {
    return '';
  }

  if (typeof value === 'function') {
    return value(theme);
  }

  return value;
};

function applyTheme(theme, fragments, values) {
  // Resolve functions, remove line breaks and comments.
  const definition = fragments
    // Resolve functions.
    .reduce(
      (result, current, i) =>
        `${result}${current}${getValue(theme, values[i])}`,
      '',
    )
    // Remove line breaks.
    .replace(/\r?\n|\r/g, '')
    // Remove comments.
    .replace(/\/\*.*\*\//g, '');

  // Replace variables.
  return definition.replace(pattern, (match) => theme[match.substr(1)]);
}

export default applyTheme;
