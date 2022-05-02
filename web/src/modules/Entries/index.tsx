import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Requests from './Requests';
import Offers from './Offers';

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
