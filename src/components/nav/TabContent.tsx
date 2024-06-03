import React from 'react';
import type { View as BaseView } from 'react-native';
import View from '../View';

export type TabContentProps = {
  children: React.ReactNode;
};

const TabContent = React.forwardRef<BaseView, TabContentProps>((props, ref) => {
  const { ...elementProps } = props;

  return <View {...elementProps} ref={ref} />;
});

TabContent.displayName = 'TabContent';

export default TabContent;
