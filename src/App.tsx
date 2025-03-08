import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {Home} from './pages/home/Home'
import {Weather} from './pages/weather/Weather'
import Temperature from './pages/graphs/GraphTemperature'

function App() {
  const [count, setCount] = useState(0)

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
              <Route
                  path="/temperature"
                  element={<Temperature />}
              />
          </Routes>
    </>
  )
}

export default App
