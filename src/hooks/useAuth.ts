import { useContext } from "react";

import { authContext } from "~/services/context/auth";

interface iContext {
  auth: any;
  refetch: any;
  authStatus: string;
  entity: any;
  filterEntities: any;
  login: Function;
  logout: Function;
}

export const useAuth = () => <iContext>useContext(authContext);
