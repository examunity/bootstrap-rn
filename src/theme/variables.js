import { rgba } from 'polished';

export const REM = 16;
export const EM = (scale) => REM * scale;

// Color system

// TODO: Add all color variables from bootstrap
const grays = {
  white: '#fff',
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',
  black: '#000',
  get grays() {
    return {
      100: this.gray100,
      200: this.gray200,
      300: this.gray300,
      400: this.gray400,
      500: this.gray500,
      600: this.gray600,
      700: this.gray700,
      800: this.gray800,
      900: this.gray900,
    };
  },
};

const colors = {
  blue: '#0d6efd',
  green: '#198754',
  cyan: '#0dcaf0',
  yellow: '#ffc107',
  red: '#dc3545',
  get colors() {
    return {
      blue: this.blue,
      green: this.green,
      cyan: this.cyan,
      yellow: this.yellow,
      red: this.red,
    };
  },
};

const themeColors = {
  primary: colors.blue,
  secondary: grays.gray600,
  success: colors.green,
  info: colors.cyan,
  warning: colors.yellow,
  danger: colors.red,
  light: grays.gray100,
  dark: grays.gray900,
  get themeColors() {
    return {
      primary: this.primary,
      secondary: this.secondary,
      success: this.success,
      info: this.info,
      warning: this.warning,
      danger: this.danger,
      light: this.light,
      dark: this.dark,
    };
  },
};

// Spacing

const spacing = {
  spacer: 1 * REM,
  get spacers() {
    return {
      0: 0,
      1: this.spacer * 0.25,
      2: this.spacer * 0.5,
      3: this.spacer,
      4: this.spacer * 1.5,
      5: this.spacer * 3,
    };
  },
};

// Body
//
// Settings for the `<body>` element.

const body = {
  bodyBg: grays.white,
  bodyColor: grays.gray900,
  bodyTextAlign: null,
};

// Components

// TODO: Add all components variables from bootstrap
const components = {
  borderWidth: 1,
  borderWidths: {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  },
  borderColor: grays.gray300,
  borderRadius: 0.25 * REM,
  borderRadiusSm: 0.2 * REM,
  borderRadiusLg: 0.3 * REM,
  borderRadiusPill: 50 * REM,
};

// Typography

// TODO: Add all typography variables from bootstrap
const typography = {
  fontFamilySansSerif:
    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  fontFamilyMonospace:
    'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  get fontFamilyBase() {
    return this.fontFamilySansSerif;
  },
  get fontFamilyCode() {
    return this.fontFamilyMonospace;
  },
  // $font-size-root affects the value of `rem`, which is used for as well font sizes, paddings, and margins
  // $font-size-base affects the font size of the body text
  fontSizeRoot: null,
  fontSizeBase: 1 * REM,
  get fontSizeSm() {
    return this.fontSizeBase * 0.875;
  },
  get fontSizeLg() {
    return this.fontSizeBase * 1.25;
  },
  fontWeightLighter: 200, // 'lighter' not supported by react-native
  fontWeightLight: 300,
  fontWeightNormal: 400,
  fontWeightBold: 700,
  fontWeightBolder: 800, // 'bolder' not supported by react-native
  get fontWeightBase() {
    return this.fontWeightNormal;
  },
  lineHeightBase: 1.5 * REM,
  lineHeightSm: 1.25 * REM,
  lineHeightLg: 2 * REM,
};

// Alerts

const alerts = {
  alertPaddingY: spacing.spacer,
  alertPaddingX: spacing.spacer,
  alertMarginBottom: 1 * REM,
  alertBorderRadius: components.borderRadius,
  alertLinkFontWeight: typography.fontWeightBold,
  alertBorderWidth: components.borderWidth,
  alertBgScale: -0.8,
  alertBorderScale: -0.7,
  alertColorScale: 0.4,
  get alertDismissiblePaddingR() {
    return this.alertPaddingX * 3; // 3x covers width of x plus default padding on either side
  },
};

// Progress bars

/* 
$progress-box-shadow:               $box-shadow-inset !default;
$progress-bar-animation-timing:     1s linear infinite !default;
$progress-bar-transition:           width .6s ease !default;
 */
const progress = {
  progressHeight: 1 * REM,
  progressFontSize: typography.fontSizeBase * 0.75,
  progressBg: grays.gray200,
  progressBorderRadius: components.borderRadius,
  progressBarColor: grays.white,
  progressBarBg: themeColors.primary,
};

// Badge

const badges = {
  badgeFontSize: 0.75 * EM(1),
  badgeFontWeight: typography.fontWeightBold,
  badgeColor: grays.white,
  badgePaddingY: 0.35 * EM(0.75),
  badgePaddingX: 0.65 * EM(0.75),
  badgeBorderRadius: 0.25 * REM,
};

// Cards

const cards = {
  cardSpacerX: spacing.spacer,
  cardSpacerY: spacing.spacer,
  cardTitleSpacerY: spacing.spacer * 0.5,
  cardBorderWidth: components.borderWidth,
  cardBorderColor: rgba(grays.black, 0.125),
  cardBorderRadius: components.borderRadius,
  get cardInnerBorderRadius() {
    return this.cardBorderRadius; // TODO: subtract($card-border-radius, $card-border-width);
  },
  cardCapPaddingY: spacing.spacer * 0.5,
  cardCapPaddingX: spacing.spacer,
  cardCapBg: rgba(grays.black, 0.03),
  cardCapColor: null,
  cardHeight: null,
  cardColor: null,
  cardBg: grays.white,
};

// Buttons + Forms
// Shared variables that are reassigned to `$input-` and `$btn-` specific variables.

const buttons = {
  btnPaddingY: 0.375 * REM,
  btnPaddingX: 0.75 * REM,
  btnFontSize: 1 * REM,
  btnBorderWidth: 1,
  btnBorderRadius: 0.25 * REM,
};

//-------------------------------------------------------------------------------------------------
const variables = {
  ...grays,
  ...colors,
  ...themeColors,
  ...spacing,
  ...body,
  ...components,
  ...typography,
  ...alerts,
  ...badges,
  ...buttons,
  ...cards,
  ...progress,
};

export default variables;
