import axios from "axios";
////________________________________________________________________
const publicURL = "http://pos.iknology.com:3000/api";

const baseURL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:5167/api"
    : publicURL;
////________________________________________________________________
export default axios.create({ baseURL });

export const axiosPrivate = axios.create({
  baseURL,
});
