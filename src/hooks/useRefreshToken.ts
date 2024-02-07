import { useMessage } from "./useMessage";

import { useAxios } from "./useAxios";
////________________________________________________________________
const useRefreshToken = () => {
  const message = useMessage();
  ////________________________________________________________________
  const axios = useAxios();
  ////________________________________________________________________
  const refreshToken = async () => {
    const response = await axios
      .post("auth/refresh", { withCredentials: true })
      .then((response) => response.data);

    if (response === "TIME_OUT") {
      message.error("TIME_OUT");
    } else if (response) {
      console.clear();
      console.log("refreshed");
      return response;
    }
  };
  ////______________________________________________________________
  return { refreshToken };
};
////________________________________________________________________
export { useRefreshToken };
