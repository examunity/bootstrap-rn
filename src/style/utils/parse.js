function parse() {
  // TODO: The parser should be able to parse &:hover, &:focus and &:active as
  // well as the bootstrap breakpoints mixins:
  // https://getbootstrap.com/docs/5.0/layout/breakpoints/

  // Nested blocks should be supported by the parser. That's why the value of the
  // conditions key is an array, so that multiple conditions for many blocks can
  // be applied.

  // The return type should be an array of objects of the type:
  return [
    {
      conditions: [
        // &:hover
        {
          type: 'hover',
        },
        // @include media-breakpoint-between(md, xl)
        {
          type: 'media',
          min: 'md',
          max: 'xl',
        },
      ],
      declarations: {
        height: '20rem',
        backgroundColor: 'red',
      },
    },
  ];
}

export default parse;
