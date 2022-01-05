import { Platform } from 'react-native';
import css from '../style/css';
import { shiftColor, subtract } from './functions';

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
  $spacers: ${(t) => ({
    0: 0,
    1: t.spacer * 0.25,
    2: t.spacer * 0.5,
    3: t.spacer,
    4: t.spacer * 1.5,
    5: t.spacer * 3,
  })};

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
  $link-shade-percentage: 0.2;
  $link-hover-color: ${(t) =>
    shiftColor(t['link-shade-percentage'], t['link-color'])};
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

  $line-height-base: 1.5;
  $line-height-sm: 1.25;
  $line-height-lg: 2;

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

  $small-font-size: 0.875rem; // 0.875em;

  $sub-sup-font-size: 0.75rem; // 0.75em;

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

  $mark-padding: 0.2rem; // 0.2em;

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

  $btn-hover-bg-shade-amount: 0.15;
  $btn-hover-bg-tint-amount: 0.15;
  $btn-hover-border-shade-amount: 0.2;
  $btn-hover-border-tint-amount: 0.1;
  $btn-active-bg-shade-amount: 0.2;
  $btn-active-bg-tint-amount: 0.2;
  $btn-active-border-shade-amount: 0.25;
  $btn-active-border-tint-amount: 0.1;

  // Forms

  $form-text-margin-top: 0.25rem;
  $form-text-font-size: $small-font-size;
  $form-text-font-style: null;
  $form-text-font-weight: null;
  $form-text-color: $text-muted;

  $form-label-margin-bottom: 0.5rem;
  $form-label-font-size: null;
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
  $input-focus-border-color: tint-color($component-active-bg, 50%);
  $input-focus-color: $input-color;
  $input-focus-width: $input-btn-focus-width;
  $input-focus-box-shadow: $input-btn-focus-box-shadow;

  $input-placeholder-color: $gray-600;
  $input-plaintext-color: $body-color;

  $input-height-border: $input-border-width * 2;

  $input-height-inner: add($input-line-height * 1em, $input-padding-y * 2);
  $input-height-inner-half: add($input-line-height * 0.5em, $input-padding-y);
  $input-height-inner-quarter: add(
    $input-line-height * 0.25em,
    $input-padding-y * 0.5
  );

  $input-height: add(
    $input-line-height * 1em,
    add($input-padding-y * 2, $input-height-border, false)
  );
  $input-height-sm: add(
    $input-line-height * 1em,
    add($input-padding-y-sm * 2, $input-height-border, false)
  );
  $input-height-lg: add(
    $input-line-height * 1em,
    add($input-padding-y-lg * 2, $input-height-border, false)
  );

  $input-transition: border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  $form-color-width: 3rem;

  $form-check-input-width: 1em;
  $form-check-min-height: $font-size-base * $line-height-base;
  $form-check-padding-start: $form-check-input-width + 0.5em;
  $form-check-margin-bottom: 0.125rem;
  $form-check-label-color: null;
  $form-check-label-cursor: null;
  $form-check-transition: null;

  $form-check-input-active-filter: brightness(90%);

  $form-check-input-bg: $input-bg;
  $form-check-input-border: 1px solid rgba($black, 0.25);
  $form-check-input-border-radius: 0.25em;
  $form-check-radio-border-radius: 50%;
  $form-check-input-focus-border: $input-focus-border-color;
  $form-check-input-focus-box-shadow: $input-btn-focus-box-shadow;

  $form-check-input-checked-color: $component-active-color;
  $form-check-input-checked-bg-color: $component-active-bg;
  $form-check-input-checked-border-color: $form-check-input-checked-bg-color;
  // $form-check-input-checked-bg-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#{$form-check-input-checked-color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/></svg>");
  // $form-check-radio-checked-bg-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='2' fill='#{$form-check-input-checked-color}'/></svg>");

  $form-check-input-indeterminate-color: $component-active-color;
  $form-check-input-indeterminate-bg-color: $component-active-bg;
  $form-check-input-indeterminate-border-color: $form-check-input-indeterminate-bg-color;
  // $form-check-input-indeterminate-bg-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#{$form-check-input-indeterminate-color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/></svg>");

  $form-check-input-disabled-opacity: 0.5;
  $form-check-label-disabled-opacity: $form-check-input-disabled-opacity;
  $form-check-btn-check-disabled-opacity: $btn-disabled-opacity;

  $form-check-inline-margin-end: 1rem;

  $form-switch-color: rgba($black, 0.25);
  $form-switch-width: 2em;
  $form-switch-padding-start: $form-switch-width + 0.5em;
  // $form-switch-bg-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#{$form-switch-color}'/></svg>");
  $form-switch-border-radius: $form-switch-width;
  $form-switch-transition: background-position 0.15s ease-in-out;

  $form-switch-focus-color: $input-focus-border-color;
  // $form-switch-focus-bg-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#{$form-switch-focus-color}'/></svg>");

  $form-switch-checked-color: $component-active-color;
  // $form-switch-checked-bg-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#{$form-switch-checked-color}'/></svg>");
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
  // $form-select-indicator: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='#{$form-select-indicator-color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/></svg>");

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
  $form-range-thumb-focus-box-shadow: 0 0 0 1px $body-bg,
    $input-focus-box-shadow;
  $form-range-thumb-focus-box-shadow-width: $input-focus-width; // For focus box shadow issue in Edge
  $form-range-thumb-active-bg: tint-color($component-active-bg, 70%);
  $form-range-thumb-disabled-bg: $gray-500;
  $form-range-thumb-transition: background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  $form-file-button-color: $input-color;
  $form-file-button-bg: $input-group-addon-bg;
  $form-file-button-hover-bg: shade-color($form-file-button-bg, 5%);

  $form-floating-height: add(3.5rem, $input-height-border);
  $form-floating-line-height: 1.25;
  $form-floating-padding-x: $input-padding-x;
  $form-floating-padding-y: 1rem;
  $form-floating-input-padding-t: 1.625rem;
  $form-floating-input-padding-b: 0.625rem;
  $form-floating-label-opacity: 0.65;
  $form-floating-label-transform: scale(0.85) translateY(-0.5rem)
    translateX(0.15rem);
  $form-floating-transition: opacity 0.1s ease-in-out,
    transform 0.1s ease-in-out;

  // Form validation

  $form-feedback-margin-top: $form-text-margin-top;
  $form-feedback-font-size: $form-text-font-size;
  $form-feedback-font-style: $form-text-font-style;
  $form-feedback-valid-color: $success;
  $form-feedback-invalid-color: $danger;

  $form-feedback-icon-valid-color: $form-feedback-valid-color;
  // $form-feedback-icon-valid: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#{$form-feedback-icon-valid-color}' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/></svg>");
  $form-feedback-icon-invalid-color: $form-feedback-invalid-color;
  // $form-feedback-icon-invalid: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='#{$form-feedback-icon-invalid-color}'><circle cx='6' cy='6' r='4.5'/><path stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/><circle cx='6' cy='8.2' r='.6' fill='#{$form-feedback-icon-invalid-color}' stroke='none'/></svg>");

  /* $form-validation-states: (
  "valid": (
    "color": $form-feedback-valid-color,
    "icon": $form-feedback-icon-valid
  ),
  "invalid": (
    "color": $form-feedback-invalid-color,
    "icon": $form-feedback-icon-invalid
  )
); */

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
  $alert-bg-scale: -0.8;
  $alert-border-scale: -0.7;
  $alert-color-scale: 0.4;
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

  // List group

  $list-group-color: $gray-900;
  $list-group-bg: $white;
  $list-group-border-color: rgba($black, 0.125);
  $list-group-border-width: $border-width;
  $list-group-border-radius: $border-radius;

  $list-group-item-padding-y: $spacer * 0.5;
  $list-group-item-padding-x: $spacer;
  $list-group-item-bg-scale: -0.8;
  $list-group-item-color-scale: 0.4;

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
`;

export default variables;
