import Donation from 'screens/Donation';
import Donations from 'screens/Donations';
import Home from 'screens/Home';

function App() {
  return (
    <div>
      {/* Put routes here. */}
      <Home />
      <Donations />
      <Donation id="2" />
    </div>
  );
}

export default App;
