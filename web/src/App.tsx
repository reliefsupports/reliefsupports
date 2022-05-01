import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from 'screens/Home';
import RequestSingle from 'screens/Request';
import OfferSingle from 'screens/Offer';
import CreateEntry from 'screens/Entry/Create';
import SignIn from 'screens/Auth';
import Register from 'screens/Auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="request/:id" element={<RequestSingle />} />
        <Route path="help-offer/:id" element={<OfferSingle />} />

        <Route path="create-entry" element={<CreateEntry />} />

        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-in/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
