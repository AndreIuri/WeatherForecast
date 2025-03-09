// App.tsx
import './App.css';
import { Route, Routes } from 'react-router-dom';  // Make sure to use Routes instead of just Route
import { Home } from './pages/home/Home';
import { Weather } from './pages/weather/Weather';

function App() {
  return (
    <>
      {/* No need to wrap this with Router */}
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </>
  );
}

export default App;