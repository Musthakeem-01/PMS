import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../assets/css/menu.css";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday);

const DayCard = () => {
  const [weekDates, setWeekDates] = useState([]);
  const [responseCard, setResponseCard] = useState(null);
  const [responseCount, setResponseCount] = useState([]);
  const moment = require("moment");

  useEffect(() => {
    fetchWeekDates();
  }, []);
  const fetchWeekDates = async () => {
    const startOfWeek = moment().startOf("isoWeek");
    const dates = Array.from({ length: 7 }).map((_, index) => {
      return {
        day: startOfWeek.clone().add(index, "days").format("dddd"),
        date: startOfWeek.clone().add(index, "days").format("YYYY-MM-DD"),
        count: 0,
      };
    });

    const mondayDate = startOfWeek.format("YYYY-MM-DD"); // Get Monday's date
    setWeekDates(dates);

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
              p1_int: 23,
              p2_int: localStorage.getItem("eid"),
              P8_date: mondayDate,
            },
          }),
        }
      );

      const result = await response.json();
      setResponseCount(result.Output.data);
      if (result.status.code === "200") {
        console.log("Success:", result.data);
      } else {
        console.error("Error updating card stage:", result.status.message);
      }
    } catch (error) {
      console.error("Error updating card stage:", error.message);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // Identify the source and target dates based on droppableIds
    const sourceDate = source.droppableId;
    const targetDate = destination.droppableId;

    const card = responseCard.find((data) => data.ComplaintNo === draggableId);

    if (card) {
      // Update card stage
      updateCardStage(card.ComplaintIDPK, targetDate);

      // Update counts in weekDates and responseCount
      setWeekDates((prevWeekDates) => {
        const updatedDates = prevWeekDates.map((date) => {
          if (date.date === sourceDate) {
            return { ...date, count: date.count - 1 };
          }
          if (date.date === targetDate) {
            return { ...date, count: date.count + 1 };
          }
          return date;
        });
        return updatedDates;
      });

      // Update responseCount state
      setResponseCount((prevResponseCount) => {
        return prevResponseCount.map((count) => {
          if (count.WDate === sourceDate) {
            return {
              ...count,
              Total: (parseInt(count.Total, 10) - 1).toString(),
            };
          }
          if (count.WDate === targetDate) {
            return {
              ...count,
              Total: (parseInt(count.Total, 10) + 1).toString(),
            };
          }
          return count;
        });
      });

      // Remove the card from responseCard
      const updatedResponseCard = responseCard.filter(
        (data) => data.ComplaintNo !== draggableId
      );
      setResponseCard(updatedResponseCard);
    }
  };

  const handleDayClick = async (day, date) => {
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
              p1_int: 24,
              p6_int: localStorage.getItem("eid"),
              P8_date: date,
            },
          }),
        }
      );

      const result = await response.json();
      setResponseCard(result.Output.data);
      if (result.status.code === "200") {
        console.log("Success:", result.data);
      } else {
        console.error("Error updating card stage:", result.status.message);
      }
    } catch (error) {
      console.error("Error updating card stage:", error.message);
    }
  };
  const updateCardStage = async (cardId, targetDate) => {
    try {
      const response = await fetch(
        "https://smartfm.in/NSEIPLSERVICE/DashboardService/VwAPINSEIPLDetails/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              p1_int: 145,
              p6_int: cardId,
              P7_date: targetDate,
            },
          }),
        }
      );

      const result = await response.json();
      if (result.status.code === "200") {
        console.log("Success:", result.data);
      } else {
        console.error("Error updating card stage:", result.status.message);
      }
    } catch (error) {
      console.error("Error updating card stage:", error.message);
    }
    fetchWeekDates();
  };
  const bgcolors = (event) => {};
  return (
    <div className="w-full">
      <div className="mt-10 overflow-auto custom-scrollbar">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 overflow-auto custom-scrollbar justify-evenly">
              {weekDates.map(
                (item) => (
                  <Droppable droppableId={item.date} key={item.date}>
                    {(provided) => (
                      <div>
                        <div
                          className={`w-50 ${
                            responseCount.find(
                              (count) => count.Day === item.day.slice(0, 3)
                            )
                              ? "bg-black"
                              : ""
                          } flex gap-2 cursor-pointer rounded bg-BoardCardBG px-2 py-1.5 border-blue-600 border-l-4`}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          onClick={() => handleDayClick(item.day, item.date)}
                        >
                          <span
                            className={`text-sm ${
                              responseCount.find(
                                (txtColr) =>
                                  txtColr.Day === item.day.slice(0, 3)
                              )
                                ? "text-white"
                                : "text-stone-800 font-medium"
                            }`}
                          >
                            {item.day}
                          </span>
                          {responseCount.map((count) =>
                            count.Day === item.day.slice(0, 3) ? (
                              <span
                                key={count.id} // Assuming count object has a unique id
                                className="block transform hover:scale-150 hover:bg-blue-700 transition-transform duration-300 hover:text-white bg-orange-100 hover:tr text-center rounded font-semibold text-sm"
                              >
                                {count.Total}
                              </span>
                            ) : null
                          )}
                          <span className="text-sm font-medium text-pink-600 text-end ml-auto">
                            {item.date}
                          </span>
                        </div>

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )
                // )
              )}
            </div>

            {/* Row 2: Data Cards Column */}
            <div className="flex gap-2 overflow-auto custom-scrollbar">
              <Droppable droppableId="response-cards-column">
                {(provided) => (
                  <div
                    className="flex gap-2"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {responseCard &&
                      responseCard.map((data, index) => (
                        <Draggable
                          key={data.ComplaintNo}
                          draggableId={data.ComplaintNo}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="w-80 h-[35vh] rounded bg-BoardCardBG p-2 cursor-pointer"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="p-2 mt-2 bg-white border-BorderCard rounded border cursor-pointer group">
                                <div className="flex flex-col gap-1">
                                  <div className="text-xs font-medium flex gap-2">
                                    <p className="text-xs font-medium text-blue-600">
                                      {data?.ComplaintNo || ""}
                                    </p>
                                    <p className="text-pink-600">
                                      {data.ComplainerName}
                                    </p>
                                    <p className="text-green-800">
                                      {data.TechName}
                                    </p>
                                    <p className="text-blue-600">
                                      {data.CCMProTypeName}
                                    </p>
                                  </div>
                                  <p>
                                    <span className="text-xs font-medium text-red-600">
                                      Del : {data?.DeliveryDate || ""}
                                    </span>
                                    <span className="text-xs font-medium text-green-800 pl-2">
                                      ETA : {data?.ETADate || ""}
                                    </span>
                                  </p>
                                  <p className="text-xs font-semibold text-stone-700">
                                    {data?.RequestDetailsDesc || ""}
                                  </p>
                                </div>
                                <div className="w-full pt-1 flex flex-col gap-1">
                                  <div className="w-full flex gap-1 items-center justify-between">
                                    <span className="flex gap-1">
                                      <p className="text-xs font-semibold text-yellow-600">
                                        Priority : {data.PriorityName}
                                      </p>
                                    </span>
                                    <span className="text-xs text-pink-600">
                                      {data?.BranchName}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DayCard;
