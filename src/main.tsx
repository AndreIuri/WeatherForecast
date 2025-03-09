import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';  // Import Router
import App from './App';

// Wrap the Router with a basename
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router basename="/WeatherForecast">  {/* Set the basename here */}
    <App />
  </Router>
);