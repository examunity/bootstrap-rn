import React from 'react';
import { StatusBar } from 'react-native';
import { Provider, View, StyleSheet, css, ScrollView } from 'bootstyle';
import Content from './components/Content';
import SampleAlerts from './components/SampleAlerts';
import SampleBadges from './components/SampleBadges';
import SampleButtons from './components/SampleButtons';
import SampleCards from './components/SampleCards';
import SampleModal from './components/SampleModal';
import SamplePopovers from './components/SamplePopovers';
import SampleProgress from './components/SampleProgress';
import SampleTooltips from './components/SampleTooltips';
import Utilities from './components/Utilities';
import { ListGroup } from 'bootstyle';

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
          <SampleAlerts />
        </View>
        <View style={styles.container}>
          <SampleBadges />
        </View>
        <View style={styles.container}>
          <SampleButtons />
        </View>
        <View style={styles.container}>
          <SampleCards />
        </View>
        <View style={styles.container}>
          <SampleModal />
        </View>
        <View style={styles.container}>
          <SamplePopovers />
        </View>
        <View style={styles.container}>
          <SampleProgress />
        </View>
        <View style={styles.container}>
          <SampleTooltips />
        </View>
        <View style={styles.container}>
          <Utilities />
        </View>
        <View style={styles.container}>
          <ListGroup>
            <ListGroup.Item>Patrick Item first</ListGroup.Item>
            <ListGroup.Item>Patrick Item Second</ListGroup.Item>
            <ListGroup.Item>Patrick Item 3</ListGroup.Item>
            <ListGroup.Item>Patrick Item 4</ListGroup.Item>
          </ListGroup>
        </View>
      </ScrollView>
    </Provider>
  );
}

export default App;
