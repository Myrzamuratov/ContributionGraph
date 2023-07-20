import React, { useState } from "react";
import { format, parseISO } from "date-fns";

const DayOfWeek = ({ weekDay }) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  function handleCellHover(index) {
    setHoveredCell(index);
  }
  function formatDateToCustomString(dateString) {
    const parsedDate = parseISO(dateString);
    const formattedDate = format(parsedDate, "eeee, MMMM dd, yyyy");
    return formattedDate;
  }

  return (
    <div style={{ margin: "1px", height: "16px" }}>
      <div style={{ display: "flex", alignContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {weekDay.map((item, index) => (
            <div key={index} style={{ position: "relative" }}>
              {hoveredCell === index && (
                <div
                  style={{
                    position: "absolute",
                    width: "145px",
                    height: "42px",
                    zIndex: 1,
                    top: "-46px",
                    left: "-66px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "145px",
                      height: "42px",
                      borderRadius: "3px",
                      background: "#000000",
                      color: "#fff",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ fontWeight: "400", fontSize: "12px" }}>
                      {Object.values(item)[0]} contributions
                    </div>

                    <div
                      style={{
                        fontWeight: "400",
                        fontSize: "10px",
                        color: "#7C7C7C",
                      }}
                    >
                      {formatDateToCustomString(Object.keys(item)[0])}
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "70px",
                      top: "40px",
                      width: 0,
                      height: 0,
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderTop: "8px solid #000000",
                    }}
                  ></div>
                </div>
              )}
              <div
                onClick={() => handleCellHover(index)}
                onMouseOut={() => handleCellHover(null)}
                className="day_box"
                style={{
                  background:
                    Object.values(item)[0] === 0
                      ? "#EDEDED"
                      : 0 < Object.values(item)[0] &&
                        Object.values(item)[0] < 10
                      ? "#ACD5F2"
                      : 10 <= Object.values(item)[0] &&
                        Object.values(item)[0] < 20
                      ? "#7FA8C9"
                      : 20 <= Object.values(item)[0] &&
                        Object.values(item)[0] < 30
                      ? "#527BA0"
                      : Object.values(item)[0] === 30
                      ? "#254E77"
                      : "#EDEDED",
                  width: "15px",
                  height: "15px",
                  margin: "1px",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayOfWeek;
