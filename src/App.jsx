import HomePage from './HomePage.jsx'
import DummyClass from './DummyClass.jsx'
import CreatePost from './createPost.jsx'
import { Routes, Route } from 'react-router-dom'
import SinglePostPage from './SinglePostPage.jsx'
import NavLayout from './components/NavLayout.jsx'
import SignPage from "./Signin.jsx"
import Register from "./Register.jsx"
import WebsiteLayout from "./WebsiteLayout.jsx"
import Missing from "./Missing.jsx"
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
    <div className='App'>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route path="/signin" element={<SignPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<NavLayout courseList={courseList} />}>
            <Route path="/" element={<HomePage />} />
            {courseList.map(courseName =>
              <Route key={courseName.id} path={"/" + courseName.class.toLowerCase().replace(/\s/g, '')}>
                <Route index element={<DummyClass courseName={courseName.class} classID={courseName.id} />} />
                <Route path=":postID" element={<SinglePostPage courseName={courseName.class} />} />
              </Route>
            )}
            <Route path="/createpost" element={<CreatePost />} />
          </Route>
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
