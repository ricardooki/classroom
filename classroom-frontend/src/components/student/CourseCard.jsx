import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "./../../context/AppContext";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={"/course/" + course._id}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg"
    >
      <img className="w-full" src={course.courseThumbnail} alt="" />
      <div className="p-4 text-left">
        <h3 className="font-semibold text-base">{course.courseTitle}</h3>
        <p className="text-gray-500">Classroom</p>
        <div className="flex items-center ">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                className="w-3.5 h-3.5"
                src={
                  i < Math.floor(calculateRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt=""
              />
            ))}
          </div>
        </div>
        <p className="text-base font-semibold text-gray-800">
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
