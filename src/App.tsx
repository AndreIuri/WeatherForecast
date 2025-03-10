import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import {Home} from './pages/home/Home'
import {Weather} from './pages/weather/Weather'

function App() {

  return (
    <>
          <Routes>
              <Route
                  path="/"
                  element={<Home />}
              />
              <Route
                  path="/weather"
                  element={<Weather />}
              />
          </Routes>
    </>
  )
}

export default App
