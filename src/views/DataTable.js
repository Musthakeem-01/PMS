import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, useCallback, useRef } from "react";
import getData from "../components/customcomponents/commonAPISelect";
import { getCurrentWeekDate } from "../components/function/getCurrentWeekDate";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { FaPlay, FaPause, FaTimes } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import DataList from "../components/Grid/DataList";
import InfoIcon from "@mui/icons-material/Info";
import ManIcon from "@mui/icons-material/Man";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Button from "@mui/material/Button";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import showNotification from "../components/customcomponents/notificationUtils";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TiAttachmentOutline } from "react-icons/ti";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const sectionStyle = {
  width: "60%",
  padding: "10px",
  boxSizing: "border-box",
  overflowY: "auto",
  height: "70vh",
};

const sectionStyle1 = {
  width: "60%",
  boxSizing: "border-box",
};
const sectionStyle2 = {
  width: "40%",
  padding: "5px",
  boxSizing: "border-box",
};

const sectionContainer = {
  display: "flex",
  gap: "20px",
  height: "70vh",
  overflowY: "auto",
};

export default function DataTable(props) {
  const [response, setResponse] = useState([]);
  const { weekNumber, year } = getCurrentWeekDate();
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [showDiv, setShowDiv] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [comment, setComment] = useState("");
  const [showdept, setshowdept] = useState(false);
  const [startDate, setStartDate] = useState("");
  // console.log("🚀 ~ DataTable ~ startDate:", startDate);
  const [toDay, setToday] = useState([]);
  // console.log("🚀 ~ DataTable ~ toDay:", toDay);
  const [endDate, setEndDate] = useState("");
  const [endDateBe, setEndDateBe] = useState([]);
  // console.log("🚀 ~ DataTable ~ endDateBe:", endDateBe);
  const [complaintIDPK, setComplaintIDPK] = useState([]);
  // console.log("🚀 ~ DataTable ~ complaintIDPK:", complaintIDPK);
  const [cardHTML, setCardHTML] = useState([]);
  const [emp, setemp] = useState([]);
  // console.log("🚀 ~ DataTable ~ emp:", emp);
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedInputValue, setselectedInputValue] = useState([]);
  // console.log("🚀 ~ DataTable ~ selectedInputValue:", selectedInputValue);
  const [createTaskkey, setCreateTaskkey] = useState([]);
  // console.log("🚀 ~ DataTable ~ createTaskkey:", createTaskkey);
  const [taskStatuses, setTaskStatuses] = useState({});
  const [modalVisibility, setModalVisibility] = useState(false);
  const [closed, setClosed] = useState(null);
  const [checkPoint, setCheckPoint] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  // console.log("🚀 ~ DataTable ~ activeTask:", activeTask);
  const [checkpointsName, setCheckpointsName] = useState("");
  // console.log("🚀 ~ DataTable ~ checkpointsName:", checkpointsName);
  const [checkpointType, setCheckpointType] = useState("");
  const [checkpointDes, setCheckpointDes] = useState([]);
  // console.log("🚀 ~ DataTable ~ checkpointDes:", checkpointDes);
  const [checkPointIdpk, setCheckPointIdpk] = useState([]);
  const containerRef = useRef(null);
  // console.log("🚀 ~ DataTable ~ checkPintIdpk:", checkPointIdpk);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const HeaderGrid = [
    {
      field: "Projects",
      headerName: "Projects-Name",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.value}
          {activeTask === params.row.ComplaintIDPK ? (
            <ManIcon style={{ marginLeft: 8, color: "green" }} />
          ) : (
            <InfoIcon style={{ marginLeft: 8 }} />
          )}
        </div>
      ),
    },
    { field: "ComplaintNo", headerName: "ComplaintNo", width: 100 },
    {
      field: "RequestDetailsDesc",
      headerName: "Summary",
      width: 400,
    },
    {
      field: "taskActions",
      headerName: "Task Actions",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Button
            onClick={() => {
              setResponse(
                response.map((item) => {
                  return {
                    ...item,
                    status:
                      item.ComplaintIDPK == activeTask ? "Active" : "Inactive",
                  };
                })
              );
              // fetchData();
              // refresh();
              if (activeTask === params.row.ComplaintIDPK) {
                handlePauseTask(params.row.ComplaintIDPK);
              } else {
                handleStartTask(params.row.ComplaintIDPK);
              }
            }}
            disabled={
              closedTaskIds.has(params.row.ComplaintIDPK) ||
              (activeTask !== null && activeTask !== params.row.ComplaintIDPK)
            }
          >
            {activeTask === params.row.ComplaintIDPK ? "Pause" : "Start"}
          </Button>

          {activeTask === params.row.ComplaintIDPK ? (
            <PauseIcon />
          ) : (
            <PlayArrowIcon />
          )}
        </div>
      ),
    },
    {
      field: "Status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => getIconForTask(params.row),
    },
    {
      field: "closeActions",
      headerName: "Close Actions",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Button
            onClick={() => {
              if (activeTask === params.row.ComplaintIDPK) {
                handleCloseTask(params.row.ComplaintIDPK);
              } else {
                handleCloseTask(params.row.ComplaintIDPK);
              }
            }}
            disabled={
              closedTaskIds.has(params.row.ComplaintIDPK) ||
              (activeTask !== null &&
                activeTask !== params.row.ComplaintIDPK) ||
              (!activeTask ? true : false)
            }
          >
            {"Close"}
          </Button>
        </div>
      ),
    },
    { field: "ETADate", headerName: "ETADate", width: 150 },
    { field: "ETATime", headerName: "ETATime", width: 150 },
    { field: "ComplainerName", headerName: "ComplainerName", width: 150 },
    { field: "PriorityName", headerName: "Priority", width: 150 },
    { field: "CCMProTypeName", headerName: "Module", width: 100 },
    { field: "CCmWoTypeName", headerName: "Dept", width: 100 },
  ];

  // const allTaskIds = response.map((task) => task.ComplaintIDPK);
  //const closedTaskIds = new Set(closed.map((task) => task.ComplaintIDPK));
  const closedTaskIds = new Set(
    (closed || []).map((task) => task.ComplaintIDPK)
  );

  const getIconForTask = (task) => {
    if (closedTaskIds.has(task.ComplaintIDPK)) {
      return <DisabledByDefaultIcon style={{ color: "red" }} />;
    } else {
      return <LockOpenIcon style={{ color: "green" }} />;
    }
  };
  useEffect(() => {
    if (response.length === 0) {
      fetchData();
    }
  }, [props.id]);
  const refresh = () => {
    fetchData();
  };
  const fetchData = async () => {
    try {
      const result = await getData("DashboardService/VwAPINSEIPLDetailsNew/", {
        data: {
          p1_int: 7,
          p2_int: weekNumber,
          p3_int: year,
          p4_int: null,
          p5_int: null,
          p6_int: localStorage.getItem("eid"),
          P7_int: props.id,
          P9_varchar: null,
          P10_varchar: "",
          UserID_int: 0,
        },
      });
      const {
        Output: { status, data },
      } = result;
      if (status.code === "200") {
        setResponse(data);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    try {
      const result = await getData("DashboardService/VwAPINSEIPLDetailsNew/", {
        data: {
          p1_int: 7,
          p2_int: weekNumber,
          p3_int: year,
          p4_int: null,
          p5_int: null,
          p6_int: localStorage.getItem("eid"),
          P7_int: props.id,
          P9_varchar: null,
          P10_varchar: "Closed",
          UserID_int: 0,
        },
      });
      const {
        Output: { status, data },
      } = result;
      if (status.code === "200") {
        setClosed(data);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const handleStartTask = useCallback(async (taskId) => {
    setActiveTask(taskId);

    const date = new Date();
    const currentDateTime = formatDate(date);

    try {
      const response = await getData("DashboardService/VwAPINSEIPLDetails/", {
        data: {
          p1_int: 83,
          p2_int: taskId,
          p3_int: localStorage.getItem("eid"),
          p4_int: 0,
          p5_int: 0,
          p6_int: 0,
          P7_date: currentDateTime,
          P8_date: null,
        },
      });

      const data = response?.Output?.data;
      if (data?.length > 0) {
        const message = data[0]?.Message;
        if (message) {
          // window.alert( message );
          showNotification("Success", message, "success");
          setTaskStatuses((prevStatuses) => ({
            ...prevStatuses,
            [complaintIDPK]: "Work Start successfully",
          }));
        } else {
          showNotification("Alert", "Unexpected response format", "info");
          // window.alert("Unexpected response format");
        }
      } else {
        showNotification("Alert", "Unable to Start Task", "info");
        // window.alert("Unable to Start Task");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // window.alert( "An error occurred while starting the task." );
      showNotification(
        "Alert",
        "An error occurred while starting the task",
        "info"
      );
    }
    handleClose();
  }, []);
  useEffect(() => {
    {
      try {
        const response = getData("DashboardService/VwAPINSEIPLDetails/", {
          data: {
            p1_int: 97,
            p2_int: localStorage.getItem("eid"),
            UserID_int: 0,
          },
        }).then((res) => {
          if (res.Output.status.code === "200") {
            setActiveTask(
              res.Output.data.length > 0
                ? res.Output.data[0].ComplaintIDPK
                : null
            );
          } else {
            console.log("1console");
            console.error("Error fetching data:", res.Output.status.message);
          }
        });
        // const {
        //   Output: { status, data },
        // } = response;
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
  }, []);

  const handleFinalCloseTask = async (id) => {
    const response = await getData("DashboardService/VwAPINSEIPLDetails/", {
      data: {
        p1_int: 118,
        p2_int: id,
        p3_int: localStorage.getItem("eid"),
        p4_int: 0,
        p5_int: 0,
        p6_int: 0,
        P7_date: null,
        P8_date: null,
      },
    });

    const {
      Output: {
        status: { code },
        data,
      },
    } = response;

    function getCurrentDateAndTime() {
      const date = new Date();
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    function getMinuteDifference(startDate, endDate) {
      const parseDate = (dateString) => {
        const [day, month, year, hours, minutes] = dateString
          .match(/\d+/g)
          .map(Number);
        return new Date(year, month - 1, day, hours, minutes);
      };

      const startDateTime = parseDate(startDate);
      const endDateTime = parseDate(endDate);

      const timeDifference = endDateTime - startDateTime;
      const minuteDifference = Math.floor(timeDifference / (1000 * 60));

      return minuteDifference;
    }
    function formatDateTime12(dateString) {
      const [day, month, year, hours, minutes] = dateString
        .match(/\d+/g)
        .map(Number);
      const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes} ${
        hours >= 12 ? "PM" : "AM"
      }`;
      return formattedDateTime;
    }

    async function getStartDate(complaintIDPK) {
      const params = {
        data: {
          p1_int: 85,
          p2_int: complaintIDPK,
          p3_int: localStorage.getItem("eid"),
          p4_int: 0,
          p5_int: 0,
          p6_int: 0,
          P7_date: null,
          P8_date: null,
        },
      };
      const response = await getData(
        "DashboardService/VwAPINSEIPLDetails/",
        params
      );
      const {
        Output: {
          status: { code },
          data,
        },
      } = response;
      return data[0]["StartDate"] || null;
    }

    const { ChekStatus, Message } = data[0];
    if (ChekStatus == 0) {
      // window.alert( Message );
      showNotification("Alert", Message, "info");
      return false;
    }
    const closeRemarks = document.getElementById("closeRemarks").value;
    //  else if (closeRemarks.length > 0) {
    //   window.alert("please Update CheckPoints");
    //   return false;
    // }
    //     if (!closeRemarks) {
    //   window.alert("please Update CheckPoints");
    //   return false;
    // } else
    if (!closeRemarks) {
      showNotification("Alert", "Please enter Remarks", "info");
      // window.alert("Please enter Remarks");
      return false;
    }

    const isConfirmed = window.confirm("Are you sure to close this task?");
    if (isConfirmed) {
      let currentDateTime = getCurrentDateAndTime();
      let startDate = await getStartDate(id);

      if (!startDate) {
        // window.alert( "Kindly Start this Task" );
        showNotification("Alert", "Kindly Start this Task", "info");
        return false;
      }

      const diff = getMinuteDifference(startDate, currentDateTime);
      startDate = formatDateTime12(startDate); // Format for CCMStartTime
      currentDateTime = formatDateTime12(currentDateTime); // Format for CCMEndTime

      const eid = localStorage.getItem("eid");
      const url1 = `https://smartfm.in/NSEIPLSERVICE/SupportAnalysis.php?CCMEmployeeIDPK=${eid}&EmployeeID=${eid}&CCMComplaintID=${id}&OberVation=${closeRemarks}&Rootcause=`;
      const url2 = `https://smartfm.in/NSEIPLSERVICE/SupportAnalysisUpdate.php?CCMComplaintID=${id}&CCMStartTime=${startDate}&CCMEndTime=${currentDateTime}&OberVation=${closeRemarks}&Rootcause=&EmployeeID=${eid}&ResolutionTime=${diff}&MaintenanceHrs=${diff}&TotalMin=${diff}&CorrectiveAction=&ServiceCarriedOut=&Type=AnalizeCloseYes&ExecEmpID=`;
      const urls = [url1, url2];

      Promise.all(urls.map((url) => fetch(url)))
        .then((responses) =>
          Promise.all(responses.map((response) => response.json()))
        )
        .then((data) => {
          // Handle the array of data from both URLs
          console.log(data);
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error fetching data:", error);
        });

      // window.alert( "Task Closed Successfully" );
      showNotification("success", "Task Closed Successfully", "success");
      fetchData();
      handleClose();
    }
  };

  const handleCloseTask = (taskid) => {
    // console.log(taskid, "taskid");
    checkpointsSelect(taskid);
    setCheckpointsName("");
  };
  const checkpointsSelect = (taskid) => {
    getData("DashboardService/VwAPINSEIPLDetails/", {
      data: {
        p1_int: 100,
        p2_int: taskid,
        p3_int: 0,
        p4_int: 0,
        p5_int: 0,
        p6_int: 0,
        P7_date: null,
        P8_date: null,
      },
    }).then((res) => {
      setCheckpointDes(res.Output.data);
      setCheckPointIdpk(res.Output.data.map((item) => item.CMCheckPointsIDPK));
    });
  };

  const handlePauseTask = (taskId) => {
    const isConfirmed = window.confirm(
      "Are you certain you would like to temporarily pause this task?"
    );

    if (isConfirmed) {
      if (taskId === activeTask) {
        setActiveTask(null);
      }

      const date = new Date();
      const currentDateTime = formatDate(date);

      const url = `https://smartfm.in/NSEIPLSERVICE/HoldETA.php?ComplaintType=11&MaintenanceRemarks=${localStorage.getItem(
        "eid"
      )}&ETADate=${currentDateTime}&ComplaintIDPK=${taskId}&ProDate=null&TypeID=0&TypeProID=0`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          // window.alert( "Task paused successfully:", data );
          showNotification(
            "Success",
            "Task paused successfully",
            "success",
            data
          );
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
    handleClose();
    fetchData();
  };

  const BodyContent = response
    ? response.map((item, index) => ({
        id: index,
        Projects: props.desc || "",
        ComplaintNo: item?.ComplaintNo || "",
        RequestDetailsDesc: item?.RequestDetailsDesc || "",
        ETADate: item?.ETADate || "",
        ETATime: item?.ETATime || "",
        ComplainerName: item?.ComplainerName || "",
        PriorityName: item?.PriorityName || "",
        CCMProTypeName: item?.CCMProTypeName || "",
        CCmWoTypeName: item?.CCmWoTypeName || "",
        ComplaintIDPK: item?.ComplaintIDPK || "",
      }))
    : [];

  const handleRowClick = async (params) => {
    if (!params || !params.row) {
      console.error("Invalid parameters:", params);
      return;
    }

    setSelectedRow(params.row);
    setComplaintIDPK(params.row.ComplaintIDPK);
    handleOpen();

    try {
      // Fetch data using getData for DashboardService/VwAPINSEIPLDetails
      const response1 = await getData("DashboardService/VwAPINSEIPLDetails/", {
        data: {
          p1_int: 91,
          p2_int: localStorage.getItem("eid"),
          p3_int: 0,
          p4_int: 0,
          p5_int: 0,
          p6_int: 0,
          P7_date: null,
          P8_date: null,
        },
      });

      const {
        Output: { status, data },
      } = response1;

      if (status.code === "200" && data.length > 0) {
        setCardHTML(data);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error in handleSchedule:", error);
      // Handle error as needed
    }

    try {
      // Fetch data using getData for DashboardService/VwAPINSEIPLALL
      const response2 = await getData("DashboardService/VwAPINSEIPLALL/", {
        data: {
          QryType_int: 21,
        },
      });

      const {
        Output: { status, data },
      } = response2;

      if (status.code === "200") {
        setemp(data);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }

    // Call checkpointsSelect with ComplaintIDPK if it exists
    if (params.row.ComplaintIDPK) {
      checkpointsSelect(params.row.ComplaintIDPK);
    } else {
      console.warn("No ComplaintIDPK found in params.row:", params.row);
    }
  };

  const handleCellClick = (params) => {
    const clickedField = params.field;
    // console.log("🚀 ~ handleCellClick ~ clickedField:", clickedField);

    if (
      clickedField === "Projects" ||
      clickedField === "RequestDetailsDesc" ||
      clickedField === "closeActions"
    ) {
      //|| clickedField === "ComplaintNo"
      setModalVisibility(true);
    } else {
      setModalVisibility(false);
    }
    if (clickedField === "closeActions") {
      setCheckPoint(true);
    } else {
      setCheckPoint(false);
    }
    const date = new Date();
    let currentDate = startDate ? startDate : formatDate(date);

    let currentEnd = endDate ? endDate : formatDate(date, 1);

    setToday(currentDate);
    setEndDateBe(currentEnd);
  };

  const inputSelected = (inputValue, refname, refid) => {
    console.log(inputValue, refname, refid, "inputValue, refname, refid");
    setselectedInputValue((prevCreateTaskkey) => ({
      ...prevCreateTaskkey,
      [refname]: inputValue,
    }));
  };
  const getKey = (key) => {
    let keys = key;
    for (let k in keys) {
      setCreateTaskkey((prevCreateTaskkey) => ({
        ...prevCreateTaskkey,
        [k]: keys[k],
      }));
    }
  };
  const handleShowDiv = () => {
    // if (showDiv) {
    //   setShowDiv(false);
    // } else {
    //   setShowDiv(true);
    // }
    setShowDiv(!showDiv);
  };

  const handleClickOutside = (event) => {
    // console.log("🚀 ~ handleClickOutside ~ event:", event);
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowDiv(false);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleshowdept = () => {
    setshowdept(!showdept);
  };
  const handleComments = (comment) => {
    setComment(comment.target.value);
  };
  const formatDate = (date, EndDates) => {
    let hoursAddon = EndDates ? EndDates : 0;
    // console.log(date, "date");
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours() + hoursAddon).padStart(2, "0");
    // console.log("🚀 ~ formatDate ~ hours:", hours);
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const handleSchedule = async (activeTaskId) => {
    let from = startDate ? startDate : toDay;
    let to = endDate ? endDate : endDateBe;
    let fromDate = new Date(from);
    let toDate = new Date(to);
    let timeDifferenceInMinutes = Math.abs((toDate - fromDate) / (1000 * 60));
    // console.log(timeDifferenceInMinutes, "timeDifferenceInMinutes");
    const FromformattedDate = formatDate(fromDate); // Assuming formatDate is defined elsewhere
    const ToformattedDate = formatDate(toDate); // Assuming formatDate is defined elsewhere

    let urls = [
      `https://smartfm.in/NSEIPLSERVICE/SupportAnalysisUpdate.php?CCMComplaintID=${activeTaskId}&CCMStartTime=${FromformattedDate}&CCMEndTime=${ToformattedDate}&OberVation=&Rootcause=&EmployeeID=${localStorage.getItem(
        "eid"
      )}&ResolutionTime=&MaintenanceHrs=&CorrectiveAction=&ServiceCarriedOut=&ExecEmpID=&TotalMin=${timeDifferenceInMinutes}&Type=EmpWorkAssign`,
      `https://smartfm.in/NSEIPLSERVICE/SupportAnalysisUpdate.php?CCMComplaintID=${localStorage.getItem(
        "eid"
      )}&CCMStartTime=${FromformattedDate}&CCMEndTime=${ToformattedDate}&TotalMin=${timeDifferenceInMinutes}`,
      `https://smartfm.in/NSEIPLSERVICE/HoldETA.php?ComplaintType=9&MaintenanceRemarks=${timeDifferenceInMinutes}&ETADate=null&ComplaintIDPK=${activeTaskId}&ProDate=null&TypeID=0&TypeProID=0`,
    ];

    try {
      const fetchResponses = await Promise.all(
        urls.map((url) => fetch(url))
      ).then((response) => {
        if (response[0].status == 200) {
          // window.alert( "Task Scheduled Successfully" );
          showNotification("Success", "Task Scheduled Successfully", "success");
        }
        // setStartDate("");
        // setEndDate("");
        handleRowClick(complaintIDPK);

        // console.log(response, "rese");
      });
      // console.log("🚀 ~ handleSchedule ~ fetchResponses:", fetchResponses);

      // Assuming getData returns a Promise or can be awaited

      const response = await getData("DashboardService/VwAPINSEIPLDetails/", {
        data: {
          p1_int: 91,
          p2_int: localStorage.getItem("eid"),
          p3_int: 0,
          p4_int: 0,
          p5_int: 0,
          p6_int: 0,
          P7_date: null,
          P8_date: null,
        },
      });
      const {
        Output: {
          status: { code },
          data,
        },
      } = response;

      if (data.length > 0) {
        setCardHTML(data);
      }
    } catch (error) {
      console.error("Error in handleSchedule:", error);
      // Handle error as needed
    }
  };

  async function ScheduleB4startWorkTask(urls, final) {
    try {
      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const results = await Promise.all(
        responses.map(async (response, index) => {
          if (!response.ok) {
            throw new Error(
              `HTTP error for URL ${urls[index]}! Status: ${response.status}`
            );
          }
          return await response.text();
        })
      );
      const [result1, result2, wotypedata] = results;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      if (final && final == "scheduleRefresh") {
        // alert( "Task Scheduled Successfully" );
        showNotification("Success", "Task Scheduled Successfully", "success");
        // showAlert(1,"Task Scheduled Successfully")
        document.getElementById("scheduleList").innerHTML = getScheduledList();
      }
      if (final && final == "sprintChanged") {
        // useEffect();
      }
    }
  }
  const getScheduledList = () => {};
  const handleAddButtonClick = (params) => {
    console.log("🚀 ~ handleAddButtonClick ~ params:", params);
    // let checkpointsName = document.getElementById("CheckpointsName");
    // let checkpointType = document.getElementById("checkpointType").value;
    // console.log("🚀 ~ handleAddButtonClick ~ checkpointType:", checkpointType);
    if (checkpointsName.length > 0) {
      let url = `https://smartfm.in/NSEIPLSERVICE/SupportAnalysisUpdate.php?CCMComplaintID=${params}&OberVation=${checkpointsName}&EmployeeID=${localStorage.getItem(
        "eid"
      )}&ResolutionTime=0&MaintenanceHrs=0&TotalMin=0&CorrectiveAction=${checkpointType}&Type=ChkInsert&ExecEmpID=0`;
      const ress = fetch(url);
      checkpointsSelect(params);
    } else {
      showNotification("Alert", "Enter checkpoints", "info");
      // window.alert("Enter checkpoints");
    }
    setCheckpointsName("");
  };

  const handleFocus = () => {
    setIsListVisible(!isListVisible);
  };
  const handleStartDateChange = (date) => {
    console.log(date, "date");
    setStartDate(new Date(date));
    let currentDate = startDate ? startDate : formatDate(date);
    setToday(currentDate);
  };
  const handleEndDateChange = (date) => {
    setEndDate(new Date(date));
    let currentEnd = endDate ? endDate : formatDate(date, 1);
    setEndDateBe(currentEnd);
  };
  const handleassign = () => {
    // console.log("selectedInputValue:", selectedInputValue); // For debugging

    if (selectedInputValue && selectedInputValue.EmpName.length == 0) {
      showNotification("Error", "Please Select the Employee", "info");
      return false;
    }

    const url = "https://smartfm.in/NSEIPLSERVICE/SupportStaffAssign.php";

    const data = new URLSearchParams();
    data.append("EmployeeID", createTaskkey.NSEEMPID);
    data.append("CCMComplaintID", complaintIDPK);
    data.append("DivisionExe", "DivisionExe");

    const requestOptions = {
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        showNotification("Success", "Task Assigned Successfully", "success");
        return response.text();
      })
      .then((data) => {
        console.log("Response data:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    handleClose();
  };
  const handleTransfer = async () => {
    let transferRemarks = document.getElementById(
      "TransferTaskReason_id"
    ).value;

    if (!transferRemarks) {
      showNotification("Alert", "Kindly Enter the Transfer Reason", "info");
      return false;
    }
    const response = await getData("DashboardService/VwAPINSEIPLDetailsNew/", {
      data: {
        p1_int: 65,
        p2_int: complaintIDPK,
        P9_varchar: transferRemarks,
      },
    });

    const result = response.Output.data;
    // console.log("🚀 ~ handleTransfer ~ result:", result);

    ScheduleB4startWorkTask(response);

    showNotification(
      "success",
      "Transfer Done for Next Week Successfully",
      "info"
    );

    document.getElementById("TransferTaskReason_id").value = "";

    handleClose();
  };
  const handleChangeCheckpoints = (event, idpk, status) => {
    console.log(
      "🚀 ~ handleChangeCheckpoints ~ event, idpk, status:",
      event,
      idpk,
      status
    );
    let key = event.target.value;
    if (key && idpk && status) {
      let url = `https://smartfm.in/NSEIPLSERVICE/SupportAnalysisUpdate.php?CCMComplaintID=${key}&ServiceCarriedOut=${status}&Type=CHKSINGLEUPDATE&ExecEmpID=${idpk}`;
      const res = fetch(url);
      // handleFinalCloseTask(complaintIDPK);
    } else {
      // window.alert( "invalid input" );
      showNotification("Alert", "invalid input", "info");
    }
  };
  const handleAttachmentsClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={BodyContent}
          columns={HeaderGrid}
          className="bg-white hover:bg-gray-100 cursor-pointer"
          onRowClick={handleRowClick}
          onCellClick={handleCellClick}
        />
      </div>
      <div>
        {modalVisibility && (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            disableEnforceFocus
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <div className="relative">
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {selectedRow?.Projects || ""}
                  </Typography>
                </div>
                <IoClose
                  className="absolute top-0 right-0 text-4xl cursor-pointer"
                  onClick={handleClose}
                />
                {selectedRow?.RequestDetailsDesc || "No Data"}
                <div>
                  <div className="flex justify-end">
                    <h2
                      className="border border-black p-2 flex cursor-pointer rounded"
                      onClick={handleAttachmentsClick}
                    >
                      <TiAttachmentOutline className="mt-1" />
                      Attachments
                    </h2>
                  </div>

                  {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                      <div
                        ref={containerRef}
                        className="bg-white p-6 relative rounded shadow-lg h-[90vh] w-[75%]"
                      >
                        <IoClose
                          className="absolute top-0 right-0   text-4xl cursor-pointer"
                          onClick={closeModal}
                        />
                        <h3 className="text-lg font-bold mb-4">Attachments</h3>
                        <p>No attachment found</p>
                      </div>
                    </div>
                  )}
                </div>
                <Box
                  sx={sectionContainer}
                  className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
                >
                  <Box sx={sectionStyle1}>
                    <div className="w-full flex space-x-4">
                      <div className="flex-grow">
                        <textarea
                          rows="1"
                          id="CheckpointsName"
                          className="block w-full h-[13vh] py-2 px-3 text-sm text-gray-800 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600 resize-none"
                          placeholder="Enter New Checkpoints here..."
                          value={checkpointsName}
                          onChange={(e) => setCheckpointsName(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          id="checkpointType"
                          className="py-2 px-3 text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                          value={checkpointType}
                          onChange={(e) => setCheckpointType(e.target.value)}
                        >
                          <option value="1">BA</option>
                          <option value="2">DB</option>
                          <option value="3">DEV</option>
                          <option value="4">QA</option>
                          <option value="5">IMP</option>
                          <option value="6">DEP</option>
                        </select>
                        <button
                          onClick={() => handleAddButtonClick(complaintIDPK)}
                          className="py-2 px-4 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 custom-scrollbar overflow-auto  borderborder-gray-100	h-[40vh]">
                      {checkpointDes.length > 0
                        ? checkpointDes.map((des) => {
                            return (
                              <table
                                id=""
                                className="relative tracking-wider w-full border text-left text-xs text-slate-500"
                              >
                                <thead className="text-xs text-green-600 uppercase">
                                  <tr>
                                    <th className="sticky top-0 py-2 px-2 bg-gray-200">
                                      Checkpoint Description
                                    </th>
                                    <th className="sticky top-0 py-2 px-2 bg-gray-200">
                                      BA
                                    </th>
                                    <th className="sticky top-0 py-2 px-2 bg-gray-200">
                                      DB
                                    </th>
                                    <th className="sticky top-0 py-2 px-2 bg-gray-200">
                                      DEV
                                    </th>
                                    <th className="sticky top-0 py-2 px-2 bg-gray-200">
                                      QA
                                    </th>
                                    <th className="sticky top-0 py-2 px-2 bg-gray-200">
                                      IMP
                                    </th>
                                    <th className="sticky top-0 py-2 px-2 bg-gray-200">
                                      DEP
                                    </th>
                                  </tr>
                                </thead>
                                <tbody
                                  id="checkpointsTable"
                                  className="divide-y bg-blue-50 text-slate-800 "
                                >
                                  <tr
                                    className="bg-white border-b hover:bg-blue-100 hover:text-blue-600 cursor-pointer false"
                                    data-idpk="6123"
                                  >
                                    <td className="py-1 px-2">
                                      <textarea
                                        className="custom-scrollbar h-full overflow-auto border-none w-full text-gray-700 p-1 pr-4 rounded-md focus:outline-none focus:bg-amber-100"
                                        rows="4"
                                        onChange={(e) =>
                                          handleChangeCheckpoints(
                                            e,
                                            6123,
                                            "CMChkName"
                                          )
                                        }
                                        value={des?.CMChkName || ""}
                                      />
                                    </td>

                                    <td className="py-1 px-2 w-20">
                                      <div className="relative">
                                        <select
                                          className="dropdown appearance-none bg-transparent border-none w-full text-gray-700 p-1 pr-4 rounded-md focus:outline-none"
                                          onChange={(e) =>
                                            handleChangeCheckpoints(
                                              e,
                                              des.CMCheckPointsIDPK,
                                              "BAStatus"
                                            )
                                          }
                                          disabled={!activeTask ? true : false}
                                        >
                                          <option
                                            className="text-gray-600"
                                            value="1"
                                            selected={
                                              des.BAStatus === "1"
                                                ? true
                                                : false
                                            }
                                          >
                                            NYT
                                          </option>
                                          <option
                                            className="text-green-600"
                                            value="2"
                                            selected={
                                              des.BAStatus === "2"
                                                ? true
                                                : false
                                            }
                                          >
                                            Pass
                                          </option>
                                          <option
                                            className="text-red-600"
                                            value="3"
                                            selected={
                                              des.BAStatus === "3"
                                                ? true
                                                : false
                                            }
                                          >
                                            Fail
                                          </option>
                                          <option
                                            className="text-amber-600"
                                            value="4"
                                            selected={
                                              des.BAStatus === "4"
                                                ? true
                                                : false
                                            }
                                          >
                                            OnHold
                                          </option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                                          <svg
                                            className="w-4 h-4 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M5 7l5 5 5-5z"></path>
                                          </svg>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-1 px-2 w-20">
                                      <div className="relative">
                                        <select
                                          className="dropdown appearance-none bg-transparent border-none w-full text-gray-700 p-1 pr-4 rounded-md focus:outline-none"
                                          onChange={(e) =>
                                            handleChangeCheckpoints(
                                              e,
                                              des.CMCheckPointsIDPK,
                                              "DBStatus"
                                            )
                                          }
                                          disabled={!activeTask ? true : false}
                                        >
                                          <option
                                            className="text-gray-600"
                                            value="1"
                                            selected={
                                              des.DBStatus === "1"
                                                ? true
                                                : false
                                            }
                                          >
                                            NYT
                                          </option>
                                          <option
                                            className="text-green-600"
                                            value="2"
                                            selected={
                                              des.DBStatus === "2"
                                                ? true
                                                : false
                                            }
                                          >
                                            Pass
                                          </option>
                                          <option
                                            className="text-red-600"
                                            value="3"
                                            selected={
                                              des.DBStatus === "3"
                                                ? true
                                                : false
                                            }
                                          >
                                            Fail
                                          </option>
                                          <option
                                            className="text-amber-600"
                                            value="4"
                                            selected={
                                              des.DBStatus === "4"
                                                ? true
                                                : false
                                            }
                                          >
                                            OnHold
                                          </option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                                          <svg
                                            className="w-4 h-4 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M5 7l5 5 5-5z"></path>
                                          </svg>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-1 px-2 w-20">
                                      <div className="relative">
                                        <select
                                          className="dropdown appearance-none bg-transparent border-none w-full text-gray-700 p-1 pr-4 rounded-md focus:outline-none"
                                          onChange={(e) =>
                                            handleChangeCheckpoints(
                                              e,
                                              des.CMCheckPointsIDPK,
                                              "DevStatus"
                                            )
                                          }
                                          disabled={!activeTask ? true : false}
                                        >
                                          <option
                                            className="text-gray-600"
                                            value="1"
                                            selected={
                                              des.DevStatus === "1"
                                                ? true
                                                : false
                                            }
                                          >
                                            NYT
                                          </option>
                                          <option
                                            className="text-green-600"
                                            value="2"
                                            selected={
                                              des.DevStatus === "2"
                                                ? true
                                                : false
                                            }
                                          >
                                            Pass
                                          </option>
                                          <option
                                            className="text-red-600"
                                            value="3"
                                            selected={
                                              des.DevStatus === "3"
                                                ? true
                                                : false
                                            }
                                          >
                                            Fail
                                          </option>
                                          <option
                                            className="text-amber-600"
                                            value="4"
                                            selected={
                                              des.DevStatus === "4"
                                                ? true
                                                : false
                                            }
                                          >
                                            OnHold
                                          </option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                                          <svg
                                            className="w-4 h-4 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M5 7l5 5 5-5z"></path>
                                          </svg>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-1 px-2 w-20">
                                      <div className="relative">
                                        <select
                                          className="dropdown appearance-none bg-transparent border-none w-full text-gray-700 p-1 pr-4 rounded-md focus:outline-none"
                                          onChange={(e) =>
                                            handleChangeCheckpoints(
                                              e,
                                              des.CMCheckPointsIDPK,
                                              "QAStatus"
                                            )
                                          }
                                          disabled={!activeTask ? true : false}
                                        >
                                          <option
                                            className="text-gray-600"
                                            value="1"
                                            selected={
                                              des.QAStatus === "1"
                                                ? true
                                                : false
                                            }
                                          >
                                            NYT
                                          </option>
                                          <option
                                            className="text-green-600"
                                            value="2"
                                            selected={
                                              des.QAStatus === "2"
                                                ? true
                                                : false
                                            }
                                          >
                                            Pass
                                          </option>
                                          <option
                                            className="text-red-600"
                                            value="3"
                                            selected={
                                              des.QAStatus === "3"
                                                ? true
                                                : false
                                            }
                                          >
                                            Fail
                                          </option>
                                          <option
                                            className="text-amber-600"
                                            value="4"
                                            selected={
                                              des.QAStatus === "4"
                                                ? true
                                                : false
                                            }
                                          >
                                            OnHold
                                          </option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                                          <svg
                                            className="w-4 h-4 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M5 7l5 5 5-5z"></path>
                                          </svg>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-1 px-2 w-20">
                                      <div className="relative">
                                        <select
                                          className="dropdown appearance-none bg-transparent border-none w-full text-gray-700 p-1 pr-4 rounded-md focus:outline-none"
                                          onChange={(e) =>
                                            handleChangeCheckpoints(
                                              e,
                                              des.CMCheckPointsIDPK,
                                              "ImpStatus"
                                            )
                                          }
                                          disabled={!activeTask ? true : false}
                                        >
                                          <option
                                            className="text-gray-600"
                                            value="1"
                                            selected={
                                              des.QAStatus === "1"
                                                ? true
                                                : false
                                            }
                                          >
                                            NYT
                                          </option>
                                          <option
                                            className="text-green-600"
                                            value="2"
                                            selected={
                                              des.QAStatus === "2"
                                                ? true
                                                : false
                                            }
                                          >
                                            Pass
                                          </option>
                                          <option
                                            className="text-red-600"
                                            value="3"
                                            selected={
                                              des.QAStatus === "3"
                                                ? true
                                                : false
                                            }
                                          >
                                            Fail
                                          </option>
                                          <option
                                            className="text-amber-600"
                                            value="4"
                                            selected={
                                              des.QAStatus === "4"
                                                ? true
                                                : false
                                            }
                                          >
                                            OnHold
                                          </option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                                          <svg
                                            className="w-4 h-4 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M5 7l5 5 5-5z"></path>
                                          </svg>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-1 px-2 w-20">
                                      <div className="relative">
                                        <select
                                          className="dropdown appearance-none bg-transparent border-none w-full text-gray-700 p-1 pr-4 rounded-md focus:outline-none"
                                          onChange={(e) =>
                                            handleChangeCheckpoints(
                                              e,
                                              des.CMCheckPointsIDPK,
                                              "DEPStatus"
                                            )
                                          }
                                          disabled={!activeTask ? true : false}
                                        >
                                          <option
                                            className="text-gray-600"
                                            value="1"
                                            selected={
                                              des.DEPStatus === "1"
                                                ? true
                                                : false
                                            }
                                          >
                                            NYT
                                          </option>
                                          <option
                                            className="text-green-600"
                                            value="2"
                                            selected={
                                              des.DEPStatus === "2"
                                                ? true
                                                : false
                                            }
                                          >
                                            Pass
                                          </option>
                                          <option
                                            className="text-red-600"
                                            value="3"
                                            selected={
                                              des.DEPStatus === "3"
                                                ? true
                                                : false
                                            }
                                          >
                                            Fail
                                          </option>
                                          <option
                                            className="text-amber-600"
                                            value="4"
                                            selected={
                                              des.DEPStatus === "4"
                                                ? true
                                                : false
                                            }
                                          >
                                            OnHold
                                          </option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                                          <svg
                                            className="w-4 h-4 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M5 7l5 5 5-5z"></path>
                                          </svg>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            );
                          })
                        : null}
                    </div>
                    <div
                      id="closeTask_div"
                      className="flex mt-3  justify-start space-x-1 "
                    >
                      <input
                        type="text"
                        id="closeRemarks"
                        style={{ width: "30%" }}
                        placeholder="Enter Close Remarks..."
                        className="bg-white border border-gray-300 text-slate-900 text-xs  rounded-lg focus:outline-none focus:ring-blue-600 ring-1 focus:border-blue-500 block  p-2	"
                      />
                      <button
                        onClick={() => {
                          if (activeTask === complaintIDPK) {
                            handleFinalCloseTask(activeTask);
                          }
                        }}
                        type="button"
                        className={`rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700 focus:outline-none text-xs ${
                          closedTaskIds.has(complaintIDPK) ||
                          (activeTask !== null && activeTask !== complaintIDPK)
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={
                          closedTaskIds.has(complaintIDPK) ||
                          (activeTask !== null && activeTask !== complaintIDPK)
                        }
                      >
                        Close Task
                      </button>
                    </div>
                  </Box>
                  <Box sx={sectionStyle2}>
                    <div
                      ref={containerRef}
                      className="max-w-md mx-auto rounded-xl shadow-lg overflow-hidden md:max-w-2xl mb-4 bg-gradient-to-r from-indigo-500 to-pink-500"
                    >
                      <div
                        onClick={handleShowDiv}
                        className="cursor-pointer p-2 flex justify-between items-center bg-[#334ea8] text-[#fde047] hover:bg-opacity-90 transition duration-200"
                      >
                        <h2 className="text-base font-semibold">Summary</h2>
                        {showDiv ? (
                          <IoIosArrowUp
                            size={24}
                            className="transition-transform duration-200 transform rotate-180"
                          />
                        ) : (
                          <IoIosArrowDown
                            size={24}
                            className="transition-transform duration-200"
                          />
                        )}
                      </div>

                      {showDiv && (
                        <div className="p-3 bg-white bg-opacity-30 backdrop-blur-md max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-pink-200">
                          {[
                            {
                              label: "Complainer Name",
                              value: selectedRow?.ComplainerName,
                              icon: (
                                <AiOutlineUser
                                  className="text-yellow-300"
                                  size={20}
                                />
                              ),
                            },
                            {
                              label: "Priority",
                              value: selectedRow?.PriorityName,
                            },
                            {
                              label: "Module",
                              value: selectedRow?.CCMProTypeName,
                            },
                            {
                              label: "Dept",
                              value: selectedRow?.CCmWoTypeName,
                            },
                            {
                              label: "Complaint No",
                              value: selectedRow?.ComplaintNo,
                            },
                            {
                              label: "Summary",
                              value: selectedRow?.RequestDetailsDesc,
                            },
                            { label: "ETA Date", value: selectedRow?.ETADate },
                            { label: "ETA Time", value: selectedRow?.ETATime },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="mb-3 pb-2 border-b border-indigo-200 last:border-b-0"
                            >
                              <div className="text-sm font-medium text-yellow-300">
                                {item.label}
                              </div>
                              <div className="mt-1 text-sm text-white flex items-center">
                                {item.icon && (
                                  <span className="mr-2">{item.icon}</span>
                                )}
                                {item.value || "No Data"}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700">
                          Start
                        </label>
                        <div>
                          <Flatpickr
                            selected={startDate}
                            onChange={handleStartDateChange}
                            value={toDay}
                            showTimeSelect
                            options={{
                              enableTime: true,
                              dateFormat: "Y-m-d H:i",
                              allowInput: true,
                            }}
                            className=" block w-full border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">
                          End
                        </label>
                        <Flatpickr
                          selected={endDate}
                          onChange={handleEndDateChange}
                          value={endDateBe}
                          showTimeSelect
                          options={{
                            enableTime: true,
                            dateFormat: "Y-m-d H:i",
                            allowInput: true,
                          }}
                          className=" block w-full  border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-2	">
                      <button
                        className="bg-amber-500 text-xs text-white px-4 py-1 font-medium rounded-full hover:bg-amber-600"
                        onClick={() => {
                          handleSchedule(complaintIDPK);
                        }}
                      >
                        Schedule
                      </button>
                    </div>
                    <div className="h-[20vh] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 overflow-y-auto  mt-4">
                      <p className=" text-sm font-medium text-gray-700">
                        Work Details
                      </p>
                      <div className="flex flex-col mt-2  ">
                        <div className="flex w-full text-white bg-purple-600 p-1">
                          <p className="text-xs w-1/3">
                            <strong>Work Start Time</strong>
                          </p>
                          <p className="text-xs w-1/3">
                            <strong>Work End Time</strong>
                          </p>
                          <p className="text-xs w-1/3">
                            <strong>Work Total Minutes</strong>
                          </p>
                        </div>
                        {cardHTML.map((e, index) => (
                          <div
                            className="flex flex-col p-1 sm:flex-row"
                            key={index}
                          >
                            <div className="flex w-full text-gray-900">
                              <p className="text-xs w-1/3">{e.WorkStartTime}</p>
                              <p className="text-xs w-1/3">{e.WorkEndTime}</p>
                              <p className="text-xs w-1/3">{e.WorkTotalMin}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4  flex items-end justify-end">
                      <button
                        className={`bg-green-500 text-xs text-white px-4 py-1 font-medium rounded-full hover:bg-green-600 ${
                          closedTaskIds.has(complaintIDPK) ||
                          (activeTask !== null && activeTask !== complaintIDPK)
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={
                          closedTaskIds.has(complaintIDPK) ||
                          (activeTask !== null && activeTask !== complaintIDPK)
                        }
                        onClick={() => {
                          if (activeTask === complaintIDPK) {
                            handlePauseTask(complaintIDPK);
                          } else {
                            handleStartTask(complaintIDPK);
                          }
                        }}
                      >
                        {activeTask === complaintIDPK ? "Pause" : "Start"}
                      </button>
                    </div>
                    <div className="flex items-center mt-4">
                      <label htmlFor="assignee" className="mr-2">
                        Assign To:
                      </label>
                      <div className="relative h-full rounded-md shadow-sm bg-white border-none outline-none">
                        <div className="relative">
                          <DataList
                            inputSelected={inputSelected}
                            options={emp}
                            fieldName={"Employee"}
                            refname={"EmpName"}
                            refid={"NSEEMPID"}
                            getKey={getKey}
                          />
                        </div>
                      </div>

                      <div className="ml-1">
                        <button
                          className="bg-blue-800 text-xs text-white px-4 py-1 font-medium rounded-full hover:bg-blue-600"
                          onClick={handleassign}
                        >
                          Assign
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center mt-4">
                      <label>Transfer </label>
                      <textarea
                        id="TransferTaskReason_id"
                        placeholder="Reason For Transfering the Task"
                        className="custom-scrollbar text-xs  bg-transparent border-2 border-gray-300 h-full overflow-auto  w-full text-gray-800 p-1 pr-4 rounded-md focus:outline-none focus:border-blue-600"
                        rows="2"
                      ></textarea>
                      <div className="flex ">
                        <button
                          className="w-full bg-rose-400 text-white px-4 py-1 font-medium rounded-full hover:bg-rose-300 "
                          onClick={handleTransfer}
                        >
                          Transfer
                        </button>
                      </div>
                    </div>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Modal>
        )}
      </div>
    </>
  );
}
