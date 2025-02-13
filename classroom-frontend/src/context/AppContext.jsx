import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { dummyCourses,dummyStudentEnrolled } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const { getToken } = useAuth()
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([])

  const fetchAllCourses = async () => {
    // if(allCourses == [])
    setAllCourses(dummyCourses);
  };

  const fetchUserEnrolledCourses = async () => {

    setEnrolledCourses(dummyStudentEnrolled);
    // const token = await getToken();

    // const { data } = await axios.get(backendUrl + '/api/user/enrolled-courses',
    //     { headers: { Authorization: `Bearer ${token}` } })

    // if (data.success) {
    //     setEnrolledCourses(data.enrolledCourses.reverse())
    // } else (
    //     toast.error(data.message)
    // )

}

  // Function to Calculate Course Chapter Time
  const calculateChapterTime = (chapter) => {
    let time = 0;

    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }

    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return Math.floor(totalRating / course.courseRatings.length);
  };

  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  // Function to Calculate Course Duration
  const calculateCourseDuration = (course) => {
    let time = 0;

    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);

//   useEffect(() => {
//     if (user) {
//         fetchUserData()
//         fetchUserEnrolledCourses()
//     }
// }, [user])

  const value = {
    currency,
    navigate,
    allCourses,
    fetchAllCourses,
    calculateRating,
    calculateChapterTime,
    calculateNoOfLectures,
    calculateCourseDuration,
    isEducator,
    setIsEducator,
    enrolledCourses
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
