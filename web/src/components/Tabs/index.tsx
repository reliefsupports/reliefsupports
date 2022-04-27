import Request from 'components/Requests';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
        <Request />
      </TabPanel>
      <TabPanel>
        <p>Help Offer - List</p>
      </TabPanel>
    </Tabs>
  );
}
