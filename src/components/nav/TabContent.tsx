import React from 'react';
import View from '../View';

export interface TabContentProps extends ViewProps {}

const TabContent = React.forwardRef<ViewRef, TabContentProps>((props, ref) => {
  const { ...elementProps } = props;

  return <View {...elementProps} ref={ref} />;
});

TabContent.displayName = 'TabContent';

export default TabContent;
