import { BOOTSTYLE_ACTION } from '../../symbols';
import { concatFns } from '../../utils';
import NavbarContext from './NavbarContext';

const toggleNavbar = {
  $$typeof: BOOTSTYLE_ACTION,
  handle: (props, context) => {
    const { onPress: handlePress, ...restProps } = props;

    return {
      ...restProps,
      nativeID: context.identifier,
      onPress: concatFns(() => {
        context.setExpanded((value) => !value);
        if (handlePress) handlePress();
      }, handlePress),
      accessibilitControls: context.identifier,
      accessibilityExpanded: context.expanded,
      accessibilityLabel: 'Toggle navigation',
    };
  },
  context: NavbarContext,
};

export default toggleNavbar;
