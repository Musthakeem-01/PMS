import React, { useEffect, useState } from "react";
import Logo from "../../assets/img/logo-01.png";
import Projects from "../projects";
import Dashboard from "../dashboard";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { IoMdSearch } from "react-icons/io";
import CreateTask from "../CreateTask";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
const Header = () => {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [clickedDes, setclickedDes] = useState(null);
  // console.log("🚀 ~ Header ~ clickedDes:", clickedDes);
  const [workid, setWorkId] = useState(null);
  const [greeting, setGreeting] = useState("");

  // console.log("🚀 ~ Header ~ workid:", workid);
  const handlechangetab = (changeTab, id, description) => {
    // console.log(changeTab, id, description, "changeTab,id,description");
    setActiveLink("Projects");
    setWorkId(id);
    setclickedDes(description);
  };

  function getGreeting() {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good morning";
    } else if (currentTime < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }
  const CurrentIcon = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      return "☕"; //FiCoffee
    } else if (hours >= 12 && hours < 18) {
      return <span style={{ color: "#FFA500" }}>☀️</span>;
    } else {
      return "🌔";
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const currentGreeting = getGreeting();
    setGreeting(currentGreeting);
  });
  let name = localStorage.getItem("username");

  return (
    <div className="w-full">
      <div className="w-full px-3 border-HeaderBottomBorder bg-white fixed z-20">
        <nav className="flex">
          <div className="w-2/12 h-14 flex justify-start items-center">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          </div>

          <div className="w-7/12 h-14 flex justify-start items-center">
            {["Dashboard", "Projects"].map((item) => (
              <a
                key={item}
                onClick={() => setActiveLink(item)}
                className={`mr-8 h-14 flex justify-start items-center text-base font-medium ${
                  activeLink === item
                    ? "border-activeLinkBorderColor border-b-4 text-activeLinkTextColor"
                    : "border-transparent border-b-4 text-stone-600"
                } cursor-pointer`}
              >
                {item}
              </a>
            ))}
          </div>
          {/* <div className="mr-8 h-14 flex justify-start items-center text-base font-medium border-transparent border-b-4 text-stone-600 cursor-pointer">
            <h1 className="text-base  font-semibold text-center">
              {greeting ? greeting : "Welcome"},
            </h1>
            <h1 className="text-base  font-semibold  text-center">
              {name.charAt(0).toUpperCase() + name.slice(1)} {CurrentIcon()}
            </h1>
          </div> */}
          <div className="w-3/12 h-14 gap-5 flex justify-end items-center">
            {<CreateTask />}
            <form className="max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <IoMdSearch className="w-5 h-5" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full h-8 pl-10 pr-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
          </div>
          {/* <div className="flex items-center justify-center  bg-gray-100"> */}
          <div
            className="flex items-center justify-center w-8 h-8 mt-3 ml-2 bg-red-500 rounded-lg cursor-pointer hover:bg-red-600"
            onClick={() => {
              navigate("/");
              localStorage.clear();
            }}
          >
            <CiLogout className="text-white text-lg" />
          </div>
          {/* </div> */}
        </nav>
      </div>

      <div>
        {activeLink === "Projects" && (
          <Projects id={workid} desc={clickedDes} />
        )}
        {activeLink === "Dashboard" && (
          <Dashboard changeTab={handlechangetab} />
        )}
      </div>
    </div>
  );
};

export default Header;
