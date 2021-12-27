import { Platform } from 'react-native';
import css from '../style/css';
import { subtract } from './functions';

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

  // TODO: $grays map

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

  // TODO: $colors map

  $primary: $blue;
  $secondary: $gray-600;
  $success: $green;
  $info: $cyan;
  $warning: $yellow;
  $danger: $red;
  $light: $gray-100;
  $dark: $gray-900;

  // TODO: $theme-colors map

  // The contrast ratio to reach against white, to determine if color changes from "light" to "dark". Acceptable values for WCAG 2.0 are 3, 4.5 and 7.
  // See https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast
  $min-contrast-ratio: 4.5;

  // Customize the light and dark text colors for use in our color contrast function.
  $color-contrast-dark: $black;
  $color-contrast-light: $white;

  $blue-100: tint-color($blue, 80%);
  $blue-200: tint-color($blue, 60%);
  $blue-300: tint-color($blue, 40%);
  $blue-400: tint-color($blue, 20%);
  $blue-500: $blue;
  $blue-600: shade-color($blue, 20%);
  $blue-700: shade-color($blue, 40%);
  $blue-800: shade-color($blue, 60%);
  $blue-900: shade-color($blue, 80%);

  $indigo-100: tint-color($indigo, 80%);
  $indigo-200: tint-color($indigo, 60%);
  $indigo-300: tint-color($indigo, 40%);
  $indigo-400: tint-color($indigo, 20%);
  $indigo-500: $indigo;
  $indigo-600: shade-color($indigo, 20%);
  $indigo-700: shade-color($indigo, 40%);
  $indigo-800: shade-color($indigo, 60%);
  $indigo-900: shade-color($indigo, 80%);

  $purple-100: tint-color($purple, 80%);
  $purple-200: tint-color($purple, 60%);
  $purple-300: tint-color($purple, 40%);
  $purple-400: tint-color($purple, 20%);
  $purple-500: $purple;
  $purple-600: shade-color($purple, 20%);
  $purple-700: shade-color($purple, 40%);
  $purple-800: shade-color($purple, 60%);
  $purple-900: shade-color($purple, 80%);

  $pink-100: tint-color($pink, 80%);
  $pink-200: tint-color($pink, 60%);
  $pink-300: tint-color($pink, 40%);
  $pink-400: tint-color($pink, 20%);
  $pink-500: $pink;
  $pink-600: shade-color($pink, 20%);
  $pink-700: shade-color($pink, 40%);
  $pink-800: shade-color($pink, 60%);
  $pink-900: shade-color($pink, 80%);

  $red-100: tint-color($red, 80%);
  $red-200: tint-color($red, 60%);
  $red-300: tint-color($red, 40%);
  $red-400: tint-color($red, 20%);
  $red-500: $red;
  $red-600: shade-color($red, 20%);
  $red-700: shade-color($red, 40%);
  $red-800: shade-color($red, 60%);
  $red-900: shade-color($red, 80%);

  $orange-100: tint-color($orange, 80%);
  $orange-200: tint-color($orange, 60%);
  $orange-300: tint-color($orange, 40%);
  $orange-400: tint-color($orange, 20%);
  $orange-500: $orange;
  $orange-600: shade-color($orange, 20%);
  $orange-700: shade-color($orange, 40%);
  $orange-800: shade-color($orange, 60%);
  $orange-900: shade-color($orange, 80%);

  $yellow-100: tint-color($yellow, 80%);
  $yellow-200: tint-color($yellow, 60%);
  $yellow-300: tint-color($yellow, 40%);
  $yellow-400: tint-color($yellow, 20%);
  $yellow-500: $yellow;
  $yellow-600: shade-color($yellow, 20%);
  $yellow-700: shade-color($yellow, 40%);
  $yellow-800: shade-color($yellow, 60%);
  $yellow-900: shade-color($yellow, 80%);

  $green-100: tint-color($green, 80%);
  $green-200: tint-color($green, 60%);
  $green-300: tint-color($green, 40%);
  $green-400: tint-color($green, 20%);
  $green-500: $green;
  $green-600: shade-color($green, 20%);
  $green-700: shade-color($green, 40%);
  $green-800: shade-color($green, 60%);
  $green-900: shade-color($green, 80%);

  $teal-100: tint-color($teal, 80%);
  $teal-200: tint-color($teal, 60%);
  $teal-300: tint-color($teal, 40%);
  $teal-400: tint-color($teal, 20%);
  $teal-500: $teal;
  $teal-600: shade-color($teal, 20%);
  $teal-700: shade-color($teal, 40%);
  $teal-800: shade-color($teal, 60%);
  $teal-900: shade-color($teal, 80%);

  $cyan-100: tint-color($cyan, 80%);
  $cyan-200: tint-color($cyan, 60%);
  $cyan-300: tint-color($cyan, 40%);
  $cyan-400: tint-color($cyan, 20%);
  $cyan-500: $cyan;
  $cyan-600: shade-color($cyan, 20%);
  $cyan-700: shade-color($cyan, 40%);
  $cyan-800: shade-color($cyan, 60%);
  $cyan-900: shade-color($cyan, 80%);

  // TODO: $blues map

  // TODO: $indigos map

  // TODO: $purples map

  // TODO: $pinks map

  // TODO: $reds map

  // TODO: $oranges map

  // TODO: $yellows map

  // TODO: $greens map

  // TODO: $teals map

  // TODO: $cyans map

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
  // $spacers map

  // Position
  //
  // Define the edge positioning anchors of the position utilities.

  // $position-values map

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
  $link-hover-color: shift-color($link-color, $link-shade-percentage);
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

  // TODO: $grid-breakpoints map

  // Grid containers
  //
  // Define the maximum width of ".container" for different screen sizes.

  // TODO: $container-max-widths map

  // Grid columns
  //
  // Set the number of columns and specify the width of the gutters.

  $grid-columns: 12;
  $grid-gutter-width: 1.5rem;
  $grid-row-columns: 6;

  // Container padding

  $container-padding-x: $grid-gutter-width * 0.5;

  // Components
  //
  // Define common padding and border radius sizes and more.

  $border-width: 1px;
  // TODO: $border-widths map

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

  $caret-width: 0.3em;
  $caret-vertical-align: $caret-width * 0.85;
  $caret-spacing: $caret-width * 0.85;

  $transition-base: all 0.2s ease-in-out;
  $transition-fade: opacity 0.15s linear;
  $transition-collapse: height 0.35s ease;
  $transition-collapse-width: width 0.35s ease;

  // TODO: $aspect-ratios map

  // Typography
  //
  // Font, line-height, and color for body text, headings, and more.

  $font-family-sans-serif: ${() => {
    if (Platform.OS !== 'web') {
      return 'System';
    }

    return 'system-ui'; // "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";
  }};
  $font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  $font-family-base: $font-family-sans-serif;
  $font-family-code: $font-family-monospace;

  // $font-size-root affects the value of "rem", which is used for as well font sizes, paddings, and margins
  // $font-size-base affects the font size of the body text
  $font-size-root: null;
  $font-size-base: 1rem; // Assumes the browser default, typically "16px"
  $font-size-sm: $font-size-base * 0.875;
  $font-size-lg: $font-size-base * 1.25;

  $font-weight-lighter: lighter;
  $font-weight-light: 300;
  $font-weight-normal: 400;
  $font-weight-bold: 700;
  $font-weight-bolder: bolder;

  $font-weight-base: $font-weight-normal;

  $line-height-base: 1.5rem; // 1.5;
  $line-height-sm: 1.25rem; // 1.25;
  $line-height-lg: 2rem; // 2;

  $h1-font-size: $font-size-base * 2.5;
  $h2-font-size: $font-size-base * 2;
  $h3-font-size: $font-size-base * 1.75;
  $h4-font-size: $font-size-base * 1.5;
  $h5-font-size: $font-size-base * 1.25;
  $h6-font-size: $font-size-base;

  // TODO: $font-sizes map

  $headings-margin-bottom: $spacer * 0.5;
  $headings-font-family: null;
  $headings-font-style: null;
  $headings-font-weight: 500;
  $headings-line-height: 1.2;
  $headings-color: null;

  // TODO: $display-font-sizes map

  $display-font-weight: 300;
  $display-line-height: $headings-line-height;

  $lead-font-size: $font-size-base * 1.25;
  $lead-font-weight: 300;

  $small-font-size: 0.875em;

  $sub-sup-font-size: 0.75em;

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

  $mark-padding: 0.2em;

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
  $btn-box-shadow: inset 0 1px 0 rgba($white, 0.15),
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

  $btn-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  $btn-hover-bg-shade-amount: 15%;
  $btn-hover-bg-tint-amount: 15%;
  $btn-hover-border-shade-amount: 20%;
  $btn-hover-border-tint-amount: 10%;
  $btn-active-bg-shade-amount: 20%;
  $btn-active-bg-tint-amount: 20%;
  $btn-active-border-shade-amount: 25%;
  $btn-active-border-tint-amount: 10%;

  // ...

  // Cards

  $card-spacer-y: $spacer;
  $card-spacer-x: $spacer;
  $card-title-spacer-y: $spacer * 0.5;
  $card-border-width: $border-width;
  $card-border-color: rgba($black, 0.125);
  $card-border-radius: $border-radius;
  $card-box-shadow: null;
  $card-inner-border-radius: ${(t) =>
    subtract(t['card-border-radius'], t['card-border-width'])};
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

  // Badges

  $badge-font-size: 0.75rem; // 0.75em;
  $badge-font-weight: $font-weight-bold;
  $badge-color: $white;
  $badge-padding-y: 0.75 * 0.35rem; // 0.35em;
  $badge-padding-x: 0.75 * 0.65rem; // 0.65em;
  $badge-border-radius: $border-radius;

  // Modals

  $modal-inner-padding: $spacer;

  $modal-footer-margin-between: 0.5rem;

  $modal-dialog-margin: 0.5rem;
  $modal-dialog-margin-y-sm-up: 1.75rem;

  $modal-title-line-height: $line-height-base;

  $modal-content-color: null;
  $modal-content-bg: $white;
  $modal-content-border-color: rgba($black, 0.2);
  $modal-content-border-width: $border-width;
  $modal-content-border-radius: $border-radius-lg;
  $modal-content-inner-border-radius: ${(t) =>
    subtract(
      t['modal-content-border-radius'],
      t['modal-content-border-width'],
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
`;

export default variables;
