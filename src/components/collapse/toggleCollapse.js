import { BOOTSTYLE_ACTION } from '../../symbols';
import { concatFns } from '../../utils';
import CollapseContext from './CollapseContext';

const toggleCollapse = {
  $$typeof: BOOTSTYLE_ACTION,
  handle: (props, context) => {
    const { onPress: handlePress, ...restProps } = props;

    return {
      ...restProps,
      onPress: concatFns(() => {
        context.setVisible((value) => !value);
      }, handlePress),
      accessibilityExpanded: context.visible,
      accessibilityControls: context.identifier,
    };
  },
  context: CollapseContext,
};

export default toggleCollapse;
