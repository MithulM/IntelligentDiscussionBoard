import HomePage from './HomePage.jsx'
import DummyClass from './DummyClass.jsx'
import CreatePost from './createPost.jsx'
import { Routes, Route, Link } from 'react-router-dom';
import SinglePostPage from './SinglePostPage.jsx';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css'

function FancyButton({ to, menuTab, onClick }) {
  return (
    <button className="learn-more" onClick={onClick}>
      <span className="circle">
        <span className="icon arrow"></span>
      </span>
      <span className="button-text">
        {menuTab}
      </span>
    </button>
  )
}

function App() {

  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    Cookies.remove("name");
    Cookies.remove("password");
    navigate("/login");
  }

  const courseList = [
    {
      id: 1,
      class: "HIST 1301"
    },
    {
      id: 2,
      class: "GST 2300"
    },
    {
      id: 6,
      class: "CS 3377"
    }
  ];

  return (
    <div className="App">
      <div className="menu">
        <ul>
          <li>
            <FancyButton to="/" menuTab="Home" onClick={() => navigate("/")} />
          </li>
          {
            courseList.map(courseName =>
              <li key={courseName.id}>
                <FancyButton to={"/" + courseName.class.toLowerCase().replace(/\s/g, '')} menuTab={courseName.class} onClick={() => navigate("/" + courseName.class.toLowerCase().replace(/\s/g, ''))} />
              </li>)
          }
          <li>
            <FancyButton to="/login" menuTab="Logout" onClick={logout} />
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {courseList.map(courseName =>
          <Route key={courseName.id} path={"/" + courseName.class.toLowerCase().replace(/\s/g, '')}>
            <Route index element={<DummyClass courseName={courseName.class} classID={courseName.id}/>} />
            <Route path=":postId" element={<SinglePostPage courseName={courseName.class} />} />
          </Route>
        )}
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </div>
  )
}

export default App;
