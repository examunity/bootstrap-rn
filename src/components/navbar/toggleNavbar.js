import { BOOTSTYLE_ACTION } from '../../symbols';
import NavbarContext from './NavbarContext';

const toggleNavbar = {
  $$typeof: BOOTSTYLE_ACTION,
  handle: (props, context) => ({
    nativeID: context.identifier,
    onPress: () => {
      context.setExpanded((value) => !value);
    },
    accessibilitControls: context.identifier,
    accessibilityExpanded: context.expanded,
    accessibilityLabel: 'Toggle navigation',
  }),
  context: NavbarContext,
};

export default toggleNavbar;
