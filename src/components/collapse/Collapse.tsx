import React from 'react';
import View from '../View';
import useForcedContext from '../../hooks/useForcedContext';
import CollapseContext from './CollapseContext';
import CollapseProvider from './CollapseProvider';
import useToggleCollapse from './useToggleCollapse';

export type CollapseProps = {
  children: React.ReactNode;
};

const Collapse = React.forwardRef<ViewRef, CollapseProps>((props, ref) => {
  const { children, ...elementProps } = props;

  const { identifier, visible } = useForcedContext(CollapseContext);

  if (!visible) {
    return null;
  }

  return (
    <View {...elementProps} ref={ref} id={identifier}>
      {children}
    </View>
  );
});

Collapse.displayName = 'Collapse';

export default Object.assign(Collapse, {
  Provider: CollapseProvider,
  useToggle: useToggleCollapse,
});
