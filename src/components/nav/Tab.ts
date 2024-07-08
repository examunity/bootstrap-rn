import TabContext from './TabContext';
import TabProvider from './TabProvider';
import TabContent from './TabContent';
import TabPane from './TabPane';
import useToggleTab from './useToggleTab';

const Tab = {};

export default Object.assign(Tab, {
  Context: TabContext,
  Provider: TabProvider,
  Content: TabContent,
  Pane: TabPane,
  useToggle: useToggleTab,
});
