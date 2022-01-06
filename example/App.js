import React from 'react';
import { StatusBar } from 'react-native';
import {
  Provider,
  Container,
  View,
  StyleSheet,
  css,
  ScrollView,
} from 'bootstyle';
import Content from './components/Content';
import SampleAlerts from './components/SampleAlerts';
import SampleBadges from './components/SampleBadges';
import SampleButtons from './components/SampleButtons';
import SampleCards from './components/SampleCards';
import SampleGrid from './components/SampleGrid';
import SampleListGroup from './components/SampleListGroup';
import SampleModal from './components/SampleModal';
import SamplePopovers from './components/SamplePopovers';
import SampleProgress from './components/SampleProgress';
import SampleTooltips from './components/SampleTooltips';
import SampleAnotherModal from './components/SampleAnotherModal';
import Utilities from './components/Utilities';

StyleSheet.build();

const styles = StyleSheet.create({
  container: css`
    align-items: center;
    margin-vertical: 1rem;
  `,
});

function App() {
  return (
    <Provider ssrViewport="lg">
      <StatusBar />
      <ScrollView>
        <Container>
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
            <SampleGrid />
          </View>
          <View style={styles.container}>
            <SampleListGroup />
          </View>
          <View style={styles.container}>
            <SampleModal />
          </View>
          <View style={styles.container}>
            <SampleAnotherModal />
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
        </Container>
      </ScrollView>
    </Provider>
  );
}

export default App;
