export const REM = 16;

// Color system
// TODO: Add all color variables from bootstrap
const grays = {
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',
  get grays() {
    return {
      gray100: this.gray100,
      gray200: this.gray200,
      gray300: this.gray300,
      gray400: this.gray400,
      gray500: this.gray500,
      gray600: this.gray600,
      gray700: this.gray700,
      gray800: this.gray800,
      gray900: this.gray900,
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
// TODO: Add all spacing variables from bootstrap
const spacing = {
  spacer: 1 * REM,
};

// Components
// TODO: Add all components variables from bootstrap
const components = {
  borderWidth: 1,
  borderRadius: 0.25 * REM,
};

// Typography
// TODO: Add all typography variables from bootstrap
const typography = {
  fontWeightBold: 700,
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

// Badge
// scss-docs-start badge-variables
const badges = {
  badgePaddingY: 0.35 * REM,
  badgePaddingX: 0.65 * REM,
  badgeFontSize: 0.75 * REM,
  badgeBorderRadius: 0.25 * REM,
};
// scss-docs-end badge-variables

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
  ...components,
  ...typography,
  ...alerts,
  ...badges,
  ...buttons,
};

export default variables;
