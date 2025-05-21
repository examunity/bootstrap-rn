import React, { useContext } from 'react';
import {
  NativeSyntheticEvent,
  StatusBar,
  TextInputKeyPressEventData,
} from 'react-native';
import { FormikContext } from 'formik';
import {
  makeTheme,
  makeUtilities,
  // css,
  StyleSheet,
  Provider,
  Body,
  UseActionableProps,
  UseFormFieldProps,
  UseTabbableProps,
} from 'bootstrap-rn';
import { Router, Routes, Route } from './libs/react-router';
import Layout from './components/Layout';
import Content from './components/Content';
import Forms from './components/Forms';
import FormikForms from './components/FormikForms';
import SampleAlerts from './components/SampleAlerts';
import SampleBadges from './components/SampleBadges';
import SampleButtons from './components/SampleButtons';
import SampleButtonGroup from './components/SampleButtonGroup';
import SampleBreadcrumb from './components/SampleBreadcrumb';
import SampleCards from './components/SampleCards';
import SampleGrid from './components/SampleGrid';
import SampleImages from './components/SampleImages';
import SampleListGroup from './components/SampleListGroup';
import SampleModal from './components/SampleModal';
import SampleNav from './components/SampleNav';
import SampleNavbar from './components/SampleNavbar';
import SamplePagination from './components/SamplePagination';
import SamplePopovers from './components/SamplePopovers';
import SampleProgress from './components/SampleProgress';
import SamplePlaceholders from './components/SamplePlaceholders';
import SampleSpinners from './components/SampleSpinners';
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
  useFormField<T, Ref>(props: T & UseFormFieldProps, ref: Ref) {
    const formik = useContext(FormikContext);

    return {
      ...props,
      ref,
      onKeyPress(event: NativeSyntheticEvent<TextInputKeyPressEventData>) {
        if (props.onKeyPress) props.onKeyPress(event);

        // Submit form on enter
        // @ts-expect-error web only property
        if (formik && event.keyCode === 13) {
          event.preventDefault();

          const eventTarget = event.target;

          eventTarget.blur();

          formik.submitForm();
        }
      },
    };
  },
  useTabbable<T, Ref>(props: T & UseTabbableProps, ref: Ref) {
    const active = useActive(props);
    return { ...props, active, ref };
  },
  useActionable<T, Ref>(props: T & UseActionableProps, ref: Ref) {
    const linkProps = useLink(props);
    return { ...linkProps, ref };
  },
};

function App() {
  return (
    <Router>
      <Provider utilities={utilities} modifiers={modifiers} ssrViewport="lg">
        <Body>
          <StatusBar barStyle="dark-content" />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Content />} />
              <Route path="forms" element={<Forms />} />
              <Route path="alerts" element={<SampleAlerts />} />
              <Route path="badges" element={<SampleBadges />} />
              <Route path="breadcrumb" element={<SampleBreadcrumb />} />
              <Route path="buttons" element={<SampleButtons />} />
              <Route path="button-group" element={<SampleButtonGroup />} />
              <Route path="cards" element={<SampleCards />} />
              <Route path="collapse" element={<SampleCollapse />} />
              <Route path="dropdown" element={<SampleDropdown />} />
              <Route path="grid" element={<SampleGrid />} />
              <Route path="images" element={<SampleImages />} />
              <Route path="list-group" element={<SampleListGroup />} />
              <Route path="modal" element={<SampleModal />} />
              <Route path="nav" element={<SampleNav />} />
              <Route path="navbar" element={<SampleNavbar />} />
              <Route path="offcanvas" element={<SampleOffcanvas />} />
              <Route path="pagination" element={<SamplePagination />} />
              <Route path="placeholders" element={<SamplePlaceholders />} />
              <Route path="popovers" element={<SamplePopovers />} />
              <Route path="progress" element={<SampleProgress />} />
              <Route path="spinners" element={<SampleSpinners />} />
              <Route path="toasts" element={<SampleToasts />} />
              <Route path="tooltips" element={<SampleTooltips />} />
              <Route path="utilities" element={<Utilities />} />
              <Route path="formik" element={<FormikForms />} />
            </Route>
          </Routes>
        </Body>
      </Provider>
    </Router>
  );
}

export default App;
