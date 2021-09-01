const pattern = /\$[a-z0-9_-]*/gi;

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
  const definition = fragments.reduce(
    (result, current, i) => `${result}${current}${getValue(theme, values[i])}`,
    '',
  );

  // Replace variables.
  return definition.replace(pattern, (match) => theme[match.substr(1)]);
}

export default applyTheme;
