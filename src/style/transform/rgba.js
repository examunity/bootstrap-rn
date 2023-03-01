import { rgba as transform } from '../functions';

const transformRgbaRE = /rgba\(\s*([#0-9a-z]+)\s*,\s*([\d.Ee]+)\s*\)/g;

function rgba(value) {
  return value.replace(transformRgbaRE, (_, hex, alpha) =>
    transform(hex, alpha),
  );
}

export default rgba;
