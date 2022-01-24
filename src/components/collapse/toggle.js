import { BOOTSTYLE_ACTION } from '../../symbols';
import CollapseContext from './CollapseContext';

const toggle = {
  $$typeof: BOOTSTYLE_ACTION,
  handle: (props, context) => ({
    onPress: () => {
      context.setVisible((value) => !value);
    },
    accessibilityExpanded: context.visible,
    accessibilityControls: context.identifier,
  }),
  context: CollapseContext,
};

export default toggle;
