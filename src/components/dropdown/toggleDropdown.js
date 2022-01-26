import { BOOTSTYLE_ACTION } from '../../symbols';
import { concatFns } from '../../utils';
import DropdownContext from './DropdownContext';

const toggleDropdown = {
  $$typeof: BOOTSTYLE_ACTION,
  handle: (props, context) => {
    const { onPress: handlePress, ...restProps } = props;

    return {
      ...restProps,
      nativeID: context.identifier,
      ref: context.triggerRef,
      onPress: concatFns(() => {
        context.setVisible((value) => !value);
      }, handlePress),
      accessibilityHasPopup: true,
      accessibilityExpanded: context.visible,
    };
  },
  context: DropdownContext,
};

export default toggleDropdown;
