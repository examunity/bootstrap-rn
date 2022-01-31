import TabContext from './TabContext';
import TabProvider from './TabProvider';
import TabContent from './TabContent';
import TabPane from './TabPane';
import useToggleTab from './useToggleTab';

const Tab = {};

Tab.Context = TabContext;
Tab.Provider = TabProvider;
Tab.Content = TabContent;
Tab.Pane = TabPane;
Tab.useToggle = useToggleTab;

export default Tab;
