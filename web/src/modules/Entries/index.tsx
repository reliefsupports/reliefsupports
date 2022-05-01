import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Offers from 'screens/Offers';
import Requests from './Requests';

export default function Entries() {
  return (
    <Tabs>
      <TabList>
        <Tab>Requests</Tab>
        <Tab>Help Offers</Tab>
      </TabList>
      <TabPanel>
        <Requests />
      </TabPanel>
      <TabPanel>
        <Offers />
      </TabPanel>
    </Tabs>
  );
}
