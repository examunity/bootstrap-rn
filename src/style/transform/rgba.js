import { rgba as polishedRgba } from 'polished';

const transformRgbaRE = /rgba\(\s*([#0-9a-z]+)\s*,\s*([\d.Ee]+)\s*\)/g;

function rgba(value) {
  return value.replace(transformRgbaRE, (_, color, alpha) =>
    polishedRgba(color, Number(alpha)),
  );
}

export default rgba;
