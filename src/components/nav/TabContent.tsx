import React from 'react';
import View from '../View';

export type TabContentProps = {
  children: React.ReactNode;
};

const TabContent = React.forwardRef<ViewRef, TabContentProps>((props, ref) => {
  const { ...elementProps } = props;

  return <View {...elementProps} ref={ref} />;
});

TabContent.displayName = 'TabContent';

export default TabContent;
