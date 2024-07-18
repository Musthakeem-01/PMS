import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IoCloseOutline } from "react-icons/io5";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { CiSettings } from "react-icons/ci";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const HeaderGrid = [
  { field: "Projects", headerName: "Projects-Name", width: 150 },
  { field: "ComplaintNo", headerName: "ComplaintNo", width: 100 },
  { field: "RequestDetailsDesc", headerName: "Summary", width: 400 },
  { field: "ETADate", headerName: "ETADate", width: 150 },
  { field: "ETATime", headerName: "ETATime", width: 150 },
  { field: "ComplainerName", headerName: "ComplainerName", width: 150 },
  { field: "PriorityName", headerName: "Priority", width: 150 },
  { field: "CCMProTypeName", headerName: "Module", width: 100 },
  { field: "CCmWoTypeName", headerName: "Dept", width: 100 },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "500px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overscrollbehavior: "auto",
};
export default function DataTable(props) {
  const [open, setOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState(null);
  const [age, setAge] = React.useState(11);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRowClick = (params) => {
    setRowData(params.row);
    handleOpen();
  };

  let receiveData = props.res;
  const BodyContent = receiveData.map((item, index) => ({
    id: index,
    Projects: item?.Projects || "",
    ComplaintNo: item?.ComplaintNo || "",
    RequestDetailsDesc: item?.RequestDetailsDesc,
    ETADate: item.ETADate,
    ETATime: item.ETATime,
    ComplainerName: item.ComplainerName,
    PriorityName: item.PriorityName,
    CCMProTypeName: item.CCMProTypeName,
    CCmWoTypeName: item.CCmWoTypeName,
  }));
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={BodyContent}
        columns={HeaderGrid}
        className="bg-white hover:bg-gray-100 cursor-pointer"
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        onRowClick={handleRowClick}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="popup-modal-title"
        aria-describedby="popup-modal-description"
      >
        <Box sx={style}>
          <div className="flex w-full h-3/4 pt-5 mt-5 space-x-6">
            <div
              className="w-1/2 overflow-scroll p-6 rounded-lg"
              style={{
                scrollbarWidth: "thin",
                overflowY: "scroll",
              }}
            >
              <h1 className="text-base font-semibold mb-6 text-gray-800">
                Create Positioning and Messaging for New Feature
              </h1>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
                className="mb-6"
              >
                Attach
                <VisuallyHiddenInput type="file" />
              </Button>
              <div>
                <p className="mb-2 text-lg text-gray-700">Description</p>
                <textarea
                  rows="4"
                  className="block rounded-md w-full h-32 py-2 px-4 text-sm text-gray-800 bg-white border-2 border-gray-300 focus:outline-none focus:border-blue-600 mb-6 shadow-sm"
                  placeholder="Enter Description here..."
                ></textarea>
                <div className="flex space-x-4">
                  <Button variant="contained" color="primary" size="medium">
                    Save
                  </Button>
                  <Button variant="outlined" color="secondary" size="medium">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>

            <div
              className="w-1/2 space-y-4 overflow-y-scroll"
              style={{
                maxHeight: "400px",
                scrollbarWidth: "thin",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.overflowY = "auto")}
              onMouseLeave={(e) => (e.currentTarget.style.overflowY = "hidden")}
            >
              <div className="text-white">
                <FormControl sx={{ m: 1, minWidth: 60 }}>
                  <InputLabel
                    id="demo-simple-select-autowidth-label"
                    sx={{ color: "white" }}
                  ></InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChange}
                    autoWidth
                    value={age}
                    sx={{
                      color: "white",
                      ".MuiSvgIcon-root": { color: "white" },
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                        padding: "8px 8px",
                        fontSize: "1rem",
                      },
                    }}
                    className="bg-blue-600"
                  >
                    <MenuItem value={11}>Ready for Launch</MenuItem>
                    <MenuItem value={10}>To Do</MenuItem>
                    <MenuItem value={21}>DB Support</MenuItem>
                    <MenuItem value={22}>In Progress</MenuItem>
                    <MenuItem value={23}>Launched</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="h-auto bg-white rounded-lg p-2 border border-blue-600">
                <div
                  className="flex justify-between cursor-pointer "
                  onClick={toggleDropdown}
                >
                  <p className="font-semibold text-gray-700 text-sm">Details</p>
                  <p className="text-gray-500 text-xl">{isOpen ? "▲" : "▼"}</p>
                </div>
                {isOpen && (
                  <div>
                    <div className="flex justify-between mb-4">
                      <p className="font-semibold text-gray-700">Assignee</p>
                      <p className="text-gray-500">Unassigned</p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <p className="font-semibold text-gray-700">Reporter</p>
                      <p className="text-gray-500">Test</p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <p className="font-semibold text-gray-700">Labels</p>
                      <p className="text-gray-500">Product</p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <p className="font-semibold text-gray-700">Due Date</p>
                      <p className="text-gray-500">Jul 05, 2024</p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <p className="font-semibold text-gray-700">
                        Time Tracking
                      </p>
                      <p className="text-gray-500">No Time</p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <p className="font-semibold text-gray-700">Department</p>
                      <p className="text-gray-500">None</p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <p className="font-semibold text-gray-700">Start Date</p>
                      <p className="text-gray-500">May 20, 2024</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold text-gray-700">Category</p>
                      <p className="text-gray-500">Core</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-2">
                <div className="">
                  <p className="text-xs">Created last week</p>
                  <p className="text-xs">Updated 2 days ago</p>
                </div>
                <div className="flex">
                  <CiSettings />
                  <p className="text-xs">Configure</p>
                </div>
              </div>
            </div>
          </div>
          <IoCloseOutline
            className="absolute top-5 right-5 text-4xl cursor-pointer"
            onClick={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
