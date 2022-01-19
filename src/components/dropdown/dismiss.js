import { BOOTSTYLE_ACTION } from '../../symbols';
import DropdownContext from './DropdownContext';

const toggle = {
  $$typeof: BOOTSTYLE_ACTION,
  handle: (props, context) => ({
    onPress: () => {
      context.setVisible(false);
    },
  }),
  context: DropdownContext,
};

export default toggle;
