import HomePage from './HomePage.jsx'
import DummyClass from './DummyClass.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'

function FancyButton({ to, menuTab }) {
  return (
    <button className="learn-more">
      <span className="circle">
        <span className="icon arrow"></span>
      </span>
      <span className="button-text">
        <Link to={to}>{menuTab}</Link>
      </span>
    </button>
  )
}

function App() {
  return (
    <div className="App">
      <Router>
        <div className="menu">
          <ul>
            <li>
              <FancyButton to="/" menuTab="Home" />
            </li>
            <li>
              <FancyButton to="/class1" menuTab="Class 1" />
            </li>
            <li>
              <FancyButton to="/class2" menuTab="Class 2" />
            </li>
          </ul>
        </div>
        <Routes className="main">
          <Route path="/" element={<HomePage />} />
          <Route path="/class1" element={<DummyClass />} />
        </Routes>
      </Router >
    </div>
  )
}

export default App
