import { useContext } from "react";

import { parametersContext } from "~/library/services";

export const useParameters = () => <any>useContext(parametersContext);
