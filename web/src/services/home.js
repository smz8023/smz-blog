import axios from "@utils/request";
export async function getBlogList() {

  return await axios("GET", `/api/blogList`);
}
export async function getBlogDetaile(id) {

  return await axios("GET", `/api/blogList/${id}`);
}
export async function getComment(id) {

  return await axios("GET", `/api/comment/${id}`);
}
