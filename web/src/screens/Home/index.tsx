import React from 'react';
import PageLayout from 'layouts/PageLayout';
import Tabs from 'components/Tabs';
import Modal from 'components/Modals';

export default function Home() {
  const [openForm, setOpenForm] = React.useState(false);
  const [type, setType] = React.useState('');

  const handleOpenOfferForm = () => {
    setType('offer');
    setOpenForm(true);
  };

  const handleOpenRequestForm = () => {
    setType('request');
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <PageLayout>
      <Tabs />
      <Modal
        open={openForm}
        type={type}
        method="add"
        handleClose={handleCloseForm}
      />
      <button onClick={() => handleOpenRequestForm()}> Add Requests</button>
      <br />
      <button onClick={() => handleOpenOfferForm()}> Add Offers</button>
    </PageLayout>
  );
}
