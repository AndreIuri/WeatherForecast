import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import Router and Routes

import { Home } from './pages/home/Home';
import { Weather } from './pages/weather/Weather';

function App() {
  return (
    <Router basename="/WeatherForecast">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;