import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import {
  useClerk,
  UserButton,
  useUser,
  ClerkProvider,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

const Navbar = () => {
  const isCoursesListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { navigate, isEducator } = useContext(AppContext);  

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 
    border-b border-gray-500 py-4 ${
      isCoursesListPage ? "bg-white" : "bg-cyan-100/70"
    }`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-28 lg:w-32 cursor-point"
      ></img>
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button onClick={() => { navigate('/teacher')}}>{isEducator ?  "Teacher Dashboard" : "Become Teacher" }</button>|
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton></UserButton>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>
      {/* This is the mobile view of the navbar */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button onClick={() => { navigate('/teacher')}}>{isEducator ? "Become Teacher" : "Teacher Dashboard"}</button>|
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? <UserButton></UserButton> : <button onClick={() => openSignIn()}>
          <img src={assets.user_icon} alt="user"></img>
        </button>}
        
      </div>
    </div>
  );
};

export default Navbar;
