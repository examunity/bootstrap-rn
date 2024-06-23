import transform, { RootNode } from './transform';
import variables from '../theme/variables';
import type { ExtendedStyle } from '../types';

type SourceType =
  | object
  | {
      (theme: object, key: string): ExtendedStyle;
      ast: RootNode;
    };

const extractVariables = (
  source?: SourceType,
  options?: object,
  baseVariables: object = {},
) => {
  if (!source) {
    return { ...baseVariables };
  }

  if (typeof source === 'object') {
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
