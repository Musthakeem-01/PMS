import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoClose } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { FaSortDown } from "react-icons/fa";
import DataList from "../components/Grid/DataList";
export default function CreateTask() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    // boxShadow: 24,
    // p: 4,
    width: "70%",
    height: "85vh",
    borderRadius: "0.25rem",
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        style={{ textTransform: "capitalize" }}
        onClick={handleOpen}
        id="createTaskBtn"
      >
        Create
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEnforceFocus
      >
        <Box sx={style}>
          <div className="flex h-full  flex-col">
            {/* header */}
            <div className=" flex h-[20%] p-[24px] justify-between	items-center">
              <div className="text-[20px] font-medium normal-case leading-[42px]">
                <h1>Create Project</h1>
              </div>
              <div className="">
                <IoClose
                  className=" text-2xl cursor-pointer"
                  onClick={handleClose}
                />
              </div>
            </div>
            {/* body */}
            <div className="flex p-4 overflow-y-auto justify-between h-[60%]">
              <div className="h-auto w-full">
                <div className="flex gap-1 ">
                  <p className="text-sm text-color">
                    Required fields are marked with an asterisk
                  </p>
                  <span className="text-red-500">*</span>
                </div>
                <div className="mt-2">
                  <label className="text-project text-sm font-medium">
                    Project
                  </label>
                  <span className="text-red-500">*</span>
                  <DataList width={"350px"} height={"40px"} />
                </div>
                <div className="mt-4">
                  <label className="text-project text-sm font-medium">
                    Issue type
                  </label>
                  <span className="text-red-500">*</span>
                  <DataList width={"350px"} height={"40px"} />
                </div>
                <div className="mt-8 ">
                  <hr className="w-full text-color" />
                </div>
                <div className="mt-8">
                  <label className="text-project text-sm font-medium">
                    Status
                  </label>
                  <DataList width={"100px"} height={"30px"} />
                  <span className="text-xs text-color">
                    This is the issue's initial status upon creation
                  </span>
                </div>
                <div className="mt-8">
                  <label className="text-project text-sm font-medium">
                    Summary
                  </label>
                  <span className="text-red-500">*</span>
                  <DataList width={"100%"} height={"40px"} />
                </div>
                <div className="mt-8">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <div className="">
                    <textarea
                      id="description"
                      className="w-full h-32  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                      // placeholder="We support markdown! Try **bold**, `inline code`, or ``` for code blocks."
                      // value={text}
                      // onChange={(e) => setText(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-project text-sm font-medium">
                    Assignee
                  </label>
                  <DataList width={"350px"} height={"40px"} />
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer font-medium">
                    Assign to me
                  </span>
                </div>
                <div className="mt-4">
                  <label className="text-project text-sm font-medium">
                    Reporter
                  </label>
                  <span className="text-red-500">*</span>
                  <DataList width={"350px"} height={"40px"} />
                </div>
                <div className="mt-4">
                  <label className="text-project text-sm font-medium">
                    Priority
                  </label>
                  <DataList width={"350px"} height={"40px"} />
                  <span className="text-sm text-blue-500 hover:underline cursor-pointer font-medium">
                    Learn about priority levels
                  </span>
                </div>
                <div className="mt-4">
                  <label className="text-project text-sm font-medium">
                    Labels
                  </label>
                  <DataList width={"350px"} height={"40px"} />
                </div>
                <div className="mt-4">
                  <label className="text-project text-sm font-medium">
                    Due date
                  </label>
                  <DataList width={"350px"} height={"40px"} />
                </div>
                <div className="mt-4 relative">
                  <label className="text-project text-sm font-medium">
                    Attachment
                  </label>
                  <div className="w-full h-[40px] border-dashed text-center text-sm p-1 border border-borderColor rounded flex items-center justify-center">
                    <span>Drop files to attach or </span>
                    <label
                      htmlFor="file-upload"
                      className="text-blue-500 cursor-pointer ml-1"
                    >
                      browse
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => console.log(e.target.files)}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-project text-sm font-medium">
                    Original Estimate
                  </label>
                  <DataList width={"350px"} height={"40px"} />
                  <p className="w-[350px] text-xs py-4 text-color">
                    An estimate of how much work remains until this issue will
                    be resolved. The format of this is ' *w *d *h *m '
                    (representing weeks, days, hours and minutes - where * can
                    be any number). Examples: 4d, 5h 30m, 60m and 3w.
                  </p>
                </div>
                <div className="mt-4">
                  <label className="text-project text-sm font-medium">
                    Department
                  </label>
                  <span className="text-red-500">*</span>
                  <DataList width={"100%"} height={"40px"} />
                </div>
                <div className="mt-4">
                  <label className="text-project text-sm font-medium">
                    Start date
                  </label>
                  <DataList width={"350px"} height={"40px"} />
                  <span className="text-xs text-color">
                    Allows the planned start date for a piece of work to be set.
                  </span>
                </div>
                <div className="mt-4">
                  <label className="text-project text-sm font-medium">
                    Category
                  </label>
                  <DataList width={"350px"} height={"40px"} />
                  <span className="text-xs text-color">
                    Choose a category using a popup picker window.
                  </span>
                </div>
                <div className="mt-4">
                  <label className="text-project text-sm font-medium">
                    Linked Issues
                  </label>
                  <DataList width={"350px"} height={"40px"} />
                  <DataList
                    width={"350px"}
                    height={"40px"}
                    marginTop={"10px"}
                  />
                </div>
              </div>
            </div>
            {/* footer */}
            <div className=" flex p-[24px] h-[20%] justify-between	items-center">
              <div className=" text-sm font-small normal-case leading-[35px] w-[21%]">
                <label className="w-full flex justify-between">
                  <input
                    type="checkbox"
                    id="another"
                    name="issue"
                    value="crete"
                  />
                  <span>Create another issue</span>
                </label>
              </div>
              <div className="flex text-sm font-small normal-case leading-[35px] w-[21%]">
                <button
                  className="w-full text-sm hover:underline cursor-pointer"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button className="w-full text-sm hover:bg-blue-700 rounded cursor-pointer bg-blue-600 text-white p-1">
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
