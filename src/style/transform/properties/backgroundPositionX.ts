// @ts-expect-error export exists in css-to-react-native
import { transformRawValue } from 'css-to-react-native';

export default function backgroundPositionX(value: string) {
  const values = value.split(' ');
  const [first, second = 'auto'] = values;

  if (values.length === 1) {
    return {
      backgroundPositionX: transformRawValue('backgroundPositionX', first),
    };
  }

  if (values.length === 2) {
    return {
      backgroundPositionX: {
        position: transformRawValue('backgroundPositionX', first),
        offset: transformRawValue('backgroundPositionX', second),
      },
    };
  }

  return null;
}
