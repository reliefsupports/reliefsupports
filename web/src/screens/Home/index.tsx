import PageLayout from 'layouts/PageLayout';
import Tabs from 'components/Tabs';
import React from 'react';
import { AddDataModal } from 'components/modals/addDataModal';

export default function Home() {
  
  const [openForm, setOpenForm] = React.useState(false);
  const [type, setType] = React.useState('');

  const handleOpenOfferForm = () => {
    setType("offer");
    setOpenForm(true)
  };

  const handleOpenRequestForm = () => {
    setType("request");
    setOpenForm(true)
  };
  const handleCloseForm = () => {
    setOpenForm(false)
  };

  return (
    <PageLayout>

      <Tabs />

      <AddDataModal open={openForm} type={type} method='add' handleClose={handleCloseForm} />

      <button onClick={() => handleOpenRequestForm()}> Add Resuests</button>
      <br/>
      <button onClick={() => handleOpenOfferForm()}> Add Offers</button>

    </PageLayout>
  );
}
