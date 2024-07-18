import React, { useState, useEffect } from "react";
import { apiPostRequest } from "../../components/function/apiPostRequest";
import { getCurrentWeekDate } from "../../components/function/getCurrentWeekDate";
import { config } from "../../config/config";

export default function CustomTable(props) {
  const { weekNumber, year, date } = getCurrentWeekDate();
  const eid = localStorage.getItem("eid");
  const [TableBody, setTableBody] = useState([]);
  // console.log("🚀 ~ CustomTable ~ TableBody:", TableBody);
  const [selectDescription, setSelectDescription] = useState(null);

  const header = [
    { key: "Descriptions", header: "Contract Name" },
    { key: "DR", header: "DR" },
    { key: "CR", header: "CR" },
    { key: "NR", header: "NR" },
    { key: "Other", header: "OR" },
    { key: "Total", header: "T" },
    { key: "Closed", header: "C" },
    { key: "AllDiv", header: "O" },
    { key: "7", header: "7" },
    { key: "14", header: "14" },
    { key: "30", header: "30" },
    { key: "60", header: "60" },
    { key: "90", header: "90+" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url = config.url + "DashboardService/VwAPINSEIPLDetailsNew/";
    const params = {
      data: {
        p1_int: 4,
        p2_int: weekNumber,
        p3_int: year,
        p4_int: null,
        p5_int: null,
        p6_int: eid,
        UserID_int: localStorage.getItem("UserIDPK"),
      },
    };

    const response = await apiPostRequest(url, params);

    // console.log("res", response);
    const {
      Output: {
        status: { code },
        data,
      },
    } = response;

    let hiddenColumns = [
      "IDPK",
      "ID",
      "CreatedDate",
      "UpdatedDate",
      "DeleStat",
      "UpdatedTtm",
      "CreatedTtm",
      "Code",
    ];
    let total = {
      7: 0,
      14: 0,
      30: 0,
      60: 0,
      90: 0,
      120: 0,
      DR: 0,
      CR: 0,
      NR: 0,
      Other: 0,
      Closed: 0,
      AllDiv: 0,
      TodayCnt: 0,
      Total: 0,
      C: 0,
      O: 0,
      ">120": 0,
    };

    data.forEach((obj) => {
      let arr = Object.entries(obj);
      arr.map(([key, val]) => {
        if (key == "WorkOrderID") {
          total[key] = "0";
        } else if (key == "Descriptions" || key == "Descriptions1") {
          total[key] = "Total";
        } else {
          total[key] = total[key] + Number(val);
        }
      });
    });

    let bodyData = [...[total], ...data];
    // console.log("🚀 ~ fetchData ~ bodyData:", bodyData);

    setTableBody(bodyData);
  } // weekNumber,year, eid, x["Descriptions"], key, x["WorkOrderID"];

  const onClick_Data = (
    weekNumber,
    year,
    eid,
    Descriptions,
    key,
    WorkOrderID
  ) => {
    //props.changeTab();
    if (props.changeTab) {
      props.changeTab(true, WorkOrderID, Descriptions);
    }
    setSelectDescription(Descriptions);
    if (props.onClickData) {
      props.onClickData(Descriptions);
    }
    if (props.WorkOrderID) {
      props.WorkOrderID(WorkOrderID);
    }
  };

  function numberToColorClass(number) {
    const colors = [
      "50",
      "50",
      "100",
      "100",
      "200",
      "200",
      "300",
      "300",
      "400",
      "400",
    ];
    const index = Math.min(Math.max(number, 1), 10) - 1;
    return colors[index];
  }

  return (
    <section id="contract_woCount_WNA" className="content-start w-full">
      <div
        data-aos="zoom-in"
        className="flex flex-col w-full p-1 aos-init aos-animate "
        style={{ height: "60vh" }}
      >
        <div
          id="generate_table_html_cwise"
          className="flex-grow px-0 overflow-auto scroll-smooth custom-scrollbar shadow-md rounded-lg bg-white "
        >
          <table className="relative tracking-wider w-full border text-left text-xs text-slate-500">
            <thead className="text-xs text-blue-600 uppercase">
              <tr>
                {header.map(({ key, header }) => (
                  <th className="sticky top-0 py-2 px-2 bg-gray-200">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              id="DynamicTable_CE_WNA"
              className="divide-y bg-blue-50 text-slate-800 bg-white"
            >
              {TableBody.filter(
                (row) => row[Object.keys(row).find((key) => key.endsWith("ID"))]
              ).map((x, i) => {
                const rowColumns = header.map(({ key }) => {
                  // console.log(x, x[key], typeof x[key], "check x");
                  if (key.startsWith("Is")) {
                    return (
                      <td key={key} className="py-1 px-1">
                        <input
                          type="checkbox"
                          value={x[key] ? "checked" : ""}
                        />
                      </td>
                    );
                  } else {
                    let color =
                      key === "AllDiv"
                        ? "emerald"
                        : key === "CR"
                        ? "orange"
                        : key === "DR"
                        ? "red"
                        : key === "NR"
                        ? "amber"
                        : key === "7"
                        ? "emerald"
                        : key === "14"
                        ? "green"
                        : key === "30"
                        ? "yellow"
                        : key === "60"
                        ? "orange"
                        : key === "90"
                        ? "rose"
                        : key === "120"
                        ? "red"
                        : key === ">120"
                        ? "red"
                        : "cyan";

                    return (
                      <td
                        key={key}
                        onClick={() =>
                          onClick_Data(
                            weekNumber,
                            year,
                            eid,
                            x["Descriptions"],
                            key,
                            x["WorkOrderID"]
                          )
                        }
                        className="cursor-pointer py-1 px-1"
                      >
                        {key === "AllDiv" ||
                        key === "CR" ||
                        key === "DR" ||
                        key === "NR" ||
                        key === "Other" ||
                        key === "7" ||
                        key === "14" ||
                        key === "30" ||
                        key === "60" ||
                        key === "90" ||
                        key === "120" ? (
                          <p
                            className={`transform hover:scale-150 hover:bg-blue-700 transition-transform duration-300 hover:text-white 
                bg-${color}-${numberToColorClass(
                              x[key]
                            )} hover:tr text-center rounded font-semibold`}
                          >
                            {x[key] == 0 ? "" : x[key]}
                          </p>
                        ) : x[key] === 0 ? (
                          ""
                        ) : (
                          x[key]
                        )}
                      </td>
                    );
                  }
                });

                return (
                  <tr
                    key={i}
                    className={`truncate border-b hover:bg-blue-100 hover:text-blue-600 cursor-pointer ${
                      i === 0
                        ? "bg-violet-200"
                        : i % 2 !== 0
                        ? "bg-slate-50"
                        : ""
                    }`}
                    data-idpk={
                      x[Object.keys(x).find((key) => key.endsWith("IDPK"))]
                    }
                  >
                    {rowColumns}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
