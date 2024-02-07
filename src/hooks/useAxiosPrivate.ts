import { useEffect } from "react";

import Cookies from "universal-cookie";

import { axiosPrivate } from "~/library/services";

import { isEmpty } from "~/library/utils";

import { useRefreshToken } from "./useRefreshToken";
////________________________________________________________________
import { options } from "~/interfaces/axios";

const useAxiosPrivate = () => {
  const { refreshToken } = useRefreshToken();
  ////________________________________________________________________
  useEffect(() => {
    const cookies = new Cookies();

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: any) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${cookies.get("auth")}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refreshToken();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
     
  }, [refreshToken]);

  ////________________________________________________________________
  const fetch = async (controller: string, options?: options) =>
    await axiosPrivate({
      method: "get",
      url: controller,
      params: options?.params,
      responseType: options?.responseType,
      withCredentials: options?.withCredentials,
    })
      .then((response: any) => response.data)
      .catch((error: any) => console.log(error));
  ////________________________________________________________________
  const getFormData = (fields: any = {}) => {
    const formData = new FormData();
    for (const key in fields) {
      if (isEmpty(fields[key])) formData.append(key, "");
      else if (key === "fileAttach") {
        formData.append(key, fields[key][0]?.originFileObj);
      } else formData.append(key, fields[key]);
    }
    return formData;
  };

  const post = async (controller: string, options?: options) =>
    await axiosPrivate({
      method: "post",
      url: controller,
      data:
        options?.dataType === "formData"
          ? getFormData(options?.form)
          : options?.form,
      params: options?.params,
      withCredentials: options?.withCredentials,
    })
      .then((response: any) => {
        return {
          status: response.statusText !== "Accepted",
          data: response.data,
        };
      })
      .catch((error: any) => {
        console.log(error);
        throw new Error(error.response.data["Message"]);
      });

  ////________________________________________________________________
  const download = (controller: string, options?: options) =>
    axiosPrivate({
      url: controller, //your url
      params: options?.params,
      method: "GET",
      responseType: "blob", // important
    }).then((response: any) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", options?.name ?? "Download"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  ////______________________________________________________________
  return { fetch, post, download };
};
////________________________________________________________________
export { useAxiosPrivate };
