
import './App.css';

import Navigation from './components/Navigation';
import Karuseli from './components/homepage/Karuseli';
import Kreu from './components/homepage/Kreu';
function App() {
  return (
    <div className="App">
      <Navigation/>

      <Karuseli/>
    <Kreu/>
    </div>
  );
}

export default App;
