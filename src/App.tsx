import './App.css';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Use HashRouter and Link
import { Home } from './pages/home/Home';
import { Weather } from './pages/weather/Weather';

function App() {
  return (
    <Router>  {/* Wrap the app with HashRouter */}
      <div className="d-flex flex-column h-100">
        <header>
          {/* Updated navigation using Link component */}
          <nav>
            <ul>
              <li>
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li>
                <Link className="nav-link" to="/weather">Weather</Link>
              </li>
              {/* Add more navigation links here */}
            </ul>
          </nav>
        </header>
        <main className="flex-shrink-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            {/* Add more routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;