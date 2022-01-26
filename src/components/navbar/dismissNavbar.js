import { BOOTSTYLE_ACTION } from '../../symbols';
import { concatFns } from '../../utils';
import NavbarContext from './NavbarContext';

const dismissNavbar = {
  $$typeof: BOOTSTYLE_ACTION,
  handle: (props, context) => {
    const { onPress: handlePress, ...restProps } = props;

    return {
      ...restProps,
      onPress: concatFns(() => {
        context.setExpanded(false);
      }, handlePress),
      accessibilityLabel: 'Close',
    };
  },
  context: NavbarContext,
};

export default dismissNavbar;
