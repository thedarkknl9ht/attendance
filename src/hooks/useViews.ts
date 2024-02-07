import { useContext } from "react";

import { viewsContext } from "~/services/context/views";

interface iContext {
  activeView: any;
  setActiveView: Function;
  views: Array<any>;
  hasChanges: boolean;
  singleView?:boolean,
  setViews: Function;
  activeViewItems: Array<any>;
  setActiveViewFields: Function;
  activateView: Function;
  activeViewOptions: any;
  setActiveViewOptions: Function;
  getItemOptions: Function;
  refetch: Function;
  viewsLoaded: boolean;
  getActiveView: Function;
  handleViewChange: Function;
  onCreate: Function;
  update: Function;
  pin: Function;
  handleSubmit: Function;
}

export const useViews = () => <iContext>useContext(viewsContext);
