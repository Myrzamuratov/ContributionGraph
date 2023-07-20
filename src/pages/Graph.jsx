import React, { useState } from "react";
import { useDate } from "../context/DateContextProvider";
import { addMonths } from "date-fns";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  differenceInDays,
  getDay,
  subMonths,
} from "date-fns";
import DayOfWeek from "../components/DayOfWeek";

const Graph = () => {
  const { date, getData } = useDate();

  // Function to group data by days
  const groupDataByDays = () => {
    const dataByDays = {};
    date.forEach((item) => {
      const dateObj = new Date(item.date);
      const dayOfWeek = format(dateObj, "EEEE"); // EEEE gives the full day name (Monday, Tuesday, etc.)

      if (!dataByDays[dayOfWeek]) {
        dataByDays[dayOfWeek] = [];
      }

      dataByDays[dayOfWeek].push({
        [item.date]: item.value,
      });
    });
    return dataByDays;
  };

  // Function to group data by weeks
  const groupDataByWeeks = () => {
    const dataByWeeks = {};
    date.forEach((item) => {
      const dateObj = new Date(item.date);
      const startOfWeekDate = startOfWeek(dateObj, { weekStartsOn: 1 }); // Assuming week starts on Monday (use 0 for Sunday)
      const endOfWeekDate = endOfWeek(dateObj, { weekStartsOn: 1 });
      const weekKey = format(startOfWeekDate, "yyyy-MM-dd");
      const daysInWeek = differenceInDays(endOfWeekDate, startOfWeekDate) + 1;

      if (!dataByWeeks[weekKey]) {
        dataByWeeks[weekKey] = {
          value: item.value,
          days: daysInWeek,
        };
      } else {
        dataByWeeks[weekKey].value += item.value;
        dataByWeeks[weekKey].days += daysInWeek;
      }
    });
    return dataByWeeks;
  };

  const dataByDays = groupDataByDays();
  const dataByWeeks = groupDataByWeeks();

  console.log("Data by days:", dataByDays);
  console.log("Data by weeks:", dataByWeeks);

  const weekDaysOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Generate an array with the last 12 months in reverse order
  const currentDate = new Date();
  const monthsOrder = Array.from({ length: 12 }, (_, i) =>
    subMonths(currentDate, i)
  );

  return (
    <div style={{ margin: "50px", width: "80%" }}>
      <div style={{ width: "100%" }}>
        <ul
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "flex-end",
          }}
        >
          {monthsOrder.map((month) => (
            <li key={month} className="month_li">
              {format(month, "LLLL").length > 4
                ? format(month, "LLLL").slice(0, 3) + "."
                : format(month, "LLLL")}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: "flex", margin: "auto", width: "100%" }}>
        <div style={{ display: "flex", alignContent: "flex-start" }}>
          <ul>
            {weekDaysOrder.map((day) => (
              <li key={day}>{day.slice(0, 2)}</li>
            ))}
          </ul>
        </div>
        <div>
          {weekDaysOrder.map((day) => (
            <DayOfWeek key={day} weekDay={dataByDays[day]} />
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "10px",
          width: "170px",
          justifyContent: "center",
          alignItems: "center", // Center vertically
        }}
      >
        <div className="example_text">Меньше</div>
        <ul className="example_ul">
          <li className="example_li" style={{ background: "#EDEDED" }}></li>
          <li className="example_li" style={{ background: "#ACD5F2" }}></li>
          <li className="example_li" style={{ background: "#7FA8C9" }}></li>
          <li className="example_li" style={{ background: "#527BA0" }}></li>
          <li className="example_li" style={{ background: "#254E77" }}></li>
        </ul>
        <div className="example_text">Больше</div>
      </div>
    </div>
  );
};

export default Graph;
