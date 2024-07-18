import React, { useState, useEffect } from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { MdCelebration } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { IoCalendar } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdInformationCircle } from "react-icons/io";
import getData from "../../components/customcomponents/commonAPISelect";
import CustomTable from "./CustomTable";
import moment from "moment";
const Summary = (props) => {
  // console.log("🚀 ~ Summary ~ props:", props);
  const [projectDetail, setprojectDetail] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [projectData, setProjectData] = useState("");
  // console.log("🚀 ~ Summary ~ projectData:", projectData);
  const [activeTask, setActiveTask] = useState([]);
  const [selectDescription, setSelectDescription] = useState(null);
  const [activityCount, setActivityCount] = useState([]);
  console.log("🚀 ~ Summary ~ activityCount:", activityCount);
  // console.log("🚀 ~ Summary ~ activeTask:", activeTask);
  const fetchData = async () => {
    try {
      const response = await getData("DashboardService/VwAPINSEIPLDetails/", {
        data: {
          p1_int: 103,
          p2_int: null,
          p5_int: null,
          p6_int: null,
          ProjectID_int: null,
          TaskTypeID_int: null,
          UserID_int: localStorage.getItem("UserIDPK"),
          TypeID_int: 0,
        },
      });
      const {
        Output: { status, data },
      } = response;
      if (response.Output.status.code === "200") {
        setDashboardData(response.Output.data[0]);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    try {
      const response = await getData("DashboardService/VwAPINSEIPLDetails/", {
        data: {
          p1_int: 147,
          p2_int: null,
          p3_int: localStorage.getItem("eid"),
          p5_int: 5,
          p6_int: null,
          UserID_int: 0,
        },
      });
      const {
        Output: { status, data },
      } = response;
      if (response.Output.status.code === "200") {
        setProjectData(response.Output.data[0]);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    try {
      const response = await getData("DashboardService/VwAPINSEIPLDetails/", {
        data: {
          p1_int: 97,
          p2_int: localStorage.getItem("eid"),
          UserID_int: 0,
        },
      });
      const {
        Output: { status, data },
      } = response;
      if (response.Output.status.code === "200") {
        setActiveTask(response.Output.data[0]);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    try {
      const response = await getData("DashboardService/VwAPINSEIPLDetails/", {
        data: {
          p1_int: 107,
          ProjectID_int: null,
          TaskTypeID_int: null,
          UserID_int: localStorage.getItem("UserIDPK"),
          TypeID_int: 0,
        },
      });
      const {
        Output: { status, data },
      } = response;
      if (response.Output.status.code === "200") {
        setActivityCount(response.Output.data);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const currentGreeting = getGreeting();
    setGreeting(currentGreeting);
  }, []);

  const ProjectDetailClick = () => {
    setprojectDetail(!projectDetail);
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
  const currentWeek = moment().isoWeek(); // Get the current ISO week number

  const onClickData = (description) => {
    console.log("🚀 ~ onClickData ~ description:", description);
    props.selecteddes(description);
  };
  const WorkOrderID = (id) => {
    props.selectworkid(id);
    // console.log(id, "id from list");
    // setworkid(id);
  };
  const handleActiveTaskClick = () => {
    //props.changeTab();
    if (props.changeTab) {
      props.changeTab(true);
    }
  };

  return (
    <div className="w-full h-auto flex justify-center">
      <div className="w-full max-w-screen-lg text-center ">
        <div className="w-full ">
          <div className="w-full mt-2 flex gap-4">
            <div className="w-full min-h-60 max-h-96 flex bg-white rounded-xl p-3">
              <div className="w-full grid grid-cols-5 gap-2">
                {/* Overview Section */}
                <div className="col-span-1 bg-gray-50 rounded-lg p-2 shadow-sm">
                  <h2 className="text-sm font-semibold mb-2">Overview</h2>
                  <div className="space-y-1">
                    {[
                      { label: "Total", key: "OpenTaks" },
                      { label: "DR", key: "DR" },
                      { label: "CR", key: "CR" },
                      { label: "NR", key: "NR" },
                      { label: "OR", key: "Other" },
                    ].map(({ label, key }) => {
                      const value = dashboardData?.[key] || 0;
                      const barWidth = `${Math.min((value / 250) * 100, 100)}%`;
                      const barColor =
                        value > 200
                          ? "bg-red-500"
                          : value > 150
                          ? "bg-orange-500"
                          : value > 100
                          ? "bg-yellow-500"
                          : value > 50
                          ? "bg-green-500"
                          : "bg-purple-500";

                      return (
                        <div
                          key={label}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="font-medium text-gray-600 w-8">
                            {label}
                          </span>
                          <div className="w-1/2 bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${barColor}`}
                              style={{ width: barWidth }}
                            ></div>
                          </div>
                          <span className="font-semibold w-6 text-right">
                            {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Task Age Section */}
                <div className="col-span-1 bg-gray-50 rounded-lg p-2 shadow-sm">
                  <h6 className="text-sm font-semibold mb-2">Task Age</h6>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {[
                      { label: "7D", key: "7D" },
                      { label: "14D", key: "14D" },
                      { label: "30D", key: "30D" },
                      { label: "60D", key: "60D" },
                      { label: "90D", key: "90D" },
                      { label: "120D", key: "120D" },
                      { label: "120PD", key: "120PD" },
                    ].map(({ label, key }) => {
                      const value = dashboardData?.[key] || 0;
                      const bgColor =
                        value > 200
                          ? "bg-red-100"
                          : value > 150
                          ? "bg-orange-100"
                          : value > 100
                          ? "bg-yellow-100"
                          : value > 50
                          ? "bg-green-100"
                          : "bg-purple-100";
                      const textColor =
                        value > 200
                          ? "text-red-800"
                          : value > 150
                          ? "text-orange-800"
                          : value > 100
                          ? "text-yellow-800"
                          : value > 50
                          ? "text-green-800"
                          : "text-purple-800";

                      return (
                        <div
                          key={label}
                          className={`flex flex-col justify-between p-1 rounded ${bgColor}`}
                        >
                          <span className="font-medium text-gray-600">
                            {label}
                          </span>
                          <span className={`text-right font-bold ${textColor}`}>
                            {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Goals Section */}
                <div className="col-span-1 bg-gray-50 rounded-lg p-2 shadow-sm">
                  <h6 className="text-sm font-semibold mb-2">Goals</h6>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { label: "V2", key: "v2" },
                      { label: "V3", key: "v3" },
                      { label: "V4", key: "v4" },
                      { label: "V5", key: "v5" },
                      { label: "V6", key: "v6" },
                      { label: "B2C", key: "B2C" },
                      { label: "Bill", key: "billing" },
                      { label: "Proleaz", key: "Proleaz" },
                      { label: "All", key: "Total" },
                    ].map(({ label, key }) => {
                      const value = projectData?.[key] || 0;
                      const bgColor =
                        value > 200
                          ? "bg-red-100"
                          : value > 150
                          ? "bg-orange-100"
                          : value > 100
                          ? "bg-yellow-100"
                          : value > 50
                          ? "bg-green-100"
                          : "bg-purple-100";
                      const textColor =
                        value > 200
                          ? "text-red-800"
                          : value > 150
                          ? "text-orange-800"
                          : value > 100
                          ? "text-yellow-800"
                          : value > 50
                          ? "text-green-800"
                          : "text-purple-800";

                      return (
                        <div
                          key={label}
                          className={`flex flex-col items-center justify-center p-1 rounded-md ${bgColor} text-xs`}
                        >
                          <span className="font-medium text-gray-600">
                            {label}
                          </span>
                          <span className={`font-semibold ${textColor}`}>
                            {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Department Section */}
                <div className="col-span-1 bg-gray-50 rounded-lg p-2 shadow-sm">
                  <h6 className="text-sm font-semibold mb-2">Department</h6>
                  <div className="grid grid-cols-2 gap-1">
                    {activityCount.map((item, index) => {
                      const value = item.Total;
                      const bgColor =
                        value > 200
                          ? "bg-red-100"
                          : value > 150
                          ? "bg-orange-100"
                          : value > 100
                          ? "bg-yellow-100"
                          : value > 50
                          ? "bg-green-100"
                          : "bg-purple-100";
                      const textColor =
                        value > 200
                          ? "text-red-800"
                          : value > 150
                          ? "text-orange-800"
                          : value > 100
                          ? "text-yellow-800"
                          : value > 50
                          ? "text-green-800"
                          : "text-purple-800";

                      return (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-1 rounded-md ${bgColor}`}
                        >
                          <span className="text-[10px] font-semibold text-gray-600 truncate w-3/5">
                            {item.Department}
                          </span>
                          <span
                            className={`text-xs font-semibold ${textColor}`}
                          >
                            {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Activities Section */}
                <div className="col-span-1 bg-gray-50 rounded-lg p-2 shadow-sm">
                  <h6 className="text-sm font-semibold mb-2">Activities</h6>
                  <div className="space-y-2">
                    {[
                      { label: "Completed", key: "v2" },
                      { label: "Standby", key: "v3" },
                      { label: "Overdue", key: "v4" },
                    ].map(({ label, key }) => {
                      const value = dashboardData?.[key] || 0;
                      const bgColor =
                        value > 200
                          ? "bg-red-100"
                          : value > 150
                          ? "bg-orange-100"
                          : value > 100
                          ? "bg-yellow-100"
                          : value > 50
                          ? "bg-green-100"
                          : "bg-purple-100";
                      const textColor =
                        value > 200
                          ? "text-red-800"
                          : value > 150
                          ? "text-orange-800"
                          : value > 100
                          ? "text-yellow-800"
                          : value > 50
                          ? "text-green-800"
                          : "text-purple-800";

                      return (
                        <div
                          key={label}
                          className={`flex gap-4 items-center p-2 rounded-lg ${bgColor}`}
                        >
                          <span className="text-xs font-medium text-gray-600 mb-0.5">
                            {label}
                          </span>
                          <span className={`text-sm font-bold ${textColor}`}>
                            {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="w-2/4 min-h-60 max-h-96 bg-white rounded-xl  gap-4">
              <h6 className="pt-2 text-center w-full">Projects Goals</h6>
            </div> */}
          </div>
          {activeTask == null ? (
            <div className="border h-16 mt-4 bg-white rounded-xl flex items-center justify-center p-4 shadow-lg">
              <h1 className="animate-bounce text-orange-500 text-lg font-semibold flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1 4v-4h-1m5.232-1.732a2 2 0 11-2.928 0 2 2 0 012.928 0zM21 21l-4-4m-4 0a5 5 0 100-10 5 5 0 000 10z"
                  />
                </svg>
                Currently, you haven't started any tasks!
              </h1>
            </div>
          ) : (
            <div
              className="border h-25 mt-1 bg-white rounded-xl flex flex-col p-1 shadow-lg cursor-pointer relative"
              onClick={handleActiveTaskClick}
            >
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  {activeTask ? (
                    <div className="flex justify-center items-center rounded-full p-2 h-8 w-8 border-solid border-2 bg-green-600 animate-pulse ring-4 ring-green-400 ring-opacity-50 shadow-lg shadow-green-500/50"></div>
                  ) : (
                    <div className="flex justify-center items-center rounded-full p-2 h-8 w-8 border-solid border-2 bg-gray-300"></div>
                  )}
                  <div>
                    <h2 className="text-xs font-semibold text-gray-800">
                      Task No. {activeTask?.ComplaintNo || ""}
                    </h2>
                    <span
                      title="Contract Name"
                      className="hidden md:inline-block ml-2 pl-2 bg-blue-100 text-xs text-blue-700 py-1 border-blue-700 border-l-2 px-1 rounded-md"
                    >
                      {activeTask?.ContractName || ""}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md shadow-inner">
                    <h1 className="text-sm font-bold">
                      Welcome to Week {currentWeek}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <i className="bi bi-stopwatch mr-1 text-green-600 font-bold"></i>
                    <span className="font-medium text-gray-700">
                      ETA: {activeTask?.ETATime || ""}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <i className="bi bi-calendar-fill mr-1 text-blue-600"></i>
                    <span className="font-medium text-gray-700">
                      {activeTask?.ETADate || ""}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs font-semibold text-gray-700 leading-relaxed">
                {activeTask?.Description || ""}
              </p>
            </div>
          )}
          <div className="w-full pt-1 h-90">
            <CustomTable
              WorkOrderID={WorkOrderID}
              onClickData={onClickData}
              changeTab={props.changeTab}
            />
          </div>

          {/* <div className="w-full mt-4 flex gap-4">
            <div className="w-2/4 h-96 bg-white rounded-xl flex items-center pl-5 gap-4 cursor-pointer group"></div>

            <div className="w-2/4 h-96 bg-white rounded-xl flex items-center pl-5 gap-4 cursor-pointer group"></div>
          </div> */}
          {/* 
          <div className="w-full mt-4 flex gap-4">
            <div className="w-2/4 h-96 bg-white rounded-xl flex items-center pl-5 gap-4 cursor-pointer group"></div>

            <div className="w-2/4 h-96 bg-white rounded-xl flex items-center pl-5 gap-4 cursor-pointer group"></div>
          </div> */}
        </div>

        {/* <div className="w-full flex justify-center pt-7">
            <div className="flex items-center gap-2 text-white">
              <IoMdInformationCircle className="w-6 h-6 text-stone-100" />
              <span className="text-sm">
                Was the information shown in this page useful?
              </span>
              <span className="text-sm font-medium cursor-pointer hover:underline">
              
                Give us feedback
              </span>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default Summary;
