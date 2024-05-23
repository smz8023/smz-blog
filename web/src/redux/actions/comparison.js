import axios from "axios";

export const initVariables = () => dispatch => {
  axios("GET", "/PROJE/Variables/All", {}, data => {
    dispatch({
      type: "initVariables",
      payload: data
    });
  });
};

export const getusecase = () => dispatch => {
  axios("GET", "/PROJE/UseCases/All", {}, data => {
    dispatch({
      type: "getusecase",
      payload: data
    });
  });
};

export const test = (data)=>({type: "test",payload:data})