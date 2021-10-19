export const REM = 16;

// Color system
// TODO: Add all color variables from bootstrap
const baseColors = {
  blue: '#0d6efd',
  gray600: '#6c757d',
};

const colors = {
  primary: baseColors.blue,
  secondary: baseColors.gray600,
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

const variables = {
  ...baseColors,
  ...colors,
  ...spacing,
  ...components,
  ...typography,
  ...alerts,
};

export default variables;
