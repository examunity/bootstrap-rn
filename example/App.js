import React from 'react';
import { Provider, Text, View, StyleSheet, css } from 'bootstyle';

StyleSheet.build({});

const styles = StyleSheet.create({
  container: css`
    // test
    background-color: red;
    padding: 10px;

    // not working
    /* &:hover {
      background-color: green;

      @include media-breakpoint-between(md, xl) {
        background-color: blue;
      }
    }

    &:focus {
      background-color: orange;
    }

    @include media-breakpoint-between(md, xl) {
      background-color: blue;
    } */
  `,
});

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

function App() {
  return (
    <Provider ssrViewport="lg" breakpoints={breakpoints}>
      <View style={styles.container}>
        <Text>test</Text>
      </View>
    </Provider>
  );
}

export default App;
