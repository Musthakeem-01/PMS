import React, { useState, useEffect, useRef } from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { LuMoreHorizontal } from "react-icons/lu";
import { CgLayoutGridSmall } from "react-icons/cg";
import { FaTasks } from "react-icons/fa";
import { PiArrowsInSimpleBold } from "react-icons/pi";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import getData from "../../components/customcomponents/commonAPISelect";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getCurrentWeekDate } from "../../components/function/getCurrentWeekDate";
import "../../assets/css/menu.css";

const Board = () => {
  const [headerResponse, setHeaderResponse] = useState([]);
  console.log("🚀 ~ Board ~ headerResponse:", headerResponse);
  const [stageDatas, setStageDatas] = useState([]);
  const [departmentDatas, setDepartmentDatas] = useState([]);
  console.log("🚀 ~ Board ~ departmentDatas:", departmentDatas);

  const [activeDepartment, setActiveDepartment] = useState("ALL");
  console.log("🚀 ~ Board ~ activeDepartment:", activeDepartment);

  const [minimizedCards, setMinimizedCards] = useState({});
  const { weekNumber, year, date } = getCurrentWeekDate();

  const [moreShowDropdown, setMoreShowDropdown] = useState(false);
  const MoreDropdownRef = useRef(null);

  const cardData = [
    {
      title: "ALL",
      iconClass: "bi-receipt",
      total: departmentDatas?.OpenWo,
      closed: 0,
      open: departmentDatas?.OpenWo,
      fullTitle: "ALL",
      shortTitle: null,
    },
    {
      title: "Sales",
      iconClass: "bi-receipt",
      total: departmentDatas?.SALESTOTAL,
      closed: departmentDatas?.SALESCLOSED,
      open: departmentDatas?.SALESOPEN,
      fullTitle: "Sales & Marketing",
      shortTitle: "W-SALES",
    },
    {
      title: "BA",
      iconClass: "bi-bar-chart-line",
      total: departmentDatas?.BATOTAL,
      closed: departmentDatas?.BACLOSED,
      open: departmentDatas?.BAOPEN,
      fullTitle: "Business Analyst",
      shortTitle: "W-BA",
    },
    {
      title: "UI/UX",
      iconClass: "bi-bricks",
      total: departmentDatas?.UIUXTOTAL,
      closed: departmentDatas?.UIUXCLOSED,
      open: departmentDatas?.UIUXOPEN,
      fullTitle: "UI/UX Design",
      shortTitle: "W-UIUX",
    },
    {
      title: "DB",
      iconClass: "bi-graph-down",
      total: departmentDatas?.DBTOTAL,
      closed: departmentDatas?.DBCLOSED,
      open: departmentDatas?.DBOPEN,
      fullTitle: "Database Admin",
      shortTitle: "W-DB",
    },
    {
      title: "Web",
      iconClass: "bi-laptop",
      total: departmentDatas?.WEBTOAL,
      closed: departmentDatas?.WEBCLOSED,
      open: departmentDatas?.WEBOPEN,
      fullTitle: "Web Development",
      shortTitle: "W-WEB",
    },
    {
      title: "Mobile",
      iconClass: "bi-phone",
      total: departmentDatas?.MOBILETOTAL,
      closed: departmentDatas?.MOBILECLOSED,
      open: departmentDatas?.MOBILEOPEN,
      fullTitle: "Mobile Dev",
      shortTitle: "W-MOBILE",
    },
    {
      title: "Integration",
      iconClass: "bi-phone",
      total: departmentDatas?.INTEGRATOTAL,
      closed: departmentDatas?.INTEGRACLOSED,
      open: departmentDatas?.INTEGRAOPEN,
      fullTitle: "Integration",
      shortTitle: "W-MOBILE",
    },
    {
      title: "QA & QC",
      iconClass: "bi-tools",
      total: departmentDatas?.TESTINGTOTAL,
      closed: departmentDatas?.TESTINGCLOSED,
      open: departmentDatas?.TESTINGOPEN,
      fullTitle: "Testing",
      shortTitle: "W-TESTING",
    },
    {
      title: "Deployee",
      iconClass: "bi-rocket",
      total: departmentDatas?.DEPLOYEETOTAL,
      closed: departmentDatas?.DEPLOYEECLOSED,
      open: departmentDatas?.DEPLOYEEOPEN,
      fullTitle: "Deployeement",
      shortTitle: "W-DEPLOYEE",
    },
    {
      title: "Implement",
      iconClass: "bi-gift",
      total: departmentDatas?.IMPTOTAL,
      closed: departmentDatas?.IMPCLOSED,
      open: departmentDatas?.IMPOPEN,
      fullTitle: "Implementation",
      shortTitle: "W-Implementation",
    },
    {
      title: "Support",
      iconClass: "bi-chat",
      total: departmentDatas?.SUPPORTTOTAL,
      closed: departmentDatas?.SUPPORTCLOSED,
      open: departmentDatas?.SUPPORTOPEN,
      fullTitle: "Support",
      shortTitle: "W-SUPPORT",
    },
    {
      title: "Cloud",
      iconClass: "bi-cloud",
      total: departmentDatas?.CLOUDTOTAL,
      closed: departmentDatas?.CLOUDCLOSED,
      open: departmentDatas?.CLOUDOPEN,
      fullTitle: "CLOUD",
      shortTitle: "W-CLOUD",
    },
    {
      title: "RND",
      iconClass: "bi-search",
      total: departmentDatas?.RNDTOTAL,
      closed: departmentDatas?.RNDCLOSED,
      open: departmentDatas?.RNDOPEN,
      fullTitle: "R&D",
      shortTitle: "W-RND",
    },
    {
      title: "IT Infra",
      iconClass: "bi-hdd-network",
      total: departmentDatas?.ITINFRATOTAL,
      closed: departmentDatas?.ITINFRACLOSED,
      open: departmentDatas?.ITINFRAOPEN,
      fullTitle: "IT INFRASTRUCURE",
      shortTitle: "W-ITINFRA",
    },
    {
      title: "Security",
      iconClass: "bi-shield-check",
      total: departmentDatas?.SECURITYTOTAL,
      closed: departmentDatas?.SECURITYCLOSED,
      open: departmentDatas?.SECURITYOPEN,
      fullTitle: "SECURITY",
      shortTitle: "W-SECURITY",
    },
    {
      title: "HR",
      iconClass: "bi-people",
      total: departmentDatas?.HRTOTAL,
      closed: departmentDatas?.HRCLOSED,
      open: departmentDatas?.HROPEN,
      fullTitle: "HUMAN RESOURCES",
      shortTitle: "W-HR",
    },
    {
      title: "Finance",
      iconClass: "bi-currency-dollar",
      total: departmentDatas?.FINANCETOTAL,
      closed: departmentDatas?.FINANCECLOSED,
      open: departmentDatas?.FINANCEOPEN,
      fullTitle: "FINANCE",
      shortTitle: "W-FINANCE",
    },
    {
      title: "Project",
      iconClass: "bi-list",
      total: departmentDatas?.PROJECTTOTAL,
      closed: departmentDatas?.PROJECTCLOSED,
      open: departmentDatas?.PROJECTOPEN,
      fullTitle: "PROJECT",
      shortTitle: "W-PROJECT",
    },
  ];

  // useEffect(() => {
  //     function handleClickOutside(event) {
  //         if (moreShowDropdown && MoreDropdownRef.current && !MoreDropdownRef.current.contains(event.target)) {
  //             setMoreShowDropdown(false);
  //         }
  //     }
  //     document.addEventListener('mousedown', handleClickOutside);
  //     return () => {
  //         document.removeEventListener('mousedown', handleClickOutside);
  //     };
  // }, [moreShowDropdown]);

  useEffect(() => {
    fetchHeaderData();
    fetchStageData();
    fetchDepartmentData();
  }, []);

  const toggleMinimize = (cardId) => {
    setMinimizedCards((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };

  const toggleDropdown = (val) => {
    setMoreShowDropdown(!val);
  };

  const fetchDepartmentData = async () => {
    try {
      const response = await getData(
        "DashboardService/VwAPINSEIPLDetailsNew/",
        {
          data: {
            p1_int: 2,
            p2_int: weekNumber,
            p3_int: year,
            p4_int: null,
            p6_int: localStorage.getItem("eid"),
            ProjectID_int: null,
            UserID_int: 0,
          },
        }
      );
      const {
        Output: { status, data },
      } = response;
      if (status.code === "200") {
        setDepartmentDatas(data[0]);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const fetchHeaderData = async (departmentType) => {
    try {
      const response = await getData(
        "DashboardService/VwAPINSEIPLDetailsNew/",
        {
          data: {
            p1_int: 42,
            p2_int: weekNumber,
            p3_int: year,
            p4_int: null,
            p5_int: null,
            P9_varchar: departmentType ? departmentType : null,
            ProjectID_int: null,
            UserID_int: 0,
          },
        }
      );
      const {
        Output: { status, data },
      } = response;
      if (status.code === "200") {
        setHeaderResponse(data);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const fetchStageData = async (departmentType) => {
    try {
      const response = await getData(
        "DashboardService/VwAPINSEIPLDetailsNew/",
        {
          data: {
            p1_int: 41,
            p2_int: weekNumber,
            p3_int: year,
            p4_int: null,
            p6_int: localStorage.getItem("eid"),
            P9_varchar: departmentType ? departmentType : null,
            ProjectID_int: null,
            UserID_int: 0,
          },
        }
      );
      const {
        Output: { status, data },
      } = response;
      if (status.code === "200") {
        setStageDatas(data);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const updateCardStage = async (cardId, newStageId) => {
    try {
      const response = await fetch(
        "https://smartfm.in/NSEIPLSERVICE/DashboardService/VwAPINSEIPLDetailsNew/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              p1_int: 43,
              p2_int: cardId,
              p3_int: newStageId,
              UserID_int: 0,
            },
          }),
        }
      );

      const result = await response.json();
      const {
        Output: { status },
      } = result;
      if (status.code !== "200") {
        console.error("Error updating card stage:", status.message);
      }
    } catch (error) {
      console.error("Error updating card stage:", error.message);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const destinationStage = destination.droppableId;
    const cardId = result.draggableId;
    const newStageId = destinationStage.split("-")[1];

    // Find the index of the moved card in the stageDatas array
    const cardIndex = stageDatas.findIndex(
      (data) => data.ComplaintIDPK === cardId
    );
    if (cardIndex === -1) {
      console.error("Card not found in stageDatas array");
      return;
    }

    // Update the stageDatas array
    const newStageDatas = [...stageDatas];
    const [movedCard] = newStageDatas.splice(cardIndex, 1);
    movedCard.DepartStageIDPK = newStageId;
    newStageDatas.splice(destination.index, 0, movedCard);

    setStageDatas(newStageDatas);
    updateCardStage(cardId, newStageId);
  };

  const noStageCount = stageDatas.filter(
    (data) => !data.DepartStageIDPK
  ).length;
  const noStageData = stageDatas.filter((data) => !data.DepartStageIDPK);

  const StageColors = [
    { border: "border-blue-600", text: "text-blue-600", bg: "bg-blue-200" },
    { border: "border-green-600", text: "text-green-600", bg: "bg-green-200" },
    { border: "border-pink-600", text: "text-pink-600", bg: "bg-pink-200" },
    {
      border: "border-purple-600",
      text: "text-purple-600",
      bg: "bg-purple-200",
    },
    {
      border: "border-yellow-600",
      text: "text-yellow-600",
      bg: "bg-yellow-200",
    },
    { border: "border-red-600", text: "text-red-600", bg: "bg-red-200" },
    { border: "border-teal-600", text: "text-teal-600", bg: "bg-teal-200" },
    {
      border: "border-orange-600",
      text: "text-orange-600",
      bg: "bg-orange-200",
    },
  ];

  const getStageColors = (index) => {
    const colorIndex = index % StageColors.length;
    return StageColors[colorIndex];
  };

  const getStageBorderColor = (index) => {
    return getStageColors(index).border;
  };

  const getStageTextColor = (index) => {
    return getStageColors(index).text;
  };

  const getSubStageBgColor = (index) => {
    return getStageColors(index).bg;
  };

  return (
    <div className="w-full ">
      {/* Search bar section */}
      <div className="fixed top-36 left-0 right-0 z-30 px-7 pt-7 pb-3 bg-opacity-50 backdrop-filter backdrop-blur-lg ">
        <div className="flex justify-end	  ">
          {/* <form className="max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                <IoMdSearch className="w-5 h-5" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full h-8 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                placeholder="Search"
                required
              />
            </div>
          </form> */}

          <div className="flex justify-center items-center gap-1 ">
            {/* <div className="flex gap-2 items-center text-white cursor-pointer">
              <button className="flex items-center gap-2 text-sm font-medium text-white px-3 h-8 bg-transparent rounded hover:bg-ShareHoveBG">
                <IoShareSocialSharp className="w-4 h-4" /> Share
              </button>
            </div> */}

            <div className="flex gap-2 items-center cursor-pointer">
              <button
                className="flex items-center gap-2 text-sm text-white font-medium px-3 h-8 bg-transparent rounded hover:bg-ShareHoveBG"
                onClick={() => toggleDropdown(moreShowDropdown)}
              >
                <IoFilter className="w-4 h-4" />
                Filter
              </button>
              {moreShowDropdown && (
                <div
                  className="absolute top-3/4 right-8 w-80 bg-white border border-gray-200  shadow-lg z-10"
                  style={{ marginTop: "0.5rem" }}
                  ref={MoreDropdownRef}
                >
                  <div className="px-4 py-2 bg-green-200 text-green-600  text-sm font-medium">
                    DEPARTMENT
                  </div>
                  <ul className="h-auto max-h-72 overflow-y-auto">
                    {cardData.map((department, index) => (
                      <li
                        key={index}
                        className={`py-2 px-4 text-sm flex gap-2 items-center cursor-pointer ${
                          activeDepartment === department.title
                            ? "bg-green-50 text-green-500"
                            : ""
                        }`}
                        style={{
                          display: department.total == 0 ? "none" : "block",
                        }}
                        onClick={() => {
                          setActiveDepartment(department.title);
                          fetchStageData(department.shortTitle);
                          fetchHeaderData(department.shortTitle);
                          setMoreShowDropdown(false);
                        }}
                      >
                        {department.title} - ({department.total})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* <div className="flex gap-2 items-center text-white cursor-pointer">
              <button className="flex items-center gap-2 text-sm font-medium text-white px-3 h-8 bg-transparent rounded hover:bg-ShareHoveBG">
                <IoMdMenu className="w-4 h-4" />
                Group by : Status
              </button>
            </div>

            <div className="flex gap-2 items-center text-white cursor-pointer">
              <button className="flex items-center gap-2 text-sm font-medium text-white px-3 h-8 bg-transparent rounded hover:bg-ShareHoveBG">
                <LuMoreHorizontal className="w-4 h-4" />
                More
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Card view section */}
      <div className="mt-10 overflow-auto custom-scrollbar">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="pt-5 flex gap-2 overflow-auto">
            {/* Abstract for stages columns */}
            <div className="flex flex-col gap-2">
              <div
                className={`w-48 flex gap-1 rounded bg-BoardCardBG px-2 py-1.5 ${getStageBorderColor(
                  0
                )} border-l-4`}
              >
                <span className="text-sm font-medium text-stone-800">
                  All Stages
                </span>
              </div>

              <div
                className="overflow-y-auto overflow-x-hidden	 flex flex-col gap-2"
                style={{ height: "63vh" }}
              >
                {headerResponse.map((stage, index) => (
                  <Droppable
                    key={index}
                    droppableId={`AbstractStage-${stage.DepartStageIDPK}`}
                  >
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex flex-col gap-2"
                        style={{
                          display:
                            activeDepartment == "ALL"
                              ? stageDatas.filter(
                                  (data) =>
                                    data.DepartStageIDPK ===
                                    stage.DepartStageIDPK
                                ).length == 0
                                ? "none"
                                : " "
                              : " ",
                        }}
                      >
                        <div
                          className={`w-48 flex gap-1 rounded bg-BoardCardBG px-2 py-1.5 ${getStageBorderColor(
                            index + 1
                          )} border-l-4`}
                        >
                          <span className="text-sm font-medium text-stone-800">
                            {stage.DepartStageName}
                          </span>
                          <span
                            className={`text-sm font-medium ${getStageTextColor(
                              index + 1
                            )} `}
                          >
                            (
                            {
                              stageDatas.filter(
                                (data) =>
                                  data.DepartStageIDPK == stage.DepartStageIDPK
                              ).length
                            }
                            )
                          </span>
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </div>

            <div
              className="flex gap-2 custom-scrollbar overflow-x-scroll scroll-smooth"
              style={{ height: "70vh" }}
            >
              {/* No stages columns */}
              <Droppable droppableId="stage-null">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col gap-2"
                  >
                    <div
                      className={`w-80 flex gap-1 rounded bg-BoardCardBG px-2 py-1.5 ${getStageBorderColor(
                        0
                      )} border-l-4`}
                    >
                      <span className="text-sm font-medium text-stone-800">
                        No Stages
                      </span>
                      <span
                        className={`text-sm font-medium ${getStageTextColor(
                          0
                        )} `}
                      >
                        ({noStageCount})
                      </span>
                    </div>
                    <div className="h-5/5 overflow-y-auto overflow-x-hidden	 flex flex-col gap-2">
                      {noStageData.map((val, index) => (
                        <Draggable
                          key={val.ComplaintNo}
                          draggableId={val.ComplaintIDPK}
                          index={index}
                          isDragDisabled={activeDepartment == "ALL"}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="w-80 rounded bg-BoardCardBG p-2 cursor-pointer"
                            >
                              <div className="flex justify-between">
                                <div className="flex gap-1 justify-start items-center">
                                  <CgLayoutGridSmall />
                                  <p
                                    className={`text-xs font-medium p-1 px-2 rounded ${getSubStageBgColor(
                                      0
                                    )} ${getStageTextColor(0)}`}
                                  >
                                    No Stage
                                  </p>
                                  <p className="text-xs font-medium px-1">
                                    {" "}
                                    - {index + 1}
                                  </p>
                                </div>
                                <button
                                  className="flex items-center gap-2 text-sm font-medium px-3 h-6 cursor-pointer bg-transparent rounded hover:bg-ShareHoveBG"
                                  onClick={() =>
                                    toggleMinimize(val.ComplaintNo)
                                  }
                                >
                                  {minimizedCards[val.ComplaintNo] ? (
                                    <HiOutlineArrowsExpand className="w-4 h-4" />
                                  ) : (
                                    <PiArrowsInSimpleBold className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                              {!minimizedCards[val.ComplaintNo] && (
                                <div>
                                  <div className="p-2 mt-2 bg-white border-BorderCard rounded border cursor-pointer group">
                                    <div className="flex flex-col gap-1">
                                      <div className="text-xs font-medium flex gap-2">
                                        <p className="text-xs font-medium text-blue-600">
                                          {val.ComplaintNo || " "}
                                        </p>
                                        <p className="text-pink-600">
                                          {val.ComplainerName || " "} -
                                        </p>
                                        <p className="text-green-800">
                                          {val.TechName || " "} -
                                        </p>
                                        <p className="text-blue-600">
                                          {val.CCMProTypeName || " "}
                                        </p>
                                      </div>
                                      <p>
                                        <span className="text-xs font-medium text-red-600">
                                          Del : {val.DeliveryDate || " "}
                                        </span>
                                        <span className="text-xs font-medium text-green-800 pl-2">
                                          ETA : {val.ETADate || " "}
                                        </span>
                                      </p>

                                      <p className="text-xs font-semibold text-stone-700">
                                        {val.RequestDetailsDesc || " "}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-full pt-1 flex flex-col gap-1 ">
                                    <p className="text-xs font-medium text-stone-600 pl-1">
                                      {val.ContractName || " "}
                                    </p>
                                    <div className="flex items-center gap-2 pl-1">
                                      {val.MainComplaintNo && (
                                        <p className="text-xs font-medium text-pink-600 bg-pink-200 py-0.5 px-2 rounded">
                                          {val.MainComplaintNo || " "}
                                        </p>
                                      )}
                                      <p className="text-xs font-medium text-orange-600 bg-orange-200 py-0.5 px-3 rounded">
                                        {val.CCmWoTypeName || " "}
                                      </p>
                                      <p className="text-xs font-medium text-purple-600 bg-purple-200 py-0.5 px-4 rounded">
                                        {val.Projects || " "}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Other stages columns */}
              {headerResponse.map((stage, index) => (
                <Droppable
                  key={index}
                  droppableId={`ListStage-${stage.DepartStageIDPK}`}
                >
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-col gap-2"
                      style={{
                        display:
                          activeDepartment == "ALL"
                            ? stageDatas.filter(
                                (data) =>
                                  data.DepartStageIDPK === stage.DepartStageIDPK
                              ).length == 0
                              ? "none"
                              : " "
                            : " ",
                      }}
                    >
                      <div
                        className={`w-80 flex gap-1 rounded bg-BoardCardBG px-2 py-1.5 ${getStageBorderColor(
                          index + 1
                        )} border-l-4`}
                      >
                        <span className="text-sm font-medium text-stone-800">
                          {stage.DepartStageName}
                        </span>
                        <span
                          className={`text-sm font-medium ${getStageTextColor(
                            index + 1
                          )} `}
                        >
                          (
                          {
                            stageDatas.filter(
                              (data) =>
                                data.DepartStageIDPK == stage.DepartStageIDPK
                            ).length
                          }
                          )
                        </span>
                      </div>

                      <div className="h-5/5 overflow-y-auto overflow-x-hidden flex flex-col gap-2">
                        {stageDatas
                          .filter(
                            (data) =>
                              data.DepartStageIDPK === stage.DepartStageIDPK
                          )
                          .map((val, valIndex) => (
                            <Draggable
                              key={val.ComplaintNo}
                              draggableId={val.ComplaintIDPK}
                              index={valIndex}
                              isDragDisabled={activeDepartment == "ALL"}
                            >
                              {(provided) => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  className="w-80 rounded bg-BoardCardBG p-2 cursor-pointer"
                                >
                                  <div className="flex justify-between">
                                    <div className="flex gap-1 justify-start items-center">
                                      <CgLayoutGridSmall />
                                      <p
                                        className={`text-xs font-medium p-1 px-2 rounded ${getSubStageBgColor(
                                          index + 1
                                        )} ${getStageTextColor(index + 1)}`}
                                      >
                                        {stage.DepartStageName}
                                      </p>
                                      <p className="text-xs font-medium px-1">
                                        {" "}
                                        - {valIndex + 1}
                                      </p>
                                    </div>
                                    <button
                                      className="flex items-center gap-2 text-sm font-medium px-3 h-6 cursor-pointer bg-transparent rounded hover:bg-ShareHoveBG"
                                      onClick={() =>
                                        toggleMinimize(val.ComplaintNo)
                                      }
                                    >
                                      {minimizedCards[val.ComplaintNo] ? (
                                        <HiOutlineArrowsExpand className="w-4 h-4" />
                                      ) : (
                                        <PiArrowsInSimpleBold className="w-4 h-4" />
                                      )}
                                    </button>
                                  </div>
                                  {!minimizedCards[val.ComplaintNo] && (
                                    <div>
                                      <div className="p-2 mt-2 bg-white border-BorderCard rounded border cursor-pointer group hover:bg-blue-100">
                                        <div className="flex flex-col gap-1">
                                          <div className="text-xs font-medium flex gap-2 text-wrap">
                                            <p className="text-xs font-medium text-blue-600">
                                              {val.ComplaintNo}
                                            </p>
                                            <p className="text-pink-600">
                                              {val.ComplainerName} -
                                            </p>
                                            <p className="text-green-800">
                                              {val.TechName} -
                                            </p>
                                            <p className="text-blue-600">
                                              {val.CCMProTypeName}
                                            </p>
                                          </div>
                                          <p>
                                            <span className="text-xs font-medium text-red-600">
                                              Del : {val.DeliveryDate}
                                            </span>
                                            <span className="text-xs font-medium text-green-800 pl-2">
                                              ETA : {val.ETADate}
                                            </span>
                                          </p>
                                          <p className="text-xs font-semibold text-stone-700">
                                            {val.RequestDetailsDesc}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="w-full pt-1 flex flex-col gap-1 ">
                                        <p className="text-xs font-medium text-stone-600 pl-1">
                                          {val.ContractName}
                                        </p>
                                        <div className="flex items-center gap-2 pl-1">
                                          {val.MainComplaintNo && (
                                            <p className="text-xs font-medium text-pink-600 bg-pink-200 py-0.5 px-2 rounded">
                                              {val.MainComplaintNo}
                                            </p>
                                          )}
                                          <p className="text-xs font-medium text-orange-600 bg-orange-200 py-0.5 px-3 rounded">
                                            {val.CCmWoTypeName}
                                          </p>
                                          <p className="text-xs font-medium text-purple-600 bg-purple-200 py-0.5 px-4 rounded">
                                            {val.Projects}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
