import axios from "@utils/request";
import querystring from "querystring";
// export async function Outh(param) {
//   let data = await axios(
//     "GET",
//     `/api/githubOuth?${querystring.stringify(param)}`
//   );
//   return data;
// }
export async function Outh(param) {

  let data = await axios("POST", `/api/githubOuth`, param);
  return data;
}
