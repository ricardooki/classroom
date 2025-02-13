import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from './../../components/teacher/Navbar';
import Footer from './../../components/teacher/Footer'
import SideBar from './../../components/teacher/Sidebar';

const Teacher = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="flex-1">{<Outlet />}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Teacher;
