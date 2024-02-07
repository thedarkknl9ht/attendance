/**
 * * Views Hook
 * ? Active View - Default View - Create - Update - Delete
 */
import { useState, createContext, ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import i18n from "~/i18n";

import { isEmpty } from "~/library/utils";

import { useAuth, useAxiosPrivate, useMessage } from "~/library/hooks";
////________________________________________________________________
const viewsContext = createContext({});
////________________________________________________________________
import { view } from "~/interfaces/view";

interface viewProviderProps {
  name?: string;
  type?: "table" | "form" | "report";
  singleView?: boolean;
  children: ReactNode;
}

interface viewChangeProps {
  name?: string;
  viewOptions?: any;
  viewItems?: any;
}

const ViewsProvider = (props: viewProviderProps) => {
  const userID = useAuth()?.auth?.userID;

  const axios = useAxiosPrivate();

  const message = useMessage();
  ////________________________________________________________________
  const [activeView, setActiveView] = useState<view>();

  const [views, setViews] = useState<view[]>([]);

  const [activeViewItems, setActiveViewItems] = useState<any>([]);

  const [activeViewOptions, setActiveViewOptions] = useState<any>({});

  const [hasChanges, setHasChanges] = useState(false);
  ////______________________________________________________________
  const { data: viewsLoaded, refetch } = useQuery({
    queryKey: [props.name, props.type, userID],
    queryFn: () => fetchData(),
    initialData: false,
    refetchOnWindowFocus: false,
  });

  const fetchData = async () => {
    if (isEmpty(userID)) return false;

    if (props.name && props.type)
      return await axios
        .post("usersViews", {
          form: { userID, viewType: props.type, viewName: props.name },
        })
        .then((response: any) => {
          const activeView = defaultView(response.data.records);
          const standardView: view = {
            userID,
            viewType: props.type,
            viewName: props.name,
            viewID: i18n.t("Standard View"),
            viewStatus: "Shared",
            isDefault: !activeView,
            standardView: true,
          };
          activateView(activeView ?? standardView);
          setViews([standardView, ...response.data.records]);
          setHasChanges(false);
          return true;
        })
        .catch(() => true);

    return false;
  };

  const defaultView = (v = views) => v?.find((e) => e.isDefault);

  const getItemOptions = (name: string) => {
    const options = activeViewItems?.find(
      (ele: any) => ele.dataIndex?.toString() === name?.toString()
    )?.itemOptions;
    return !options ? {} : JSON.parse(options);
  };

  const activateView = (view: view) => {
    setActiveView(view);
    setActiveViewOptions(JSON.parse(view?.viewOptions ?? "{}"));
    setActiveViewItems(view?.items);
  };

  const handleViewChange = ({ viewOptions, viewItems }: viewChangeProps) => {
    if (viewOptions !== undefined) {
      viewOptions = { ...activeViewOptions, ...viewOptions };
      setActiveViewOptions(viewOptions);
      const newActiveView: any = {
        ...activeView,
        viewOptions: JSON.stringify(viewOptions),
      };
      setActiveView(newActiveView);
    } else if (viewItems !== undefined) {
      let newViewItems = [...(activeViewItems ?? [])];
      viewItems.forEach((element: any) => {
        const dataIndex = element?.dataIndex?.toString();
        const index = newViewItems.findIndex((e) => e.dataIndex === dataIndex);
        const prevOptions = getItemOptions(element.dataIndex);
        const newOptions = { ...prevOptions, ...element.itemOptions };
        if (index > -1) {
          newViewItems[index].itemOptions = JSON.stringify(newOptions);
        } else {
          newViewItems = [
            ...newViewItems,
            {
              userID,
              viewType: props.type,
              viewName: props.name,
              viewID: activeView?.viewID,
              dataIndex,
              itemOptions: JSON.stringify(newOptions),
            },
          ];
        }
      });

      setActiveViewItems(newViewItems);
    }
    setHasChanges(true);
  };

  ////______________________________________________________________
  const getActiveView = () =>
    activeView?.viewID
      ? {
          ...activeView,
          items: activeViewItems,
          userID,
          ownerID: activeView.userID,
        }
      : {
          userID,
          viewType: props.type,
          viewName: props.name,
          items: activeViewItems,
        };

  const update = () =>
    axios.post("usersViews/Update", { form: getActiveView() }).then(() => {
      message.success("Form Submitted");
      setHasChanges(true);
    });

  const pin = (view?: any) =>
    axios
      .post("usersViews/SetDefault", { form: view ?? getActiveView() })
      .then(() => {
        message.success("View Pinned");
        refetch();
      });
  ////________________________________________________________________
  const onCreate = (view: view) =>
    axios
      .post("usersViews", {
        form: { userID, viewType: props.type, viewName: props.name },
      })
      .then((response) => {
        activateView(view);
        const standardView: view = {
          userID,
          viewType: props.type,
          viewName: props.name,
          viewID: i18n.t("Standard View"),
          viewStatus: "Shared",
          isDefault: !defaultView(views),
          standardView: true,
        };
        setViews([standardView, ...response.data.records]);
        setHasChanges(false);
        return true;
      });

  const handleSubmit = () => {
    const form = {
      ...getActiveView(),
      viewID: "Standard",
      viewStatus: "Personal",
      standardView: false,
      isDefault: true,
    };
    const method = activeView?.standardView ? "Insert" : "Update";
    axios.post("usersViews/" + method, { form }).then(() => {
      message.success("View Submitted");
      refetch();
    });
  };
  ////________________________________________________________________
  return (
    <viewsContext.Provider
      value={{
        activeView,
        singleView: props.singleView,
        setActiveView,
        hasChanges,
        views,
        setViews,
        activeViewItems,
        setActiveViewItems,
        activateView,
        activeViewOptions,
        setActiveViewOptions,
        getItemOptions,
        viewsLoaded,
        refetch,
        getActiveView,
        handleViewChange,
        onCreate,
        update,
        pin,
        handleSubmit,
      }}
    >
      {props.children}
    </viewsContext.Provider>
  );
};

////________________________________________________________________
export { ViewsProvider, viewsContext };
