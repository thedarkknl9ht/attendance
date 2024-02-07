import axios from "axios";
////________________________________________________________________
const publicURL = "https://thedarkknl9ht-001-site1.ftempurl.com/api";

const baseURL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:5167/api"
    : publicURL;
////________________________________________________________________
export default axios.create({ baseURL });

export const axiosPrivate = axios.create({
  baseURL,
});
