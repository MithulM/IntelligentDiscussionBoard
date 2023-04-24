import HomePage from './HomePage.jsx'
import DummyClass from './DummyClass.jsx'
import CreatePost from './createPost.jsx'
import { Routes, Route } from 'react-router-dom';
import SinglePostPage from './SinglePostPage.jsx';
import NavBar from './NavLayout.jsx';
import Cookies from 'js-cookie';
import './styles/App.css'

function App() {
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
      <NavBar courseList={courseList} />
      <div className='page'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {courseList.map(courseName =>
            <Route key={courseName.id} path={"/" + courseName.class.toLowerCase().replace(/\s/g, '')}>
              <Route index element={<DummyClass courseName={courseName.class} classID={courseName.id} />} />
              <Route path=":postID" element={<SinglePostPage courseName={courseName.class} />} />
            </Route>
          )}
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
