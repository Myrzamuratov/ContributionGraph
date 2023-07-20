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

  const groupDataByDays = () => {
    const dataByDays = {};
    date.forEach((item) => {
      const dateObj = new Date(item.date);
      const dayOfWeek = format(dateObj, "EEEE");

      if (!dataByDays[dayOfWeek]) {
        dataByDays[dayOfWeek] = [];
      }

      dataByDays[dayOfWeek].push({
        [item.date]: item.value,
      });
    });
    return dataByDays;
  };

  const groupDataByWeeks = () => {
    const dataByWeeks = {};
    date.forEach((item) => {
      const dateObj = new Date(item.date);
      const startOfWeekDate = startOfWeek(dateObj, { weekStartsOn: 1 });
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

  // Reordered weekDaysOrder with Thursday, Friday, Saturday, Sunday, Monday, Tuesday, Wednesday
  const weekDaysOrder = [
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
  ];

  // Find the index of the current day and reorder the weekDaysOrder array
  const currentDate = new Date();
  const currentDayOfWeek = format(currentDate, "EEEE");
  const indexOfCurrentDay = weekDaysOrder.indexOf(currentDayOfWeek);
  const reorderedWeekDaysOrder = [
    ...weekDaysOrder.slice(indexOfCurrentDay + 1),
    ...weekDaysOrder.slice(0, indexOfCurrentDay + 1),
  ];

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
            {reorderedWeekDaysOrder.map((day) => (
              <li key={day}>{day.slice(0, 2)}</li>
            ))}
          </ul>
        </div>
        <div>
          {reorderedWeekDaysOrder.map((day) => (
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
          alignItems: "center",
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
