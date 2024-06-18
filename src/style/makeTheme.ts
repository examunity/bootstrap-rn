import transform from './transform';
import variables from '../theme/variables';

const extractVariables = (
  source: object,
  options?: object,
  baseVariables: object = {},
) => {
  if (typeof source !== 'function') {
    // TODO: Resolve t => ... functions on source object.
    return { ...source, ...baseVariables };
  }

  const result = transform(source.ast.children, baseVariables, options);

  return { ...result[0].variables, ...baseVariables };
};

export default function makeTheme(customVariables: object): object {
  const customTheme = extractVariables(customVariables);

  return extractVariables(variables, { preferTheme: true }, customTheme);
}
