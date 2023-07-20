import React, { createContext, useContext, useReducer, useEffect } from "react";
import { ACTIONS, API } from "../helpers/consts";
import { subDays, format } from "date-fns";
import axios from "axios";

export const dateContext = createContext();
export const useDate = () => useContext(dateContext);

const INIT_STATE = {
  date: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_DATA:
      return { ...state, date: action.payload };

    default:
      return state;
  }
};

const DateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getData = async () => {
    try {
      const { data } = await axios.get(API);
      dispatch({ type: ACTIONS.GET_DATA, payload: data });
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const dateArray = Object.entries(state.date).map(([date, value]) => ({
    date,
    value,
  }));

  const last357Days = Array.from({ length: 357 }, (_, index) =>
    format(subDays(new Date(), index), "yyyy-MM-dd")
  ).reverse();

  const valuesForLast357Days = last357Days.map((date) => {
    const foundDate = dateArray.find((item) => item.date === date);
    return {
      date,
      value: foundDate ? foundDate.value : 0,
    };
  });
  console.log(valuesForLast357Days);

  const values = {
    date: valuesForLast357Days,
    getData,
  };

  return <dateContext.Provider value={values}>{children}</dateContext.Provider>;
};

export default DateContextProvider;
