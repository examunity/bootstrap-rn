// Copied from https://github.com/styled-components/polished/blob/main/src/color/parseToRgb.js
const hexRE = /^#[a-fA-F0-9]{6}$/;
const hexRgbaRE = /^#[a-fA-F0-9]{8}$/;
const shortHexRE = /^#[a-fA-F0-9]{3}$/;
const shortRgbaHexRE = /^#[a-fA-F0-9]{4}$/;
const rgbRE =
  /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i;
const rgbaRE =
  /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
const hslRE =
  /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i;
const hslaRE =
  /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;

// Copied from https://reactnative.dev/docs/colors
// prettier-ignore
const colorNames: Record<string, string> = { aliceblue: '#f0f8ff', antiquewhite: '#faebd7', aqua: '#00ffff', aquamarine: '#7fffd4', azure: '#f0ffff', beige: '#f5f5dc', bisque: '#ffe4c4', black: '#000000', blanchedalmond: '#ffebcd', blue: '#0000ff', blueviolet: '#8a2be2', brown: '#a52a2a', burlywood: '#deb887', cadetblue: '#5f9ea0', chartreuse: '#7fff00', chocolate: '#d2691e', coral: '#ff7f50', cornflowerblue: '#6495ed', cornsilk: '#fff8dc', crimson: '#dc143c', cyan: '#00ffff', darkblue: '#00008b', darkcyan: '#008b8b', darkgoldenrod: '#b8860b', darkgray: '#a9a9a9', darkgreen: '#006400', darkgrey: '#a9a9a9', darkkhaki: '#bdb76b', darkmagenta: '#8b008b', darkolivegreen: '#556b2f', darkorange: '#ff8c00', darkorchid: '#9932cc', darkred: '#8b0000', darksalmon: '#e9967a', darkseagreen: '#8fbc8f', darkslateblue: '#483d8b', darkslategrey: '#2f4f4f', darkturquoise: '#00ced1', darkviolet: '#9400d3', deeppink: '#ff1493', deepskyblue: '#00bfff', dimgray: '#696969', dimgrey: '#696969', dodgerblue: '#1e90ff', firebrick: '#b22222', floralwhite: '#fffaf0', forestgreen: '#228b22', fuchsia: '#ff00ff', gainsboro: '#dcdcdc', ghostwhite: '#f8f8ff', gold: '#ffd700', goldenrod: '#daa520', gray: '#808080', green: '#008000', greenyellow: '#adff2f', grey: '#808080', honeydew: '#f0fff0', hotpink: '#ff69b4', indianred: '#cd5c5c', indigo: '#4b0082', ivory: '#fffff0', khaki: '#f0e68c', lavender: '#e6e6fa', lavenderblush: '#fff0f5', lawngreen: '#7cfc00', lemonchiffon: '#fffacd', lightblue: '#add8e6', lightcoral: '#f08080', lightcyan: '#e0ffff', lightgoldenrodyellow: '#fafad2', lightgray: '#d3d3d3', lightgreen: '#90ee90', lightgrey: '#d3d3d3', lightpink: '#ffb6c1', lightsalmon: '#ffa07a', lightseagreen: '#20b2aa', lightskyblue: '#87cefa', lightslategrey: '#778899', lightsteelblue: '#b0c4de', lightyellow: '#ffffe0', lime: '#00ff00', limegreen: '#32cd32', linen: '#faf0e6', magenta: '#ff00ff', maroon: '#800000', mediumaquamarine: '#66cdaa', mediumblue: '#0000cd', mediumorchid: '#ba55d3', mediumpurple: '#9370db', mediumseagreen: '#3cb371', mediumslateblue: '#7b68ee', mediumspringgreen: '#00fa9a', mediumturquoise: '#48d1cc', mediumvioletred: '#c71585', midnightblue: '#191970', mintcream: '#f5fffa', mistyrose: '#ffe4e1', moccasin: '#ffe4b5', navajowhite: '#ffdead', navy: '#000080', oldlace: '#fdf5e6', olive: '#808000', olivedrab: '#6b8e23', orange: '#ffa500', orangered: '#ff4500', orchid: '#da70d6', palegoldenrod: '#eee8aa', palegreen: '#98fb98', paleturquoise: '#afeeee', palevioletred: '#db7093', papayawhip: '#ffefd5', peachpuff: '#ffdab9', peru: '#cd853f', pink: '#ffc0cb', plum: '#dda0dd', powderblue: '#b0e0e6', purple: '#800080', rebeccapurple: '#663399', red: '#ff0000', rosybrown: '#bc8f8f', royalblue: '#4169e1', saddlebrown: '#8b4513', salmon: '#fa8072', sandybrown: '#f4a460', seagreen: '#2e8b57', seashell: '#fff5ee', sienna: '#a0522d', silver: '#c0c0c0', skyblue: '#87ceeb', slateblue: '#6a5acd', slategray: '#708090', snow: '#fffafa', springgreen: '#00ff7f', steelblue: '#4682b4', tan: '#d2b48c', teal: '#008080', thistle: '#d8bfd8', tomato: '#ff6347', turquoise: '#40e0d0', violet: '#ee82ee', wheat: '#f5deb3', white: '#ffffff', whitesmoke: '#f5f5f5', yellow: '#ffff00', yellowgreen: '#9acd32' };

