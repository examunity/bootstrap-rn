import { BOOTSTYLE_ACTION } from '../../symbols';
import DropdownContext from './DropdownContext';

const toggle = {
  $$typeof: BOOTSTYLE_ACTION,
  handle: (props, context) => ({
    nativeID: context.identifier,
    ref: context.triggerRef,
    onPress: () => {
      context.setVisible((value) => !value);
    },
    accessibilityHasPopup: true,
    accessibilityExpanded: context.visible,
  }),
  context: DropdownContext,
};

export default toggle;
