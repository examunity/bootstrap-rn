import React from 'react';
import { Provider, Text, View } from 'bootstyle';

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
      <View>
        <Text>test</Text>
      </View>
    </Provider>
  );
}

export default App;