const hslToRgb = (h: number, s: number, l: number) => {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number, k: number = (n + h / 30) % 12) =>
    l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
};

export default class RgbaValue {
  red;

  green;

  blue;

  alpha;

  constructor(red: number, green: number, blue: number, alpha: number = 1) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }

  static parse(value: RgbaValue | string) {
    if (value instanceof RgbaValue) {
      return value;
    }

    const color = colorNames[value] || value;

    // Handle hex value
    const hexMatch =
      color.match(hexRE) ||
      color.match(hexRgbaRE) ||
      color.match(shortHexRE) ||
      color.match(shortRgbaHexRE);
    if (hexMatch) {
      const paramsHexMatch =
        hexMatch[0].length <= 4
          ? (hexMatch[0].match(/\w/g) || []).map((x) => `${x}${x}`)
          : hexMatch[0].match(/\w\w/g);

      if (!paramsHexMatch) {
        throw new Error(`Rgba value ${value} could not be parsed.`);
      }

      const params = paramsHexMatch.map((hex, key) => {
        const x = parseInt(hex, 16);
        const alpha = key === 3;
        return alpha ? Number((x / 255).toFixed(2)) : x;
      });

      const [r, g, b, alpha] = params;

      return new RgbaValue(r, g, b, alpha);
    }

    // Handle rgb(a) value
    const rgbMatch = color.match(rgbRE) || color.match(rgbaRE);
    if (rgbMatch) {
      const params = rgbMatch.slice(1).map((x, key) => {
        const alpha = key === 3;
        return alpha ? parseFloat(x) : parseInt(x, 10);
      });

      const [r, g, b, alpha] = params;

      return new RgbaValue(r, g, b, alpha);
    }

    // Handle hsl(a) value
    const hslMatch = color.match(hslRE) || color.match(hslaRE);
    if (hslMatch) {
      const h = parseInt(hslMatch[1], 10);
      const s = parseInt(hslMatch[2], 10) / 100;
      const l = parseInt(hslMatch[3], 10) / 100;
      const alpha = (hslMatch[4] && parseFloat(hslMatch[4])) || undefined;

      const [r, g, b] = hslToRgb(h, s, l);

      return new RgbaValue(r, g, b, alpha);
    }

    throw new Error(`Unknown color "${value}".`);
  }

  toRgb() {
    return [this.red, this.green, this.blue];
  }

  toRgba() {
    return [...this.toRgb(), this.alpha];
  }

  toHex() {
    const [...values] = this.toRgb();

    if (this.alpha < 1) {
      values.push(this.alpha);
    }

    return `#${values
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      })
      .join('')}`;
  }
}
