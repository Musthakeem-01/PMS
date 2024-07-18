import React, { useState, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import {
  compareAsc,
  format,
  subDays,
  subWeeks,
  subMonths,
  subYears,
  addDays,
  addWeeks,
  addMonths,
  addYears,
} from "date-fns";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { IoIosCalendar } from "react-icons/io";

import { LuMoreHorizontal } from "react-icons/lu";

import MonthCalendar from "./MonthNew";

function Calendar(props) {
  const dayRef = useRef();
  const weekRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const [calendar, setCalendar] = useState("month");
  const [formate, setFormate] = useState("MMMM yyyy");
  const [currentDate, setCurrentDate] = useState(new Date());

  const onClickPrev = () => {
    if (calendar == "day") {
      setCurrentDate(subDays(currentDate, 1));
      dayRef.current.Prev();
    } else if (calendar == "week") {
      setCurrentDate(subWeeks(currentDate, 1));
      weekRef.current.Prev();
    } else if (calendar == "month") {
      setCurrentDate(subMonths(currentDate, 1));
      monthRef.current.Prev();
    } else if (calendar == "year") {
      setCurrentDate(subYears(currentDate, 1));
      yearRef.current.Next();
    }
  };
  const onClickNext = () => {
    if (calendar == "day") {
      setCurrentDate(addDays(currentDate, 1));
      dayRef.current.Next();
    } else if (calendar == "week") {
      setCurrentDate(addWeeks(currentDate, 1));
      weekRef.current.Next();
    } else if (calendar == "month") {
      setCurrentDate(addMonths(currentDate, 1));
      monthRef.current.Next();
    } else if (calendar == "year") {
      setCurrentDate(addYears(currentDate, 1));
      yearRef.current.Next();
    }
  };

  return (
    <div>
      <div className="flex justify-between pb-4">
        <div>
          <form className="max-w-md hidden">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full h-8 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                placeholder="Search"
                required
              />
            </div>
          </form>
        </div>

        <div className="flex justify-center items-center gap-1 ">
          <div className="text-white gap-2 rounded hover:bg-ShareHoveBG">
            <Button color="inherit" style={{ textTransform: "capitalize" }}>
              {format(currentDate, formate)}{" "}
            </Button>
          </div>

          <div className="gap-2">
            <IconButton aria-label="delete" onClick={() => onClickPrev()}>
              <ChevronLeftIcon className="text-white" />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => onClickNext()}>
              <ChevronRightIcon className="text-white" />
            </IconButton>
          </div>

          <div className="flex gap-2 items-center text-white cursor-pointer">
            <button className="flex items-center gap-2 text-sm font-medium text-white px-3 h-8 bg-ShareHoveBG rounded ">
              {" "}
              Today
            </button>
          </div>

          <div className="flex gap-2 items-center text-white cursor-pointer">
            <button className="hidden flex items-center gap-2 text-sm font-medium text-white px-3 h-8 bg-transparent rounded hover:bg-ShareHoveBG">
              <IoShareSocialSharp className="w-4 h-4" /> Share
            </button>
          </div>

          <div className="flex gap-2 items-center text-white cursor-pointer">
            <button className="flex items-center gap-2 text-sm font-medium text-white px-3 h-8 bg-transparent rounded hover:bg-ShareHoveBG">
              <IoIosCalendar className="w-4 h-4" />
              Unscheduled
            </button>
          </div>

          <div className="flex gap-2 items-center text-white cursor-pointer">
            <button className="hidden flex items-center gap-2 text-sm font-medium text-white px-3 h-8 bg-transparent rounded hover:bg-ShareHoveBG">
              <IoFilter className="w-4 h-4" />
              Filter
            </button>
          </div>

          <div className="flex gap-2 items-center text-white cursor-pointer">
            <button className="hidden flex items-center gap-2 text-sm font-medium text-white px-3 h-8 bg-transparent rounded hover:bg-ShareHoveBG">
              <LuMoreHorizontal className="w-4 h-4" />
              More
            </button>
          </div>
        </div>
      </div>

      <MonthCalendar
        ref={monthRef}
        loading={(e) => props.loading(e)}
        alertmsg={(e) =>
          props.alertmsg({ open: e.open, color: e.color, message: [e.message] })
        }
      />
    </div>
  );
}
export default Calendar;
