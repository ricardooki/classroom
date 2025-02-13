/* eslint-disable no-unused-vars */
import "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from './pages/student/Home';
import CoursesList from './pages/student/CoursesList';
import CoursesDetails from './pages/student/CoursesDetails';
import MyEnrollments from './pages/student/MyEnrollments';
import Player from './pages/student/Player';
import Loading from './components/student/Loading';
import Teacher from './pages/teacher/Teacher'
import Dashboard from './pages/teacher/Dashboard';
import AddCourse from './pages/teacher/AddCourse'
import MyCourses from './pages/teacher/MyCourses'
import StudentsEnrolled from './pages/teacher/StudentEnroll'
import Navbar from "./components/student/Navbar";

export default function App() {

  const isEducatorRoute = useMatch('/teacher/*');

  return <div className="text-default min-h-screen bg-white">
    {!isEducatorRoute && <Navbar/>}
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/course-list' element={<CoursesList></CoursesList>}></Route>
      <Route path='/course-list/:input' element={<CoursesList></CoursesList>}></Route>
      <Route path='/course/:id' element={<CoursesDetails></CoursesDetails>}></Route>
      <Route path='/my-enrollments' element={<MyEnrollments></MyEnrollments>}></Route>
      <Route path='/player/:courseId' element={<Player></Player>}></Route>
      <Route path='/loading/:path' element={<Loading></Loading>}></Route>
      <Route path='/teacher' element={<Teacher />}>
          <Route path='teacher' element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentsEnrolled />} />
        </Route>
    </Routes>
  </div>;
}
