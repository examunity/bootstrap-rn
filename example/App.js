import React from 'react';
import {
  makeTheme,
  makeUtilities,
  // css,
  StyleSheet,
  Provider,
} from 'bootstyle';
import { Router, Routes, Route } from './libs/react-router';
import Layout from './components/Layout';
import Content from './components/Content';
import Forms from './components/Forms';
import FormikForms from './components/FormikForms';
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
import SampleToasts from './components/SampleToasts';
import SampleTooltips from './components/SampleTooltips';
import SampleOffcanvas from './components/SampleOffcanvas';
import SampleDropdown from './components/SampleDropdown';
import SampleCollapse from './components/SampleCollapse';
import Utilities from './components/Utilities';
import useLink from './hooks/useLink';
import useActive from './hooks/useActive';

StyleSheet.build(
  // Test custom theme variables.
  makeTheme(/* css`
    $primary: blue;
  ` */),
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

const modifiers = {
  useTabbable(props, ref) {
    const active = useActive(props);
    return { ...props, active, ref };
  },
  useActionable(props, ref) {
    const linkProps = useLink(props);
    return { ...linkProps, ref };
  },
};

function App() {
  return (
    <Router>
      <Provider utilities={utilities} modifiers={modifiers} ssrViewport="lg">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Content />} />
            <Route path="forms" element={<Forms />} />
            <Route path="alerts" element={<SampleAlerts />} />
            <Route path="badges" element={<SampleBadges />} />
            <Route path="buttons" element={<SampleButtons />} />
            <Route path="cards" element={<SampleCards />} />
            <Route path="collapse" element={<SampleCollapse />} />
            <Route path="dropdown" element={<SampleDropdown />} />
            <Route path="grid" element={<SampleGrid />} />
            <Route path="list-group" element={<SampleListGroup />} />
            <Route path="modal" element={<SampleModal />} />
            <Route path="nav" element={<SampleNav />} />
            <Route path="navbar" element={<SampleNavbar />} />
            <Route path="offcanvas" element={<SampleOffcanvas />} />
            <Route path="popovers" element={<SamplePopovers />} />
            <Route path="progress" element={<SampleProgress />} />
            <Route path="toasts" element={<SampleToasts />} />
            <Route path="tooltips" element={<SampleTooltips />} />
            <Route path="utilities" element={<Utilities />} />
            <Route path="formik" element={<FormikForms />} />
          </Route>
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
