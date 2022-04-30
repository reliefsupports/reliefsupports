import React from 'react';
import PageLayout from 'layouts/PageLayout';
import Tabs from 'components/Tabs';
import Modal from 'components/FormModal';
import Button from '@mui/material/Button';

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
      <Button variant="outlined" onClick={() => handleOpenRequestForm()}>
        Add Requests
      </Button>
      <br />
      <Button variant="outlined" onClick={() => handleOpenOfferForm()}>
        Add Offers
      </Button>
    </PageLayout>
  );
}
