import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from 'screens/Home';
import EntrySingle from 'screens/Entry';
import CreateEntry from 'screens/Entry/Create';
import SignIn from 'screens/Auth';
import Register from 'screens/Auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="entries/create" element={<CreateEntry />} />
        <Route path="entries/:id" element={<EntrySingle />} />

        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-in/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
