import { useContext } from "react";

import { reportContext } from "~/library/services";

export const useReport = () => <any>useContext(reportContext);
