import React from 'react';
import { StatusBar } from 'react-native';
import { Provider, View, StyleSheet, css, ScrollView } from 'bootstyle';
import Content from './components/Content';
import Alerts from './components/Alerts';
import Badges from './components/Badges';
import Buttons from './components/Buttons';
import Cards from './components/Cards';
import Modals from './components/Modals';
import Progresses from './components/Progresses';
import Utilities from './components/Utilities';

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

StyleSheet.build();

const styles = StyleSheet.create({
  container: css`
    align-items: center;
    margin-vertical: 1rem;
  `,
});

function App() {
  return (
    <Provider ssrViewport="lg" breakpoints={breakpoints}>
      <StatusBar />
      <ScrollView>
        <View style={styles.container}>
          <Content />
        </View>
        <View style={styles.container}>
          <Alerts />
        </View>
        <View style={styles.container}>
          <Badges />
        </View>
        <View style={styles.container}>
          <Buttons />
        </View>
        <View style={styles.container}>
          <Cards />
        </View>
        <View style={styles.container}>
          <Modals />
        </View>
        <View style={styles.container}>
          <Progresses />
        </View>
        <View style={styles.container}>
          <Utilities />
        </View>
      </ScrollView>
    </Provider>
  );
}

export default App;
