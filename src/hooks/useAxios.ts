import axios from "~/services/api/axios";
////________________________________________________________________
import { isEmpty } from "~/library/utils";
////________________________________________________________________
import { options } from "~/library/interfaces";

const useAxios = () => {
  const fetch = async (controller: string, options: options) =>
    await axios({
      method: "get",
      url: controller,
      params: options.params,
      responseType: options.responseType,
      withCredentials: options.withCredentials,
    })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error)
      });
  ////________________________________________________________________
  const getFormData = (fields: any) => {
    const formData = new FormData();
    for (const key in fields) {
      if (isEmpty(fields[key])) formData.append(key, "");
      else formData.append(key, fields[key]);
    }
    return formData;
  };

  const post = async (controller: string, options?: options) =>
    await axios({
      method: "post",
      url: controller,
      data:
        options?.dataType === "formData"
          ? getFormData(options?.form)
          : options?.form,
      params: options?.params,
      withCredentials: options?.withCredentials,
    })
      .then((response) => {
        return {
          status: response.statusText !== "Accepted",
          data: response.data,
        };
      })
      .catch((error) => {
        console.log(error)
        throw new Error(error.response.data["Message"]);
      });

  ////________________________________________________________________
  const download = (controller: string, options: options) =>
    axios({
      url: controller, //your url
      params: options?.params,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", options.name ?? "FileName"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  ////________________________________________________________________
  return { fetch, post, download };
};
////________________________________________________________________
export { useAxios };
