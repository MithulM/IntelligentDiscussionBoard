import HomePage from './HomePage.jsx'
import DummyClass from './DummyClass.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/class1">Class 1</Link>
            </li>
            <li>
              <Link to="/class2">Class 2</Link>
            </li>
          </ul>
        </div>
        <Routes className="main">
          <Route path="/" element={<HomePage/>}/>
          <Route path="/class1" element={<DummyClass/>}/>
        </Routes>
      </Router >
    </div>
  )
}

export default App
