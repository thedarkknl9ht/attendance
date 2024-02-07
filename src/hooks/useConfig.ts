import { useContext } from "react";

import { configContext } from "~/library/services";

export const useConfig = () => <any>useContext(configContext);
