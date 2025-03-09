// App.tsx
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Weather } from './pages/weather/Weather';

function App() {
  return (
    <>
      {/* No need to wrap this with Router */}
      <Router basename="/WeatherForecast">  
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Router>
    </>
  );
}

export default App;