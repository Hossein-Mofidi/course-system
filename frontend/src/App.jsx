import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./components/pages/LandingPage.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import Login from "./components/pages/Login.jsx";
import SignUp from "./components/pages/SignUp.jsx";
import Admin from "./components/pages/AdminPanel/Admin.jsx";
import AdminCourses from "./components/pages/AdminPanel/AdminCourses.jsx";
import Users from "./components/pages/AdminPanel/Users.jsx"
import CreateCourse from "./components/pages/AdminPanel/CreateCourse.jsx";
import {Courses} from "./components/Courses.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LandingPage/>}/>
                <Route path="courses" element={<Courses/>}/>
                <Route path="admin">
                    <Route index element={<Admin/>}/>
                    <Route path="courses">
                        <Route index element={<AdminCourses/>}/>
                        <Route path="add" element={<CreateCourse/>}/>
                        <Route path="edit/:id" element={<CreateCourse/>}/>
                    </Route>
                    <Route path="users" element={<Users/>}/>
                </Route>
                <Route path="login" element={<Login/>}/>
                <Route path="signup" element={<SignUp/>}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
