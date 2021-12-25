const transformREMUnitRE = /([+-]+)?([\d.Ee]+)%/g;

function rem(value) {
  return value.replace(
    transformREMUnitRE,
    (_, unary, number) => `${unary || ''}${number / 100}`,
  );
}

export default rem;
