import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Offers from 'screens/Offers';

/**
 * @todo: make this generic and reusable
 */
export default function TabsContainer() {
  return (
    <Tabs>
      <TabList>
        <Tab>Requests</Tab>
        <Tab>Help Offer</Tab>
      </TabList>

      <TabPanel>
        <p>Requests - List</p>
      </TabPanel>
      <TabPanel>
        <Offers/>
        <p>Help Offer - List</p>
      </TabPanel>
    </Tabs>
  );
}
