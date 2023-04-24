import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import DummyClass from './pages/DummyClass.jsx'
import CreatePost from './createPost.jsx'
import SinglePostPage from './pages/SinglePostPage.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import NavLayout from './components/NavLayout.jsx'
import SignPage from "./pages/Signin.jsx"
import Register from "./pages/Register.jsx"
import WebsiteLayout from "./WebsiteLayout.jsx"
import Missing from "./pages/Missing.jsx"
import { NotAuth } from './components/RequireAuth.jsx'
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
        <Route path="/login" element={<Navigate to="/signin" />} />
        <Route path="/" element={<WebsiteLayout />}>
          <Route element={<NotAuth />}>
            <Route path="/signin" element={<SignPage />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<RequireAuth />}>
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
          </Route>
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
