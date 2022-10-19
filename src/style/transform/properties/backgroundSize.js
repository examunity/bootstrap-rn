import { transformRawValue } from 'css-to-react-native';

// Spec: https://w3c.github.io/csswg-drafts/css-backgrounds/#the-background-size
export default function backgroundSize(value) {
  const values = value.split(' ');
  const [first, second = 'auto'] = values;

  if (values.length === 1) {
    return {
      backgroundSize: transformRawValue('backgroundSize', first),
    };
  }

  if (values.length === 2) {
    return {
      backgroundSize: {
        width: transformRawValue('backgroundSize', first),
        height: transformRawValue('backgroundSize', second),
      },
    };
  }

  return null;
}
