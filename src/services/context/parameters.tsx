import { createContext } from "react";

import { useAxiosPrivate } from "~/library/hooks";

import { useQuery } from "@tanstack/react-query";
////________________________________________________________________
const parametersContext = createContext({});
////________________________________________________________________
interface parametersProps {
  dataSource: string;
  children: React.ReactNode;
}
const ParametersProvider = ({ dataSource, children }: parametersProps) => {
  const axios = useAxiosPrivate();

  const { data: parameters } = useQuery({
    queryKey: ["Parameters"],
    queryFn: () => fetchParameters(),
    initialData: {},
  });

  const fetchParameters = async () =>
    await axios
      .fetch(dataSource)
      .then((response: any) => response)
      .catch(() => {});

  return (
    <parametersContext.Provider value={{ parameters }}>
      {children}
    </parametersContext.Provider>
  );
};
////________________________________________________________________
export { ParametersProvider, parametersContext };
