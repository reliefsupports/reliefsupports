import PageLayout from 'layouts/PageLayout';
import Tabs from 'components/Tabs';
import React from 'react';
import { AddOfferModal } from 'components/modals/addOfferModal';
import { AddRequestModal } from 'components/modals/addRequestModal';

export default function Home() {
  
  const [openOfferForm, setOpenOfferForm] = React.useState(false);
  const handleOpenOfferForm = () => setOpenOfferForm(true);
  const handleCloseOfferForm = () => setOpenOfferForm(false);

  const [openReqForm, setOpenReqForm] = React.useState(false);
  const handleOpenReqForm = () => setOpenReqForm(true);
  const handleCloseReqForm = () => setOpenReqForm(false);

  return (
    <PageLayout>

      <Tabs />

      <AddOfferModal open={openOfferForm} handleOpen={handleOpenOfferForm} handleClose={handleCloseOfferForm} />
      <AddRequestModal open={openReqForm} handleOpen={handleOpenReqForm} handleClose={handleCloseReqForm} />

      <button onClick={() => handleOpenReqForm()}> Add Resuests</button>
      <br/>
      <button onClick={() => handleOpenOfferForm()}> Add Offers</button>

    </PageLayout>
  );
}
