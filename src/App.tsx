import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import { Home } from './pages/home/Home';
import { Weather } from './pages/weather/Weather';

function App() {
  return (
    <Router basename="/WeatherForecast">  {/* ✅ Only one Router */}
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;