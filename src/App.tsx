import { Link } from 'react-router-dom';

function App() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/weather">Weather</Link>
    </nav>
  );
}

export default App;