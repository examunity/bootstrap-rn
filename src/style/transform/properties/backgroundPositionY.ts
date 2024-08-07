// @ts-expect-error export exists in css-to-react-native
import { transformRawValue } from 'css-to-react-native';

export default function backgroundPositionY(value: string) {
  const values = value.split(' ');
  const [first, second = 'auto'] = values;

  if (values.length === 1) {
    return {
      backgroundPositionY: transformRawValue('backgroundPositionY', first),
    };
  }

  if (values.length === 2) {
    return {
      backgroundPositionY: {
        position: transformRawValue('backgroundPositionY', first),
        offset: transformRawValue('backgroundPositionY', second),
      },
    };
  }

  return null;
}
