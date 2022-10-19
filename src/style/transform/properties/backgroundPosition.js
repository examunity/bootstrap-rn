import { transformRawValue } from 'css-to-react-native';

const positionRE = /(top|right|bottom|left|center)/;

const sortPairs = (first, second) => {
  const firstValue = {
    position: first[0],
    offset: first[1]
      ? transformRawValue('backgroundPosition', first[1])
      : undefined,
  };
  const secondValue = {
    position: second[0],
    offset: second[1]
      ? transformRawValue('backgroundPosition', second[1])
      : undefined,
  };

  const shouldReversePairs =
    first[0] === 'top' ||
    first[0] === 'bottom' ||
    second[0] === 'left' ||
    second[0] === 'right';

  return shouldReversePairs
    ? [secondValue, firstValue]
    : [firstValue, secondValue];
};

// Spec: https://w3c.github.io/csswg-drafts/css-backgrounds-3/#background-position
export default function backgroundPosition(value) {
  const values = value.split(' ');
  const [first, second = 'center', third, fourth] = values;

  if (values.length <= 2) {
    const [x, y] = sortPairs(
      first.match(positionRE) ? [first] : ['left', first],
      second.match(positionRE) ? [second] : ['top', second],
    );

    return {
      backgroundPositionX: x,
      backgroundPositionY: y,
    };
  }

  if (values.length <= 4) {
    const [x, y] = second.match(positionRE)
      ? sortPairs([first], [second, third])
      : sortPairs([first, second], [third, fourth]);

    return {
      backgroundPositionX: x,
      backgroundPositionY: y,
    };
  }

  return null;
}
