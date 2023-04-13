import HomePage from './HomePage.jsx'
import DummyClass from './DummyClass.jsx'
import CreatePost from './createPost.jsx'
import { Routes, Route, Link } from 'react-router-dom';
import SinglePostPage from './SinglePostPage.jsx';
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
  const courseList = [
    {
      id: 1,
      class: "CS 4485"
    },
    {
      id: 2,
      class: "CS 4332"
    },
    {
      id: 3,
      class: "CS 4375"
    }
  ];

  return (
      <div className="App">
        <div className="menu">
          <ul>
            <li>
              <FancyButton to="/" menuTab="Home" />
            </li>
            {courseList.map(courseName =>
              <li key={courseName.id}>
                <FancyButton to={"/" + courseName.class.toLowerCase().replace(/\s/g, '')} menuTab={courseName.class} />
              </li>)
            }
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {courseList.map(courseName =>
            <Route key={courseName.id} path={"/" + courseName.class.toLowerCase().replace(/\s/g, '')}>
              <Route>
                <Route index element={<DummyClass courseName={courseName.class} />} />
                <Route path=":postId" element={<SinglePostPage courseName={courseName.class} />} />
              </Route>
            </Route>
          )
          }
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </div>
  )
}

export default App;
