import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import getData from "../components/customcomponents/commonAPISelect";
import CustomTable from "./Projects/CustomTable";
import { Description, Height, LocalSeeTwoTone } from "@mui/icons-material";
import Summary from "./Projects/summary";
import { FaSun, FaMoon } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";
import { RiPaintFill } from "react-icons/ri";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ColorPickerModal from "./ColorPickerModal";
const TailwindStyledButton = styled(Button)(() => ({
  fontSize: "12px",
  fontWeight: 600,
  color: "white",
  backgroundColor: "#2563eb",
  "&:hover": {
    backgroundColor: "#2655CC",
  },
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeader": {
    borderRight: "1px solid rgba(235,235,235)", // Add border to the right of each column header
    "& .MuiDataGrid-menuIcon": {
      visibility: "visible !important",
      width: "auto",
    },
    "& .MuiDataGrid-iconButtonContainer": {
      visibility: "visible !important",
    },
    "&:hover .MuiDataGrid-menuIcon, &:hover .MuiDataGrid-iconButtonContainer": {
      visibility: "visible !important",
    },
  },
  "& .MuiDataGrid-cell": {
    borderRight: "1px solid rgba(235,235,235)", // Add border to the right of each cell
  },
  "& .MuiDataGrid-cell:first-of-type": {
    borderLeft: "1px solid rgba(235,235,235)", // Add border to the left of the first cell in each row
  },
}));

function Dashboard(props) {
  const columns = [
    { field: "Descriptions", headerName: "Contract Name", width: 150 },
    { field: "DR", headerName: "DR", width: 110 },
    { field: "CR", headerName: "CR", width: 110 },
    { field: "NR", headerName: "NR", width: 110 },
    { field: "Other", headerName: "Other", width: 110 },
    { field: "Total", headerName: "Total", width: 110 },
    { field: "Closed", headerName: "Closed", width: 110 },
    { field: "AllDiv", headerName: "AllDiv", width: 110 },
    { field: "7", headerName: "7", width: 110 },
    { field: "14", headerName: "14", width: 110 },
    { field: "30", headerName: "30", width: 110 },
    { field: "60", headerName: "60", width: 110 },
    { field: "90", headerName: "90", width: 110 },
  ];

  const [response, setResponse] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [clickedDes, setclickedDes] = useState(null);
  // console.log("🚀 ~ Dashboard ~ clickedDes:", clickedDes);
  const [workid, setWorkId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onClickData = (description) => {
    props.selecteddes(description);
  };
  // const [backgroundGradient, setBackgroundGradient] = useState(
  //   "bg-gradient-to-br from-NanoBGcolor1 via-NanoBGcolor2 to-NanoBGcolor3"
  // );
  const [bgClass, setBgClass] = useState(
    localStorage.getItem("selectedColour") ||
      "bg-gradient-to-br from-NanoBGcolor1 via-NanoBGcolor2 to-NanoBGcolor3"
  );

  const handleColorChange = (newColorClass) => {
    // console.log("🚀 ~ handleColorChange ~ newColorClass:", newColorClass);
    setBgClass(newColorClass);
    localStorage.setItem("selectedColour", newColorClass);
  };
  useEffect(() => {
    if (clickedDes) {
      props.selecteddes(clickedDes);
    }
  }, [clickedDes]);
  const selectworkid = (id) => {
    console.log("🚀 ~ selectworkid ~ id:", id);
    // console.log(id, "id from dashboard");
    setWorkId(id);
  };
  const selecteddes = (desc) => {
    setclickedDes(desc);

    console.log("🚀 ~ selecteddes ~ desc:", desc);
  };
  useEffect(() => {
    fetchData();
    const currentGreeting = getGreeting();
    setGreeting(currentGreeting);
  }, []);

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
  const fetchData = async () => {
    try {
      const response = await getData(
        "DashboardService/VwAPINSEIPLDetailsNew/",
        {
          data: {
            p1_int: 4,
            p2_int: "24",
            p3_int: 2024,
            p4_int: null,
            p5_int: null,
            p6_int: "2062",
            UserID_int: 0,
          },
        }
      );
      const {
        Output: { status, data },
      } = response;
      if (response.Output.status.code === "200") {
        setResponse(response.Output.data);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const WorkOrderID = (id) => {
    props.selectworkid(id);
    // console.log(id, "id from list");
    // setworkid(id);
  };
  let name = localStorage.getItem("username");

  return (
    <div className={`${bgClass} w-full h-auto pt-20 pr-7 pl-7 pb-3`}>
      <div className="w-full pb-7">
        <div className="flex justify-start items-center">
          <span className="text-white text-center mr-2 cursor-pointer">
            <ColorPickerModal onColorChange={handleColorChange} />
          </span>

          <h1 className="text-2xl font-medium text-white text-center">
            {greeting ? greeting : "Welcome"},
          </h1>

          <h1 className="text-2xl font-medium text-white text-center">
            {name.charAt(0).toUpperCase() + name.slice(1)}
            {/* { CurrentIcon() } */}
          </h1>
        </div>
        <div className="flex justify-start ">
          <Summary
            selecteddes={selecteddes}
            selectworkid={selectworkid}
            WorkOrderID={WorkOrderID}
            onClickData={onClickData}
            changeTab={props.changeTab}
          />
        </div>
        {/* <div className="w-full pt-4 flex justify-between items-center"> */}
        {/* <h1 className="text-defaultDashborderText font-medium cursor-pointer text-white">
          Dashboards
        </h1> */}
        {/* <div className="flex justify-center items-center">
            <TailwindStyledButton variant="contained">
              Create contract
            </TailwindStyledButton>
          </div> */}
        {/* </div> */}

        {/* 
        <div className="w-full pt-6 h-96">
          <CustomTable
            WorkOrderID={WorkOrderID}
            onClickData={onClickData}
            changeTab={props.changeTab}
          />
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
