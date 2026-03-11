import React from 'react';
import View, { ViewProps, ViewRef } from '../View';

export interface TabContentProps extends ViewProps {}

function TabContent(props: TabContentProps & React.RefAttributes<ViewRef>) {
  const { ref, ...elementProps } = props;

  return <View {...elementProps} ref={ref} />;
}

export default TabContent;
