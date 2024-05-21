import transform from './transform';
import variables from '../theme/variables';

const extractVariables = (source, options, baseVariables = {}) => {
  if (typeof source !== 'function') {
    // TODO: Resolve t => ... functions on source object.
    return { ...source, ...baseVariables };
  }

  const result = transform(source.ast.children, baseVariables, options);

  return { ...result[0].variables, ...baseVariables };
};

export default function makeTheme(customVariables) {
  const customTheme = extractVariables(customVariables);

  return extractVariables(variables, { preferTheme: true }, customTheme);
}
