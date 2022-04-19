import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function TabsContainer() {
  return (
    <Tabs>
      <TabList>
        <Tab>Requests</Tab>
        <Tab>Help Offer</Tab>
      </TabList>

      <TabPanel>
        <h2>Requests - List</h2>
      </TabPanel>
      <TabPanel>
        <h2>Help Offer - List</h2>
      </TabPanel>
    </Tabs>
  );
}
