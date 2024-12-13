
import './App.css';

import Navigation from './components/Navigation';
import Karuseli from './components/homepage/Karuseli';
import Kreu from './components/homepage/Kreu';
import Contact from './components/Contact';
import AllMatches from './components/ndeshjet/AllMatches';
import Dyqani from './components/dyqani/Dyqani';
import { Route,Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
<Route path="/" element={<Kreu/>}></Route>
<Route path="/kontakt" element={<Contact/>}></Route>
<Route path="/ndeshjet" element={<AllMatches/>}></Route>
<Route path="/dyqani" element={<Dyqani/>}></Route>

      </Routes>

    </div>
  );
}

export default App;
