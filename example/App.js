import React from 'react';
import { StatusBar } from 'react-native';
import {
  makeTheme,
  makeUtilities,
  css,
  StyleSheet,
  Provider,
  Container,
  View,
  ScrollView,
} from 'bootstyle';
import Content from './components/Content';
import Forms from './components/Forms';
import SampleAlerts from './components/SampleAlerts';
import SampleBadges from './components/SampleBadges';
import SampleButtons from './components/SampleButtons';
import SampleCards from './components/SampleCards';
import SampleGrid from './components/SampleGrid';
import SampleListGroup from './components/SampleListGroup';
import SampleModal from './components/SampleModal';
import SampleNav from './components/SampleNav';
import SampleNavbar from './components/SampleNavbar';
import SamplePopovers from './components/SamplePopovers';
import SampleProgress from './components/SampleProgress';
import SampleTooltips from './components/SampleTooltips';
import SampleOffcanvas from './components/SampleOffcanvas';
import SampleDropdown from './components/SampleDropdown';
import Utilities from './components/Utilities';

StyleSheet.build(
  // Test custom theme variables.
  makeTheme(css`
    $primary: blue;
  `),
);

const utilities = StyleSheet.create(
  makeUtilities((u) => ({
    // Test overwrite utility styles.
    justifyContent: {
      ...u.justifyContent,
      class: 'jc',
    },
    alignItems: {
      ...u.alignItems,
      class: 'ai',
    },
    alignContent: {
      ...u.alignContent,
      class: 'ac',
    },
    alignSelf: {
      ...u.alignSelf,
      class: 'as',
    },
    // Test add utility styles.
    marginLeft: {
      ...u.marginStart,
      class: 'ml',
    },
    marginRight: {
      ...u.marginEnd,
      class: 'mr',
    },
    negativeMarginLeft: {
      ...u.negativeMarginStart,
      class: 'ml',
    },
    negativeMarginRight: {
      ...u.negativeMarginEnd,
      class: 'mr',
    },
    paddingLeft: {
      ...u.paddingStart,
      class: 'pl',
    },
    paddingRight: {
      ...u.paddingEnd,
      class: 'pr',
    },
  })),
);

// TODO: Make components customizable
/* const components = {
  Button: StyleSheet.create({
    '.btn': css`
      ...
    `,
  }),
}; */

const styles = StyleSheet.create({
  container: css`
    width: 320px;
    margin-vertical: 1rem;
    align-items: center;
  `,
});

function App() {
  return (
    <Provider utilities={utilities} ssrViewport="lg">
      <StatusBar />
      <ScrollView>
        <Container styleName="ai-center">
          <View style={styles.container}>
            <Content />
          </View>
          <View style={styles.container}>
            <Forms />
          </View>
          <View style={styles.container}>
            <SampleAlerts />
          </View>
          <View style={styles.container}>
            <SampleBadges />
          </View>
          <View style={[styles.container, { zIndex: 1 }]}>
            <SampleDropdown />
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
            <SampleNav />
          </View>
          <View style={styles.container}>
            <SampleNavbar />
          </View>
          <View style={styles.container}>
            <SampleOffcanvas />
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
