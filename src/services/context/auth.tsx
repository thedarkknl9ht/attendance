import { useState, useMemo, createContext, ReactNode } from "react";
////________________________________________________________________
import { useQuery } from "@tanstack/react-query";
////________________________________________________________________
import { useAxios } from "~/hooks/useAxios";
////________________________________________________________________
const authContext = createContext({});
////________________________________________________________________
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  ////________________________________________________________________
  const axios = useAxios();

  const [entity, setEntitiy] = useState<any>({});

  const [filterEntities, setFilterEntities] = useState<any>([]);
  ////________________________________________________________________
  const { data: auth, refetch } = useQuery({
    queryKey: ["AUTHENTICATE", localStorage.getItem("u")],
    queryFn: (key) => authenticate(key),
    initialData: {},
    refetchOnWindowFocus: true,
  });

  const authenticate = async ({ queryKey }: { queryKey: any }) => {
    if (queryKey && localStorage.getItem("u") !== null) {
      const response = await axios
        .fetch("auth/authenticate", {
          withCredentials: true,
          params: { userID: localStorage.getItem("u") },
        })
        .then((response) => {
          setEntitiy(response?.entity);

          const filter: any[] = [];
          if (!response.allEntites)
            response?.usersLegalEntities?.forEach((element: any) =>
              filter.push({
                propertyName: "entityID",
                operation: 0,
                value: element.entityID,
                optional: true,
              })
            );
          setFilterEntities(filter);

          return response;
        })
        .catch((error) => console.log(error));

      setIsLoaded(true);
      return response ?? {};
    }
    return {};
  };
  ////________________________________________________________________
  const authStatus =localStorage.getItem("u") && !isLoaded ? "loading" : auth?.userID ? "valid" : "invalid";
  ////________________________________________________________________
  const login = (userID: string) => {
    localStorage.setItem("u", userID);
    window.location.reload();
  };

  const logout = () => {
    axios
      .post("auth/logout", { withCredentials: true })
      .then((response) => response)
      .catch((error) => console.log(error));

    window.location.reload();
  };
  ////________________________________________________________________
  const contextValue = useMemo(() => {
    return {
      auth,
      refetch,
      authStatus,
      entity,
      filterEntities,
      login,
      logout,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, authStatus]);
  ////________________________________________________________________
  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};
////________________________________________________________________
export { AuthProvider, authContext };
