import { App } from "antd";

import { IExclamation } from "~/components/ui/icons";

import { Textarea } from "~/library/components";

import { isEmpty } from "~/library/utils";

import i18n from "~/i18n";
////________________________________________________________________
const useMessage = () => {
  const { message, modal } = App.useApp();

  const success = (text: string) =>
    message.open({
      type: "success",
      content: i18n.t(text),
    });

  const warning = (text: string) =>
    message.open({
      type: "warning",
      content: i18n.t(text),
    });

  const error = (text: string) =>
    message.open({
      type: "error",
      content: i18n.t(text),
    });

  const dbError = (text: string | undefined, error: any = {}, form?: any) => {
    console.log(error);
    if (form) console.log(JSON.stringify(form));
    message.open({
      type: "error",
      content: i18n.t(text ?? "Unhandled Exception"),
    });
    return { status: false, error };
  };

  const confirm = async (
    text: string,
    onConfirm: Function,
    options?: { description?: string; onCancel?: Function }
  ) =>
    await modal.confirm({
      title: i18n.t(text),
      icon: <IExclamation />,
      content: options?.description,
      onOk() {
        if (onConfirm) onConfirm();
      },
      onCancel() {
        if (options?.onCancel) options?.onCancel();
      },
    });

  const inputBox = async (
    text: string,
    onConfirm: Function,
    options?: { required?: boolean; onCancel?: Function; defaultValue?: string }
  ) => {
    modal.confirm({
      title: i18n.t(text),
      icon: <IExclamation />,
      content: <Textarea id="inputBoxText" />,
      onOk() {
        const element: any = document.getElementById("inputBoxText");

        if (options?.required && isEmpty(element?.value)) return true;
        onConfirm(element?.value);
      },
      onCancel() {
        if (options?.onCancel) options?.onCancel();
      },
    });
  };
  ////________________________________________________________________
  return {
    success,
    warning,
    error,
    dbError,
    confirm,
    inputBox,
  };
};
////________________________________________________________________
export { useMessage };
