import { useContext } from "react";

import { dashboardContext } from "~/library/services";

import { array } from "~/library/utils";

import { useAuth, useMessage, useAxiosPrivate } from "~/library/hooks";

export const useDashboard = () => {
  const userID = useAuth()?.auth?.userID;

  const message = useMessage();

  const axios = useAxiosPrivate();
  ////________________________________________________________________
  const {
    activeDashboard,
    activeGroups,
    setActiveGroups,
    setActiveDashboard,
    customization,
    setCustomization,
    refresh,
  } = <any>useContext(dashboardContext);
  ////________________________________________________________________
  const createDashboard = (form: any, callBack: any) => {
    axios.post("dashboards/Insert", { form }).then(() => {
      message.success("Dashboard Created");
      refresh();
      if (callBack)
        callBack();
    });
  };

  const updateDashboard = (form: any) => {
    axios.post("dashboards/Update", { form }).then(() => {
      message.success("Dashboard Updated");
      setActiveDashboard(form);
      refresh();
    });
  };

  const deleteDashboard = () => {
    message.confirm("Are you Sure", () =>
      axios
        .post("dashboards/Delete", {
          params: {
            userID,
            id: activeDashboard.dashboardID,
          },
        })
        .then(() => {
          message.success("Dashboard Deleted");
          refresh();
        })
    );
  };
  ////________________________________________________________________
  const addGroup = () => {
    const form = {
      userID,
      dashboardID: activeDashboard.dashboardID,
      groupID: array.newKey(activeGroups, "groupID"),
      groupOptions: JSON.stringify({ width: "50%" }),
    };

    setActiveGroups([...activeGroups, form]);

    axios.post("dashboards/CreateGroup", { form }).then(() => {
      message.success("Dashboard Group Added");
      refresh();
    });
  };

  const updateGroup = (form: any) => {
    const index = activeGroups.findIndex((e: any) => e.groupID === form.groupID);
    const newGroups = [...activeGroups];
    newGroups[index] = { ...form };
    setActiveGroups(newGroups);

    axios.post("dashboards/UpdateGroup", { form }).then(() => {
      message.success("Dashboard Group Updated");
      refresh();
    });
  };

  const deleteGroup = (form: any) => {
    setActiveGroups(
      activeGroups.filter((e: any) => e.groupID !== form.groupID)
    );
    axios.post("dashboards/DeleteGroup", { form }).then(() => {
      message.success("Dashboard Group Deleted");
      refresh();
    });
  };

  const addWidget = (widgetType: string, groupID: number) => {
    const index = activeGroups.findIndex((e: any) => e.groupID === groupID);
    const group = activeGroups[index];
    const widgets = group.widgets ?? [];

    const form = {
      userID,
      dashboardID: activeDashboard.dashboardID,
      widgetID: array.newKey(widgets, "widgetID"),
      widgetType,
      groupID,
    };

    const newGroups = [...activeGroups];
    newGroups[index] = { ...group, widgets: [...widgets, form] };

    setActiveGroups(newGroups);

    axios.post("dashboards/CreateWidget", { form }).then(() => {
      message.success("Dashboard Widget Added");
      refresh();
    });
  };

  const updateWidget = (form: any) => {
    const groupIndex = activeGroups.findIndex(
      (e: any) => e.groupID === form.groupID
    );
    const group = activeGroups[groupIndex];
    const widgets = group.widgets;

    const widgetIndex = widgets.findIndex(
      (e: any) => e.widgetID === form.widgetID
    );
    const newWidgets = [...widgets];
    newWidgets[widgetIndex] = { ...form };

    const newGroups = [...activeGroups];
    newGroups[groupIndex] = { ...group, widgets: newWidgets };

    setActiveGroups(newGroups);

    axios.post("dashboards/UpdateWidget", { form }).then(() => {
      message.success("Dashboard Widget Updated");
      refresh();
    });
  };

  const deleteWidget = (form: any) => {
    const index = activeGroups.findIndex((e: any) => e.groupID === form.groupID);
    const group = activeGroups[index];
    const newWidgets = group?.widgets?.filter(
      (e: any) => e.widgetID !== form.widgetID
    );

    const newGroups = [...activeGroups];
    newGroups[index] = { ...group, widgets: newWidgets };
    setActiveGroups(newGroups);
    axios.post("dashboards/DeleteWidget", { form }).then(() => {
      message.success("Dashboard Widget Deleted");
      refresh();
    });
  };

  return {
    activeDashboard,
    activeGroups,
    customization,
    setCustomization,
    createDashboard,
    updateDashboard,
    deleteDashboard,
    addGroup,
    updateGroup,
    deleteGroup,
    addWidget,
    updateWidget,
    deleteWidget,
    refresh,
  };
};
