import { Platform } from 'react-native';
import css from '../style/css';
import { calculate } from '../style/math';
import { shadeColor, tintColor, shiftColor, add, subtract } from './functions';
import type { ThemeVariables } from '../types';

const url =
  (val: string) =>
  (t: ThemeVariables): string =>
    `url("${val.replace(/#{\$(.*?)}/g, (_, key) => t[key])}")`;

const variables = css`
  // Color system

  $white: #fff;
  $gray-100: #f8f9fa;
  $gray-200: #e9ecef;
  $gray-300: #dee2e6;
  $gray-400: #ced4da;
  $gray-500: #adb5bd;
  $gray-600: #6c757d;
  $gray-700: #495057;
  $gray-800: #343a40;
  $gray-900: #212529;
  $black: #000;

  $grays: ${(t: ThemeVariables) => ({
    100: t['gray-100'],
    200: t['gray-200'],
    300: t['gray-300'],
    400: t['gray-400'],
    500: t['gray-500'],
    600: t['gray-600'],
    700: t['gray-700'],
    800: t['gray-800'],
    900: t['gray-900'],
  })};

  $blue: #0d6efd;
  $indigo: #6610f2;
  $purple: #6f42c1;
  $pink: #d63384;
  $red: #dc3545;
  $orange: #fd7e14;
  $yellow: #ffc107;
  $green: #198754;
  $teal: #20c997;
  $cyan: #0dcaf0;

  $colors: ${(t: ThemeVariables) => ({
    blue: t.blue,
    indigo: t.indigo,
    purple: t.purple,
    pink: t.pink,
    red: t.red,
    orange: t.orange,
    yellow: t.yellow,
    green: t.green,
    teal: t.teal,
    cyan: t.cyan,
  })};

  $primary: $blue;
  $secondary: $gray-600;
  $success: $green;
  $info: $cyan;
  $warning: $yellow;
  $danger: $red;
  $light: $gray-100;
  $dark: $gray-900;

  $theme-colors: ${(t: ThemeVariables) => ({
    primary: t.primary,
    secondary: t.secondary,
    success: t.success,
    info: t.info,
    warning: t.warning,
    danger: t.danger,
    light: t.light,
    dark: t.dark,
  })};

  // The contrast ratio to reach against white, to determine if color changes from "light" to "dark". Acceptable values for WCAG 2.0 are 3, 4.5 and 7.
  // See https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast
  $min-contrast-ratio: 4.5;

  // Customize the light and dark text colors for use in our color contrast function.
  $color-contrast-dark: $black;
  $color-contrast-light: $white;

  $blue-100: ${tintColor((t: ThemeVariables) => t.blue, 0.8)};
  $blue-200: ${tintColor((t: ThemeVariables) => t.blue, 0.6)};
  $blue-300: ${tintColor((t: ThemeVariables) => t.blue, 0.4)};
  $blue-400: ${tintColor((t: ThemeVariables) => t.blue, 0.2)};
  $blue-500: $blue;
  $blue-600: ${shadeColor((t: ThemeVariables) => t.blue, 0.2)};
  $blue-700: ${shadeColor((t: ThemeVariables) => t.blue, 0.4)};
  $blue-800: ${shadeColor((t: ThemeVariables) => t.blue, 0.6)};
  $blue-900: ${shadeColor((t: ThemeVariables) => t.blue, 0.8)};

  $indigo-100: ${tintColor((t: ThemeVariables) => t.indigo, 0.8)};
  $indigo-200: ${tintColor((t: ThemeVariables) => t.indigo, 0.6)};
  $indigo-300: ${tintColor((t: ThemeVariables) => t.indigo, 0.4)};
  $indigo-400: ${tintColor((t: ThemeVariables) => t.indigo, 0.2)};
  $indigo-500: $indigo;
  $indigo-600: ${shadeColor((t: ThemeVariables) => t.indigo, 0.2)};
  $indigo-700: ${shadeColor((t: ThemeVariables) => t.indigo, 0.4)};
  $indigo-800: ${shadeColor((t: ThemeVariables) => t.indigo, 0.6)};
  $indigo-900: ${shadeColor((t: ThemeVariables) => t.indigo, 0.8)};

  $purple-100: ${tintColor((t: ThemeVariables) => t.purple, 0.8)};
  $purple-200: ${tintColor((t: ThemeVariables) => t.purple, 0.6)};
  $purple-300: ${tintColor((t: ThemeVariables) => t.purple, 0.4)};
  $purple-400: ${tintColor((t: ThemeVariables) => t.purple, 0.2)};
  $purple-500: $purple;
  $purple-600: ${shadeColor((t: ThemeVariables) => t.purple, 0.2)};
  $purple-700: ${shadeColor((t: ThemeVariables) => t.purple, 0.4)};
  $purple-800: ${shadeColor((t: ThemeVariables) => t.purple, 0.6)};
  $purple-900: ${shadeColor((t: ThemeVariables) => t.purple, 0.8)};

  $pink-100: ${tintColor((t: ThemeVariables) => t.pink, 0.8)};
  $pink-200: ${tintColor((t: ThemeVariables) => t.pink, 0.6)};
  $pink-300: ${tintColor((t: ThemeVariables) => t.pink, 0.4)};
  $pink-400: ${tintColor((t: ThemeVariables) => t.pink, 0.2)};
  $pink-500: $pink;
  $pink-600: ${shadeColor((t: ThemeVariables) => t.pink, 0.2)};
  $pink-700: ${shadeColor((t: ThemeVariables) => t.pink, 0.4)};
  $pink-800: ${shadeColor((t: ThemeVariables) => t.pink, 0.6)};
  $pink-900: ${shadeColor((t: ThemeVariables) => t.pink, 0.8)};

  $red-100: ${tintColor((t: ThemeVariables) => t.red, 0.8)};
  $red-200: ${tintColor((t: ThemeVariables) => t.red, 0.6)};
  $red-300: ${tintColor((t: ThemeVariables) => t.red, 0.4)};
  $red-400: ${tintColor((t: ThemeVariables) => t.red, 0.2)};
  $red-500: $red;
  $red-600: ${shadeColor((t: ThemeVariables) => t.red, 0.2)};
  $red-700: ${shadeColor((t: ThemeVariables) => t.red, 0.4)};
  $red-800: ${shadeColor((t: ThemeVariables) => t.red, 0.6)};
  $red-900: ${shadeColor((t: ThemeVariables) => t.red, 0.8)};

  $orange-100: ${tintColor((t: ThemeVariables) => t.orange, 0.8)};
  $orange-200: ${tintColor((t: ThemeVariables) => t.orange, 0.6)};
  $orange-300: ${tintColor((t: ThemeVariables) => t.orange, 0.4)};
  $orange-400: ${tintColor((t: ThemeVariables) => t.orange, 0.2)};
  $orange-500: $orange;
  $orange-600: ${shadeColor((t: ThemeVariables) => t.orange, 0.2)};
  $orange-700: ${shadeColor((t: ThemeVariables) => t.orange, 0.4)};
  $orange-800: ${shadeColor((t: ThemeVariables) => t.orange, 0.6)};
  $orange-900: ${shadeColor((t: ThemeVariables) => t.orange, 0.8)};

  $yellow-100: ${tintColor((t: ThemeVariables) => t.yellow, 0.8)};
  $yellow-200: ${tintColor((t: ThemeVariables) => t.yellow, 0.6)};
  $yellow-300: ${tintColor((t: ThemeVariables) => t.yellow, 0.4)};
  $yellow-400: ${tintColor((t: ThemeVariables) => t.yellow, 0.2)};
  $yellow-500: $yellow;
  $yellow-600: ${shadeColor((t: ThemeVariables) => t.yellow, 0.2)};
  $yellow-700: ${shadeColor((t: ThemeVariables) => t.yellow, 0.4)};
  $yellow-800: ${shadeColor((t: ThemeVariables) => t.yellow, 0.6)};
  $yellow-900: ${shadeColor((t: ThemeVariables) => t.yellow, 0.8)};

  $green-100: ${tintColor((t: ThemeVariables) => t.green, 0.8)};
  $green-200: ${tintColor((t: ThemeVariables) => t.green, 0.6)};
  $green-300: ${tintColor((t: ThemeVariables) => t.green, 0.4)};
  $green-400: ${tintColor((t: ThemeVariables) => t.green, 0.2)};
  $green-500: $green;
  $green-600: ${shadeColor((t: ThemeVariables) => t.green, 0.2)};
  $green-700: ${shadeColor((t: ThemeVariables) => t.green, 0.4)};
  $green-800: ${shadeColor((t: ThemeVariables) => t.green, 0.6)};
  $green-900: ${shadeColor((t: ThemeVariables) => t.green, 0.8)};

  $teal-100: ${tintColor((t: ThemeVariables) => t.teal, 0.8)};
  $teal-200: ${tintColor((t: ThemeVariables) => t.teal, 0.6)};
  $teal-300: ${tintColor((t: ThemeVariables) => t.teal, 0.4)};
  $teal-400: ${tintColor((t: ThemeVariables) => t.teal, 0.2)};
  $teal-500: $teal;
  $teal-600: ${shadeColor((t: ThemeVariables) => t.teal, 0.2)};
  $teal-700: ${shadeColor((t: ThemeVariables) => t.teal, 0.4)};
  $teal-800: ${shadeColor((t: ThemeVariables) => t.teal, 0.6)};
  $teal-900: ${shadeColor((t: ThemeVariables) => t.teal, 0.8)};

  $cyan-100: ${tintColor((t: ThemeVariables) => t.cyan, 0.8)};
  $cyan-200: ${tintColor((t: ThemeVariables) => t.cyan, 0.6)};
  $cyan-300: ${tintColor((t: ThemeVariables) => t.cyan, 0.4)};
  $cyan-400: ${tintColor((t: ThemeVariables) => t.cyan, 0.2)};
  $cyan-500: $cyan;
  $cyan-600: ${shadeColor((t: ThemeVariables) => t.cyan, 0.2)};
  $cyan-700: ${shadeColor((t: ThemeVariables) => t.cyan, 0.4)};
  $cyan-800: ${shadeColor((t: ThemeVariables) => t.cyan, 0.6)};
  $cyan-900: ${shadeColor((t: ThemeVariables) => t.cyan, 0.8)};

  $blues: ${(t: ThemeVariables) => ({
    'blue-100': t['blue-100'],
    'blue-200': t['blue-200'],
    'blue-300': t['blue-300'],
    'blue-400': t['blue-400'],
    'blue-500': t['blue-500'],
    'blue-600': t['blue-600'],
    'blue-700': t['blue-700'],
    'blue-800': t['blue-800'],
    'blue-900': t['blue-900'],
  })};

  $indigos: ${(t: ThemeVariables) => ({
    'indigo-100': t['indigo-100'],
    'indigo-200': t['indigo-200'],
    'indigo-300': t['indigo-300'],
    'indigo-400': t['indigo-400'],
    'indigo-500': t['indigo-500'],
    'indigo-600': t['indigo-600'],
    'indigo-700': t['indigo-700'],
    'indigo-800': t['indigo-800'],
    'indigo-900': t['indigo-900'],
  })};

  $purples: ${(t: ThemeVariables) => ({
    'purple-100': t['purple-100'],
    'purple-200': t['purple-200'],
    'purple-300': t['purple-300'],
    'purple-400': t['purple-400'],
    'purple-500': t['purple-500'],
    'purple-600': t['purple-600'],
    'purple-700': t['purple-700'],
    'purple-800': t['purple-800'],
    'purple-900': t['purple-900'],
  })};

  $pinks: ${(t: ThemeVariables) => ({
    'pink-100': t['pink-100'],
    'pink-200': t['pink-200'],
    'pink-300': t['pink-300'],
    'pink-400': t['pink-400'],
    'pink-500': t['pink-500'],
    'pink-600': t['pink-600'],
    'pink-700': t['pink-700'],
    'pink-800': t['pink-800'],
    'pink-900': t['pink-900'],
  })};

  $reds: ${(t: ThemeVariables) => ({
    'red-100': t['red-100'],
    'red-200': t['red-200'],
    'red-300': t['red-300'],
    'red-400': t['red-400'],
    'red-500': t['red-500'],
    'red-600': t['red-600'],
    'red-700': t['red-700'],
    'red-800': t['red-800'],
    'red-900': t['red-900'],
  })};

  $oranges: ${(t: ThemeVariables) => ({
    'orange-100': t['orange-100'],
    'orange-200': t['orange-200'],
    'orange-300': t['orange-300'],
    'orange-400': t['orange-400'],
    'orange-500': t['orange-500'],
    'orange-600': t['orange-600'],
    'orange-700': t['orange-700'],
    'orange-800': t['orange-800'],
    'orange-900': t['orange-900'],
  })};

  $yellows: ${(t: ThemeVariables) => ({
    'yellow-100': t['yellow-100'],
    'yellow-200': t['yellow-200'],
    'yellow-300': t['yellow-300'],
    'yellow-400': t['yellow-400'],
    'yellow-500': t['yellow-500'],
    'yellow-600': t['yellow-600'],
    'yellow-700': t['yellow-700'],
    'yellow-800': t['yellow-800'],
    'yellow-900': t['yellow-900'],
  })};

  $greens: ${(t: ThemeVariables) => ({
    'green-100': t['green-100'],
    'green-200': t['green-200'],
    'green-300': t['green-300'],
    'green-400': t['green-400'],
    'green-500': t['green-500'],
    'green-600': t['green-600'],
    'green-700': t['green-700'],
    'green-800': t['green-800'],
    'green-900': t['green-900'],
  })};

  $teals: ${(t: ThemeVariables) => ({
    'teal-100': t['teal-100'],
    'teal-200': t['teal-200'],
    'teal-300': t['teal-300'],
    'teal-400': t['teal-400'],
    'teal-500': t['teal-500'],
    'teal-600': t['teal-600'],
    'teal-700': t['teal-700'],
    'teal-800': t['teal-800'],
    'teal-900': t['teal-900'],
  })};

  $cyans: ${(t: ThemeVariables) => ({
    'cyan-100': t['cyan-100'],
    'cyan-200': t['cyan-200'],
    'cyan-300': t['cyan-300'],
    'cyan-400': t['cyan-400'],
    'cyan-500': t['cyan-500'],
    'cyan-600': t['cyan-600'],
    'cyan-700': t['cyan-700'],
    'cyan-800': t['cyan-800'],
    'cyan-900': t['cyan-900'],
  })};

  // Characters which are escaped by the escape-svg function
  // $escaped characters

  // Options
  //
  // Quickly modify global styling by enabling or disabling optional features.

  // NOTE: Handled by JavaScript.

  // Gradient
  //
  // The gradient which is added to components if "$enable-gradients" is "true"
  // This gradient is also added to elements with ".bg-gradient"
  $gradient: linear-gradient(180deg, rgba($white, 0.15), rgba($white, 0));

  // Spacing
  //
  // Control the default styling of most Bootstrap elements by modifying these
  // variables. Mostly focused on spacing.
  // You can add more entries to the $spacers map, should you need more variation.

  $spacer: 1rem;
  $spacers: ${(t: ThemeVariables) => ({
    0: '0px',
    1: `${t.spacer} * 0.25`,
    2: `${t.spacer} * 0.5`,
    3: t.spacer,
    4: `${t.spacer} * 1.5`,
    5: `${t.spacer} * 3`,
  })};

  // Position
  //
  // Define the edge positioning anchors of the position utilities.

  $position-values: ${() => ({
    0: '0px',
    50: '50%',
    100: '100%',
  })};

  // Placeholder

  $placeholder-opacity-max: 0.5;
  $placeholder-opacity-min: 0.2;

  // Body
  //
  // Settings for the "<body>" element.

  $body-bg: $white;
  $body-color: $gray-900;
  $body-text-align: null;

  // Links
  //
  // Style anchor elements.

  $link-color: $primary;
  $link-decoration: underline;
  $link-shade-percentage: 20%;
  $link-hover-color: ${shiftColor(
    (t: ThemeVariables) => t['link-color'],
    (t: ThemeVariables) => t['link-shade-percentage'],
  )};
  $link-hover-decoration: null;

  $stretched-link-pseudo-element: after;
  $stretched-link-z-index: 1;

  // Paragraphs
  //
  // Style p element.

  $paragraph-margin-bottom: 1rem;

  // Grid breakpoints
  //
  // Define the minimum dimensions at which your layout will change,
  // adapting to different screen sizes, for use in media queries.

  $grid-breakpoints: ${() => ({
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  })};

  // Grid containers
  //
  // Define the maximum width of ".container" for different screen sizes.

  $container-max-widths: ${() => ({
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
    xxl: '1320px',
  })};

  // Grid columns
  //
  // Set the number of columns and specify the width of the gutters.

  // $grid-columns: 12;
  $grid-gutter-width: 1.5rem;
  // $grid-row-columns: 6;

  // Container padding

  $container-padding-x: $grid-gutter-width * 0.5;

  // Components
  //
  // Define common padding and border radius sizes and more.

  $border-width: 1px;
  $border-widths: ${() => ({
    1: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    5: '5px',
  })};

  $border-color: $gray-300;

  $border-radius: 0.25rem;
  $border-radius-sm: 0.2rem;
  $border-radius-lg: 0.3rem;
  $border-radius-pill: 50rem;

  $box-shadow: 0 0.5rem 1rem rgba($black, 0.15);
  $box-shadow-sm: 0 0.125rem 0.25rem rgba($black, 0.075);
  $box-shadow-lg: 0 1rem 3rem rgba($black, 0.175);
  $box-shadow-inset: inset 0 1px 2px rgba($black, 0.075);

  $component-active-color: $white;
  $component-active-bg: $primary;

  $caret-width: 1rem * 0.3; // 0.3em;
  $caret-vertical-align: $caret-width * 0.85;
  $caret-spacing: $caret-width * 0.85;

  $transition-base: all 0.2s ease-in-out;
  $transition-fade: opacity 0.15s linear;
  $transition-collapse: height 0.35s ease;
  $transition-collapse-width: width 0.35s ease;

  $aspect-ratios: ${() => ({
    '1x1': '100%',
    '4x3': 'calc(3 / 4 * 100%)',
    '16x9': 'calc(9 / 16 * 100%)',
    '21x9': 'calc(9 / 21 * 100%)',
  })};

  // Typography
  //
  // Font, line-height, and color for body text, headings, and more.

  $font-family-sans-serif: ${() =>
    Platform.select({
      native: 'System',
      default:
        "\"system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'\"",
    })};
  $font-family-monospace: ${() =>
    Platform.select({
      android: 'monospace',
      ios: 'Courier New',
      default:
        "\"SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace\"",
    })};
  $font-family-base: $font-family-sans-serif;
  $font-family-code: $font-family-monospace;

  // $font-size-root affects the value of "rem", which is used for as well font sizes, paddings, and margins
  // $font-size-base affects the font size of the body text
  $font-size-root: null;
  $font-size-base: 1rem; // Assumes the browser default, typically "16px"
  $font-size-sm: $font-size-base * 0.875;
  $font-size-lg: $font-size-base * 1.25;

  $font-weight-lighter: 300; // lighter;
  $font-weight-light: 300;
  $font-weight-normal: 400;
  $font-weight-bold: 700;
  $font-weight-bolder: 500; // bolder;

  $font-weight-base: $font-weight-normal;

  $line-height-base: 1.5;
  $line-height-sm: 1.25;
  $line-height-lg: 2;

  $h1-font-size: $font-size-base * 2.5;
  $h2-font-size: $font-size-base * 2;
  $h3-font-size: $font-size-base * 1.75;
  $h4-font-size: $font-size-base * 1.5;
  $h5-font-size: $font-size-base * 1.25;
  $h6-font-size: $font-size-base;

  $font-sizes: ${(t: ThemeVariables) => ({
    1: t['h1-font-size'],
    2: t['h2-font-size'],
    3: t['h3-font-size'],
    4: t['h4-font-size'],
    5: t['h5-font-size'],
    6: t['h6-font-size'],
  })};

  $headings-margin-bottom: $spacer * 0.5;
  $headings-font-family: null;
  $headings-font-style: null;
  $headings-font-weight: 500;
  $headings-line-height: 1.2;
  $headings-color: null;

  $display-font-sizes: ${() => ({
    1: '5rem',
    2: '4.5rem',
    3: '4rem',
    4: '3.5rem',
    5: '3rem',
    6: '2.5rem',
  })};

  $display-font-weight: 300;
  $display-line-height: $headings-line-height;

  $lead-font-size: $font-size-base * 1.25;
  $lead-font-weight: 300;

  $small-font-size: $font-size-base * 0.875; // 0.875em;

  $sub-sup-font-size: $font-size-base * 0.75; // 0.75em;

  $text-muted: $gray-600;

  $initialism-font-size: $small-font-size;

  $blockquote-margin-y: $spacer;
  $blockquote-font-size: $font-size-base * 1.25;
  $blockquote-footer-color: $gray-600;
  $blockquote-footer-font-size: $small-font-size;

  $hr-margin-y: $spacer;
  $hr-color: inherit;
  $hr-bg-color: currentColor;
  $hr-border-width: 0;
  $hr-height: $border-width;
  $hr-opacity: 0.25;

  $legend-margin-bottom: 0.5rem;
  $legend-font-size: 1.5rem;
  $legend-font-weight: null;

  $mark-padding: $font-size-base * 0.2; // 0.2em;

  $dt-font-weight: $font-weight-bold;

  $nested-kbd-font-weight: $font-weight-bold;

  $list-inline-padding: 0.5rem;

  $mark-bg: #fcf8e3;

  // ...

  // Buttons + Forms
  //
  // Shared variables that are reassigned to "$input-" and "$btn-" specific variables.

  $input-btn-padding-y: 0.375rem;
  $input-btn-padding-x: 0.75rem;
  $input-btn-font-family: null;
  $input-btn-font-size: $font-size-base;
  $input-btn-line-height: $line-height-base;

  $input-btn-focus-width: 0.25rem;
  $input-btn-focus-color-opacity: 0.25;
  $input-btn-focus-color: rgba(
    $component-active-bg,
    $input-btn-focus-color-opacity
  );
  $input-btn-focus-blur: 0;
  $input-btn-focus-box-shadow: 0 0 $input-btn-focus-blur $input-btn-focus-width
    $input-btn-focus-color;

  $input-btn-padding-y-sm: 0.25rem;
  $input-btn-padding-x-sm: 0.5rem;
  $input-btn-font-size-sm: $font-size-sm;

  $input-btn-padding-y-lg: 0.5rem;
  $input-btn-padding-x-lg: 1rem;
  $input-btn-font-size-lg: $font-size-lg;

  $input-btn-border-width: $border-width;

  // Buttons
  //
  // For each of Bootstrap's buttons, define text, background, and border color.

  $btn-padding-y: $input-btn-padding-y;
  $btn-padding-x: $input-btn-padding-x;
  $btn-font-family: $input-btn-font-family;
  $btn-font-size: $input-btn-font-size;
  $btn-line-height: $input-btn-line-height;
  $btn-white-space: null; // Set to "nowrap" to prevent text wrapping

  $btn-padding-y-sm: $input-btn-padding-y-sm;
  $btn-padding-x-sm: $input-btn-padding-x-sm;
  $btn-font-size-sm: $input-btn-font-size-sm;

  $btn-padding-y-lg: $input-btn-padding-y-lg;
  $btn-padding-x-lg: $input-btn-padding-x-lg;
  $btn-font-size-lg: $input-btn-font-size-lg;

  $btn-border-width: $input-btn-border-width;

  $btn-font-weight: $font-weight-normal;
  $btn-box-shadow:
    inset 0 1px 0 rgba($white, 0.15),
    0 1px 1px rgba($black, 0.075);
  $btn-focus-width: $input-btn-focus-width;
  $btn-focus-box-shadow: $input-btn-focus-box-shadow;
  $btn-disabled-opacity: 0.65;
  $btn-active-box-shadow: inset 0 3px 5px rgba($black, 0.125);

  $btn-link-color: $link-color;
  $btn-link-hover-color: $link-hover-color;
  $btn-link-disabled-color: $gray-600;

  // Allows for customizing button radius independently from global border radius
  $btn-border-radius: $border-radius;
  $btn-border-radius-sm: $border-radius-sm;
  $btn-border-radius-lg: $border-radius-lg;

  $btn-transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  $btn-hover-bg-shade-amount: 15%;
  $btn-hover-bg-tint-amount: 15%;
  $btn-hover-border-shade-amount: 20%;
  $btn-hover-border-tint-amount: 10%;
  $btn-active-bg-shade-amount: 20%;
  $btn-active-bg-tint-amount: 20%;
  $btn-active-border-shade-amount: 25%;
  $btn-active-border-tint-amount: 10%;

  // Breadcrumb

  $breadcrumb-font-size: $font-size-base; // null;
  $breadcrumb-padding-y: 0;
  $breadcrumb-padding-x: 0;
  $breadcrumb-item-padding-x: 0.5rem;
  $breadcrumb-margin-bottom: 1rem;
  $breadcrumb-bg: null;
  $breadcrumb-divider-color: $gray-600;
  $breadcrumb-active-color: $gray-600;
  $breadcrumb-divider: ${() => '/'}; // quote('/');
  $breadcrumb-divider-flipped: $breadcrumb-divider;
  $breadcrumb-border-radius: null;

  // Forms

  $form-text-margin-top: 0.25rem;
  $form-text-font-size: $small-font-size;
  $form-text-font-style: null;
  $form-text-font-weight: null;
  $form-text-color: $text-muted;

  $form-label-margin-bottom: 0.5rem;
  $form-label-font-size: $font-size-base; // null;
  $form-label-font-style: null;
  $form-label-font-weight: null;
  $form-label-color: null;

  $input-padding-y: $input-btn-padding-y;
  $input-padding-x: $input-btn-padding-x;
  $input-font-family: $input-btn-font-family;
  $input-font-size: $input-btn-font-size;
  $input-font-weight: $font-weight-base;
  $input-line-height: $input-btn-line-height;

  $input-padding-y-sm: $input-btn-padding-y-sm;
  $input-padding-x-sm: $input-btn-padding-x-sm;
  $input-font-size-sm: $input-btn-font-size-sm;

  $input-padding-y-lg: $input-btn-padding-y-lg;
  $input-padding-x-lg: $input-btn-padding-x-lg;
  $input-font-size-lg: $input-btn-font-size-lg;

  $input-bg: $body-bg;
  $input-disabled-bg: $gray-200;
  $input-disabled-border-color: null;

  $input-color: $body-color;
  $input-border-color: $gray-400;
  $input-border-width: $input-btn-border-width;
  $input-box-shadow: $box-shadow-inset;

  $input-border-radius: $border-radius;
  $input-border-radius-sm: $border-radius-sm;
  $input-border-radius-lg: $border-radius-lg;

  $input-focus-bg: $input-bg;
  $input-focus-border-color: ${tintColor(
    (t: ThemeVariables) => t['component-active-bg'],
    0.5,
  )};
  $input-focus-color: $input-color;
  $input-focus-width: $input-btn-focus-width;
  $input-focus-box-shadow: $input-btn-focus-box-shadow;

  $input-placeholder-color: $gray-600;
  $input-plaintext-color: $body-color;

  $input-height-border: $input-border-width * 2;

  $input-height-inner: ${add(
    (t: ThemeVariables) => calculate(t['input-line-height'], '*', 1),
    (t: ThemeVariables) => calculate(t['input-padding-y'], '*', 2),
  )};
  $input-height-inner-half: ${add(
    (t: ThemeVariables) => calculate(t['input-line-height'], '*', 0.5),
    (t: ThemeVariables) => t['input-padding-y'],
  )};
  $input-height-inner-quarter: ${add(
    (t: ThemeVariables) => calculate(t['input-line-height'], '*', 0.25),
    (t: ThemeVariables) => calculate(t['input-padding-y'], '*', 0.5),
  )};

  $input-height: ${add(
    (t: ThemeVariables) =>
      calculate(t['input-line-height'], '*', t['input-font-size']), // 1em
    add(
      (t: ThemeVariables) => calculate(t['input-padding-y'], '*', 2),
      (t: ThemeVariables) => t['input-height-border'],
    ),
  )};
  $input-height-sm: ${add(
    (t: ThemeVariables) =>
      calculate(t['input-line-height'], '*', t['input-font-size-sm']), // 1em
    add(
      (t: ThemeVariables) => calculate(t['input-padding-y-sm'], '*', 2),
      (t: ThemeVariables) => t['input-height-border'],
    ),
  )};
  $input-height-lg: ${add(
    (t: ThemeVariables) =>
      calculate(t['input-line-height'], '*', t['input-font-size-lg']), // 1em
    add(
      (t: ThemeVariables) => calculate(t['input-padding-y-lg'], '*', 2),
      (t: ThemeVariables) => t['input-height-border'],
    ),
  )};

  $input-transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  $form-color-width: 3rem;

  $form-check-input-width: $font-size-base * 1; // 1em;
  $form-check-min-height: $font-size-base * $line-height-base;
  $form-check-padding-start: $form-check-input-width + 0.5rem; // 0.5em;
  $form-check-margin-bottom: 0.125rem;
  $form-check-label-color: null;
  $form-check-label-cursor: null;
  $form-check-transition: null;

  $form-check-input-active-filter: brightness(90%);

  $form-check-input-bg: $input-bg;
  $form-check-input-border: 1px solid rgba($black, 0.25);
  $form-check-input-border-radius: $font-size-base * 0.25; // 0.25em;
  $form-check-radio-border-radius: $form-check-input-width * 0.5; // 50%;
  $form-check-input-focus-border: $input-focus-border-color;
  $form-check-input-focus-box-shadow: $input-btn-focus-box-shadow;

  $form-check-input-checked-color: $component-active-color;
  $form-check-input-checked-bg-color: $component-active-bg;
  $form-check-input-checked-border-color: $form-check-input-checked-bg-color;
  $form-check-input-checked-bg-image: ${url(
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#{$form-check-input-checked-color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/></svg>",
  )};
  $form-check-radio-checked-bg-image: ${url(
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='2' fill='#{$form-check-input-checked-color}'/></svg>",
  )};

  $form-check-input-indeterminate-color: $component-active-color;
  $form-check-input-indeterminate-bg-color: $component-active-bg;
  $form-check-input-indeterminate-border-color: $form-check-input-indeterminate-bg-color;
  $form-check-input-indeterminate-bg-image: ${url(
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#{$form-check-input-indeterminate-color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/></svg>",
  )};

  $form-check-input-disabled-opacity: 0.5;
  $form-check-label-disabled-opacity: $form-check-input-disabled-opacity;
  $form-check-btn-check-disabled-opacity: $btn-disabled-opacity;

  $form-check-inline-margin-end: 1rem;

  $form-switch-color: rgba($black, 0.25);
  $form-switch-width: 2rem;
  $form-switch-padding-start: $form-switch-width + 0.5rem;
  $form-switch-bg-image: ${url(
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#{$form-switch-color}'/></svg>",
  )};
  $form-switch-border-radius: $form-switch-width;
  $form-switch-transition: background-position 0.15s ease-in-out;

  $form-switch-focus-color: $input-focus-border-color;
  $form-switch-focus-bg-image: ${url(
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#{$form-switch-focus-color}'/></svg>",
  )};

  $form-switch-checked-color: $component-active-color;
  $form-switch-checked-bg-image: ${url(
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#{$form-switch-checked-color}'/></svg>",
  )};
  $form-switch-checked-bg-position: right center;

  $input-group-addon-padding-y: $input-padding-y;
  $input-group-addon-padding-x: $input-padding-x;
  $input-group-addon-font-weight: $input-font-weight;
  $input-group-addon-color: $input-color;
  $input-group-addon-bg: $gray-200;
  $input-group-addon-border-color: $input-border-color;

  $form-select-padding-y: $input-padding-y;
  $form-select-padding-x: $input-padding-x;
  $form-select-font-family: $input-font-family;
  $form-select-font-size: $input-font-size;
  $form-select-indicator-padding: $form-select-padding-x * 3; // Extra padding for background-image
  $form-select-font-weight: $input-font-weight;
  $form-select-line-height: $input-line-height;
  $form-select-color: $input-color;
  $form-select-bg: $input-bg;
  $form-select-disabled-color: null;
  $form-select-disabled-bg: $gray-200;
  $form-select-disabled-border-color: $input-disabled-border-color;
  $form-select-bg-position: right $form-select-padding-x center;
  $form-select-bg-size: 16px 12px; // In pixels because image dimensions
  $form-select-indicator-color: $gray-800;
  $form-select-indicator: ${url(
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='#{$form-select-indicator-color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/></svg>",
  )};

  $form-select-feedback-icon-padding-end: $form-select-padding-x * 2.5 +
    $form-select-indicator-padding;
  $form-select-feedback-icon-position: center right
    $form-select-indicator-padding;
  $form-select-feedback-icon-size: $input-height-inner-half
    $input-height-inner-half;

  $form-select-border-width: $input-border-width;
  $form-select-border-color: $input-border-color;
  $form-select-border-radius: $input-border-radius;
  $form-select-box-shadow: $box-shadow-inset;

  $form-select-focus-border-color: $input-focus-border-color;
  $form-select-focus-width: $input-focus-width;
  $form-select-focus-box-shadow: 0 0 0 $form-select-focus-width
    $input-btn-focus-color;

  $form-select-padding-y-sm: $input-padding-y-sm;
  $form-select-padding-x-sm: $input-padding-x-sm;
  $form-select-font-size-sm: $input-font-size-sm;
  $form-select-border-radius-sm: $input-border-radius-sm;

  $form-select-padding-y-lg: $input-padding-y-lg;
  $form-select-padding-x-lg: $input-padding-x-lg;
  $form-select-font-size-lg: $input-font-size-lg;
  $form-select-border-radius-lg: $input-border-radius-lg;

  $form-select-transition: $input-transition;

  $form-range-track-width: 100%;
  $form-range-track-height: 0.5rem;
  $form-range-track-cursor: pointer;
  $form-range-track-bg: $gray-300;
  $form-range-track-border-radius: 1rem;
  $form-range-track-box-shadow: $box-shadow-inset;

  $form-range-thumb-width: 1rem;
  $form-range-thumb-height: $form-range-thumb-width;
  $form-range-thumb-bg: $component-active-bg;
  $form-range-thumb-border: 0;
  $form-range-thumb-border-radius: 1rem;
  $form-range-thumb-box-shadow: 0 0.1rem 0.25rem rgba($black, 0.1);
  $form-range-thumb-focus-box-shadow:
    0 0 0 1px $body-bg,
    $input-focus-box-shadow;
  $form-range-thumb-focus-box-shadow-width: $input-focus-width; // For focus box shadow issue in Edge
  $form-range-thumb-active-bg: ${tintColor(
    (t: ThemeVariables) => t['component-active-bg'],
    0.7,
  )};
  $form-range-thumb-disabled-bg: $gray-500;
  $form-range-thumb-transition:
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  $form-file-button-color: $input-color;
  $form-file-button-bg: $input-group-addon-bg;
  $form-file-button-hover-bg: ${shadeColor(
    (t: ThemeVariables) => t['form-file-button-bg'],
    0.05,
  )};

  $form-floating-height: ${add(
    '3.5rem',
    (t: ThemeVariables) => t['input-height-border'],
  )};
  $form-floating-line-height: 1.25;
  $form-floating-padding-x: $input-padding-x;
  $form-floating-padding-y: 1rem;
  $form-floating-input-padding-t: 1.625rem;
  $form-floating-input-padding-b: 0.625rem;
  $form-floating-label-opacity: 0.65;
  $form-floating-label-transform: scale(0.85) translateY(-0.5rem)
    translateX(0.15rem);
  $form-floating-transition:
    opacity 0.1s ease-in-out,
    transform 0.1s ease-in-out;

  // Form validation

  $form-feedback-margin-top: $form-text-margin-top;
  $form-feedback-font-size: $form-text-font-size;
  $form-feedback-font-style: $form-text-font-style;
  $form-feedback-valid-color: $success;
  $form-feedback-invalid-color: $danger;

  $form-feedback-icon-valid-color: $form-feedback-valid-color;
  $form-feedback-icon-valid: ${url(
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#{$form-feedback-icon-valid-color}' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/></svg>",
  )};
  $form-feedback-icon-invalid-color: $form-feedback-invalid-color;
  $form-feedback-icon-invalid: ${url(
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='#{$form-feedback-icon-invalid-color}'><circle cx='6' cy='6' r='4.5'/><path stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/><circle cx='6' cy='8.2' r='.6' fill='#{$form-feedback-icon-invalid-color}' stroke='none'/></svg>",
  )};

  $form-validation-states: ${(t: ThemeVariables) => ({
    valid: {
      color: t['form-feedback-valid-color'],
      icon: t['form-feedback-icon-valid'],
    },
    invalid: {
      color: t['form-feedback-invalid-color'],
      icon: t['form-feedback-icon-invalid'],
    },
  })};

  // Z-index master list
  //
  // Warning: Avoid customizing these values. They're used for a bird's eye view
  // of components dependent on the z-axis and are designed to all work together.

  $zindex-dropdown: 1000;
  $zindex-sticky: 1020;
  $zindex-fixed: 1030;
  $zindex-offcanvas-backdrop: 1040;
  $zindex-offcanvas: 1045;
  $zindex-modal-backdrop: 1050;
  $zindex-modal: 1055;
  $zindex-popover: 1070;
  $zindex-tooltip: 1080;

  // Navs

  $nav-link-padding-y: 0.5rem;
  $nav-link-padding-x: 1rem;
  $nav-link-font-size: null;
  $nav-link-font-weight: null;
  $nav-link-color: $link-color;
  $nav-link-hover-color: $link-hover-color;
  $nav-link-transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  $nav-link-disabled-color: $gray-600;

  $nav-tabs-border-color: $gray-300;
  $nav-tabs-border-width: $border-width;
  $nav-tabs-border-radius: $border-radius;
  $nav-tabs-link-hover-border-color: $gray-200 $gray-200 $nav-tabs-border-color;
  $nav-tabs-link-active-color: $gray-700;
  $nav-tabs-link-active-bg: $body-bg;
  $nav-tabs-link-active-border-color: $gray-300 $gray-300
    $nav-tabs-link-active-bg;

  $nav-pills-border-radius: $border-radius;
  $nav-pills-link-active-color: $component-active-color;
  $nav-pills-link-active-bg: $component-active-bg;

  // Navbar

  $navbar-padding-y: $spacer * 0.5;
  $navbar-padding-x: null;

  $navbar-nav-link-padding-x: 0.5rem;

  $navbar-brand-font-size: $font-size-lg;

  $nav-link-height: $font-size-base * $line-height-base + $nav-link-padding-y *
    2;
  $navbar-brand-height: $navbar-brand-font-size * $line-height-base;
  $navbar-brand-padding-y-intermediate-result: $nav-link-height -
    $navbar-brand-height;
  $navbar-brand-padding-y: $navbar-brand-padding-y-intermediate-result * 0.5;
  $navbar-brand-margin-end: 1rem;

  $navbar-toggler-padding-y: 0.25rem;
  $navbar-toggler-padding-x: 0.75rem;
  $navbar-toggler-font-size: $font-size-lg;
  $navbar-toggler-border-radius: $btn-border-radius;
  $navbar-toggler-focus-width: $btn-focus-width;
  $navbar-toggler-transition: box-shadow 0.15s ease-in-out;

  $navbar-dark-color: rgba($white, 0.55);
  $navbar-dark-hover-color: rgba($white, 0.75);
  $navbar-dark-active-color: $white;
  $navbar-dark-disabled-color: rgba($white, 0.25);
  $navbar-dark-toggler-icon-bg: ${url(
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path stroke='#{$navbar-dark-color}' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/></svg>",
  )};
  $navbar-dark-toggler-border-color: rgba($white, 0.1);

  $navbar-light-color: rgba($black, 0.55);
  $navbar-light-hover-color: rgba($black, 0.7);
  $navbar-light-active-color: rgba($black, 0.9);
  $navbar-light-disabled-color: rgba($black, 0.3);
  $navbar-light-toggler-icon-bg: ${url(
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path stroke='#{$navbar-light-color}' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/></svg>",
  )};
  $navbar-light-toggler-border-color: rgba($black, 0.1);

  $navbar-light-brand-color: $navbar-light-active-color;
  $navbar-light-brand-hover-color: $navbar-light-active-color;
  $navbar-dark-brand-color: $navbar-dark-active-color;
  $navbar-dark-brand-hover-color: $navbar-dark-active-color;

  // Dropdowns
  //
  // Dropdown menu container and contents.

  $dropdown-min-width: 10rem;
  $dropdown-padding-x: 0;
  $dropdown-padding-y: 0.5rem;
  $dropdown-spacer: 0.125rem;
  $dropdown-font-size: $font-size-base;
  $dropdown-color: $body-color;
  $dropdown-bg: $white;
  $dropdown-border-color: rgba($black, 0.15);
  $dropdown-border-radius: $border-radius;
  $dropdown-border-width: $border-width;
  $dropdown-inner-border-radius: ${subtract(
    (t: ThemeVariables) => t['dropdown-border-radius'],
    (t: ThemeVariables) => t['dropdown-border-width'],
  )};
  $dropdown-divider-bg: $dropdown-border-color;
  $dropdown-divider-margin-y: $spacer * 0.5;
  $dropdown-box-shadow: $box-shadow;

  $dropdown-link-color: $gray-900;

  $dropdown-link-hover-color: ${shadeColor(
    (t: ThemeVariables) => t['dropdown-link-color'],
    0.1,
  )};
  $dropdown-link-hover-bg: $gray-200;

  $dropdown-link-active-color: $component-active-color;
  $dropdown-link-active-bg: $component-active-bg;

  $dropdown-link-disabled-color: $gray-500;

  $dropdown-item-padding-y: $spacer * 0.25;
  $dropdown-item-padding-x: $spacer;

  $dropdown-header-color: $gray-600;
  $dropdown-header-padding: $dropdown-padding-y $dropdown-item-padding-x;

  $dropdown-dark-color: $gray-300;
  $dropdown-dark-bg: $gray-800;
  $dropdown-dark-border-color: $dropdown-border-color;
  $dropdown-dark-divider-bg: $dropdown-divider-bg;
  $dropdown-dark-box-shadow: null;
  $dropdown-dark-link-color: $dropdown-dark-color;
  $dropdown-dark-link-hover-color: $white;
  $dropdown-dark-link-hover-bg: rgba($white, 0.15);
  $dropdown-dark-link-active-color: $dropdown-link-active-color;
  $dropdown-dark-link-active-bg: $dropdown-link-active-bg;
  $dropdown-dark-link-disabled-color: $gray-500;
  $dropdown-dark-header-color: $gray-500;

  // ...

  // Cards

  $card-spacer-y: $spacer;
  $card-spacer-x: $spacer;
  $card-title-spacer-y: $spacer * 0.5;
  $card-border-width: $border-width;
  $card-border-color: rgba($black, 0.125);
  $card-border-radius: $border-radius;
  $card-box-shadow: null;
  $card-inner-border-radius: ${subtract(
    (t: ThemeVariables) => t['card-border-radius'],
    (t: ThemeVariables) => t['card-border-width'],
  )};
  $card-cap-padding-y: $card-spacer-y * 0.5;
  $card-cap-padding-x: $card-spacer-x;
  $card-cap-bg: rgba($black, 0.03);
  $card-cap-color: null;
  $card-height: null;
  $card-color: null;
  $card-bg: $white;
  $card-img-overlay-padding: $spacer;
  $card-group-margin: $grid-gutter-width * 0.5;

  // ...

  // Tooltips

  $tooltip-font-size: $font-size-sm;
  $tooltip-max-width: 200px;
  $tooltip-color: $white;
  $tooltip-bg: $black;
  $tooltip-border-radius: $border-radius;
  $tooltip-opacity: 0.9;
  $tooltip-padding-y: $spacer * 0.25;
  $tooltip-padding-x: $spacer * 0.5;
  $tooltip-margin: 0;

  $tooltip-arrow-width: 0.8rem;
  $tooltip-arrow-height: 0.4rem;
  $tooltip-arrow-color: $tooltip-bg;

  // Popovers

  $popover-font-size: $font-size-sm;
  $popover-bg: $white;
  $popover-max-width: 276px;
  $popover-border-width: $border-width;
  $popover-border-color: rgba($black, 0.2);
  $popover-border-radius: $border-radius-lg;
  $popover-inner-border-radius: ${subtract(
    (t: ThemeVariables) => t['popover-border-radius'],
    (t: ThemeVariables) => t['popover-border-width'],
  )};
  $popover-box-shadow: $box-shadow;

  $popover-header-bg: ${shadeColor(
    (t: ThemeVariables) => t['popover-bg'],
    0.06,
  )};
  $popover-header-color: $headings-color;
  $popover-header-padding-y: 0.5rem;
  $popover-header-padding-x: $spacer;

  $popover-body-color: $body-color;
  $popover-body-padding-y: $spacer;
  $popover-body-padding-x: $spacer;

  $popover-arrow-width: 1rem;
  $popover-arrow-height: 0.5rem;
  $popover-arrow-color: $popover-bg;

  $popover-arrow-outer-color: $popover-border-color;

  // Toasts

  $toast-max-width: 350px;
  $toast-padding-x: 0.75rem;
  $toast-padding-y: 0.5rem;
  $toast-font-size: 0.875rem;
  $toast-color: null;
  $toast-background-color: rgba($white, 0.85);
  $toast-border-width: 1px;
  $toast-border-color: rgba($black, 0.1);
  $toast-border-radius: $border-radius;
  $toast-box-shadow: $box-shadow;
  $toast-spacing: $container-padding-x;

  $toast-header-color: $gray-600;
  $toast-header-background-color: rgba($white, 0.85);
  $toast-header-border-color: rgba($black, 0.05);

  // Badges

  $badge-font-size: $font-size-base * 0.75; // 0.75em;
  $badge-font-weight: $font-weight-bold;
  $badge-color: $white;
  $badge-padding-y: $badge-font-size * 0.35; // 0.35em;
  $badge-padding-x: $badge-font-size * 0.65; // 0.65em;
  $badge-border-radius: $border-radius;

  // Modals

  $modal-inner-padding: $spacer;

  $modal-footer-margin-between: 0.5rem;

  $modal-dialog-margin: 0.5rem;
  $modal-dialog-margin-y-sm-up: 1.75rem;

  $modal-title-line-height: $line-height-base;

  $modal-content-color: null;
  $modal-content-bg: $white;
  $modal-content-border-color: rgba($black, 0.65); // rgba($black, 0.2);
  $modal-content-border-width: $border-width;
  $modal-content-border-radius: $border-radius-lg;
  $modal-content-inner-border-radius: ${subtract(
    (t: ThemeVariables) => t['modal-content-border-radius'],
    (t: ThemeVariables) => t['modal-content-border-width'],
  )};
  $modal-content-box-shadow-xs: $box-shadow-sm;
  $modal-content-box-shadow-sm-up: $box-shadow;

  $modal-backdrop-bg: $black;
  $modal-backdrop-opacity: 0.5;
  $modal-header-border-color: $border-color;
  $modal-footer-border-color: $modal-header-border-color;
  $modal-header-border-width: $modal-content-border-width;
  $modal-footer-border-width: $modal-header-border-width;
  $modal-header-padding-y: $modal-inner-padding;
  $modal-header-padding-x: $modal-inner-padding;
  $modal-header-padding: $modal-header-padding-y $modal-header-padding-x; // Keep this for backwards compatibility

  $modal-sm: 300px;
  $modal-md: 500px;
  $modal-lg: 800px;
  $modal-xl: 1140px;

  $modal-fade-transform: translate(0, -50px);
  $modal-show-transform: none;
  $modal-transition: transform 0.3s ease-out;
  $modal-scale-transform: scale(1.02);

  // ...

  // Alerts
  //
  // Define alert colors, border radius, and padding.

  $alert-padding-y: $spacer;
  $alert-padding-x: $spacer;
  $alert-margin-bottom: 1rem;
  $alert-border-radius: $border-radius;
  $alert-link-font-weight: $font-weight-bold;
  $alert-border-width: $border-width;
  $alert-bg-scale: -80%;
  $alert-border-scale: -70%;
  $alert-color-scale: 40%;
  $alert-dismissible-padding-r: $alert-padding-x * 3; // 3x covers width of x plus default padding on either side

  // Pagination

  $pagination-padding-y: 0.375rem;
  $pagination-padding-x: 0.75rem;
  $pagination-padding-y-sm: 0.25rem;
  $pagination-padding-x-sm: 0.5rem;
  $pagination-padding-y-lg: 0.75rem;
  $pagination-padding-x-lg: 1.5rem;

  $pagination-color: $link-color;
  $pagination-bg: $white;
  $pagination-border-width: $border-width;
  $pagination-border-radius: $border-radius;
  $pagination-margin-start: -$pagination-border-width;
  $pagination-border-color: $gray-300;

  $pagination-focus-color: $link-hover-color;
  $pagination-focus-bg: $gray-200;
  $pagination-focus-box-shadow: $input-btn-focus-box-shadow;
  $pagination-focus-outline: 0;

  $pagination-hover-color: $link-hover-color;
  $pagination-hover-bg: $gray-200;
  $pagination-hover-border-color: $gray-300;

  $pagination-active-color: $component-active-color;
  $pagination-active-bg: $component-active-bg;
  $pagination-active-border-color: $pagination-active-bg;

  $pagination-disabled-color: $gray-600;
  $pagination-disabled-bg: $white;
  $pagination-disabled-border-color: $gray-300;

  $pagination-transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  $pagination-border-radius-sm: $border-radius-sm;
  $pagination-border-radius-lg: $border-radius-lg;

  // Progress bars

  $progress-height: 1rem;
  $progress-font-size: $font-size-base * 0.75;
  $progress-bg: $gray-200;
  $progress-border-radius: $border-radius;
  $progress-box-shadow: $box-shadow-inset;
  $progress-bar-color: $white;
  $progress-bar-bg: $primary;
  $progress-bar-animation-timing: 1s linear infinite;
  $progress-bar-transition: width 0.6s ease;

  // List group

  $list-group-color: $gray-900;
  $list-group-bg: $white;
  $list-group-border-color: rgba($black, 0.125);
  $list-group-border-width: $border-width;
  $list-group-border-radius: $border-radius;

  $list-group-item-padding-y: $spacer * 0.5;
  $list-group-item-padding-x: $spacer;
  $list-group-item-bg-scale: -80%;
  $list-group-item-color-scale: 40%;

  $list-group-hover-bg: $gray-100;
  $list-group-active-color: $component-active-color;
  $list-group-active-bg: $component-active-bg;
  $list-group-active-border-color: $list-group-active-bg;

  $list-group-disabled-color: $gray-600;
  $list-group-disabled-bg: $list-group-bg;

  $list-group-action-color: $gray-700;
  $list-group-action-hover-color: $list-group-action-color;

  $list-group-action-active-color: $body-color;
  $list-group-action-active-bg: $gray-200;

  // ...

  // Spinners

  $spinner-width: 2rem;
  $spinner-height: $spinner-width;
  $spinner-vertical-align: $font-size-base * -0.125; // -.125em;
  $spinner-border-width: $font-size-base * 0.25; // .25em;
  $spinner-animation-speed: 0.75s;

  $spinner-width-sm: 1rem;
  $spinner-height-sm: $spinner-width-sm;
  $spinner-border-width-sm: $font-size-base * 0.2; // .2em;

  // Close

  $btn-close-width: $font-size-base * 1; // 1em;
  $btn-close-height: $btn-close-width;
  $btn-close-padding-x: $font-size-base * 0.25; // .25em;
  $btn-close-padding-y: $btn-close-padding-x;
  $btn-close-color: $black;
  $btn-close-bg: ${url(
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#{$btn-close-color}'><path d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/></svg>",
  )};
  $btn-close-focus-shadow: $input-btn-focus-box-shadow;
  $btn-close-opacity: 0.5;
  $btn-close-hover-opacity: 0.75;
  $btn-close-focus-opacity: 1;
  $btn-close-disabled-opacity: 0.25;
  // $btn-close-white-filter: invert(1) grayscale(100%) brightness(200%);

  // Offcanvas

  $offcanvas-padding-y: $modal-inner-padding;
  $offcanvas-padding-x: $modal-inner-padding;
  $offcanvas-horizontal-width: 400px;
  $offcanvas-vertical-height: 200px; // 30vh;
  $offcanvas-transition-duration: 0.3s;
  $offcanvas-border-color: $modal-content-border-color;
  $offcanvas-border-width: $modal-content-border-width;
  $offcanvas-title-line-height: $modal-title-line-height;
  $offcanvas-bg-color: $modal-content-bg;
  $offcanvas-color: $modal-content-color;
  $offcanvas-box-shadow: $modal-content-box-shadow-xs;
  $offcanvas-backdrop-bg: $modal-backdrop-bg;
  $offcanvas-backdrop-opacity: $modal-backdrop-opacity;

  // Code

  $code-font-size: $small-font-size;
  $code-color: $pink;

  $kbd-padding-y: 0.2rem;
  $kbd-padding-x: 0.4rem;
  $kbd-font-size: $code-font-size;
  $kbd-color: $white;
  $kbd-bg: $gray-900;

  $pre-color: null;
`;

export default variables;
