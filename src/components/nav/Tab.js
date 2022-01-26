import TabContext from './TabContext';
import TabProvider from './TabProvider';
import TabContent from './TabContent';
import TabPane from './TabPane';
import toggleTab from './toggleTab';

const Tab = {};

Tab.Context = TabContext;
Tab.Provider = TabProvider;
Tab.Content = TabContent;
Tab.Pane = TabPane;
Tab.toggle = toggleTab;

export default Tab;
