import React from 'react';
import {
  makeTheme,
  makeUtilities,
  // css,
  StyleSheet,
  Provider,
} from 'bootstrap-rn';

StyleSheet.build(
  // Test custom theme variables.
  makeTheme(/* css`
    $primary: blue;
  ` */),
);

const utilities = StyleSheet.create(makeUtilities(() => ({})));

// TODO: Make components customizable
/* const components = {
  Button: StyleSheet.create({
    '.btn': css`
      ...
    `,
  }),
}; */

const modifiers = {
  useFormField(props) {
    return props;
  },
  useTabbable(props) {
    return props;
  },
  useActionable(props) {
    return props;
  },
};

export default function withBootstrapRNProvider(Story) {
  return (
    <Provider utilities={utilities} modifiers={modifiers} ssrViewport="lg">
      <Story />
    </Provider>
  );
}
