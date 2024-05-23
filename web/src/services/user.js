if (process.env.NODE_ENV === "development") {
  window.server = `xxxxxxxxxxxxx`;
} else {
  window.server = `${location.protocol}//${location.host}`;
}
import axios from "@utils/request";
import querystring from "querystring";
export async function getUserInfo() {
  let data = await axios("GET", `/api/getUserInfo`);
  return data;
}
export async function gitList(after) {
  let data = await axios("GET", `/api/gitList?after=${after}`);
  return data;
}