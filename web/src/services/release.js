import axios from "@utils/request";
export async function postRelease(data) {

  return await axios("POST", `/api/release`,data);
}