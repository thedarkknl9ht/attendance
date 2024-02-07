import { useContext } from "react";

import { dragContext } from "~/library/services";

interface iContext {
  dragged: string;
  dropped: string;
  setDragged: any;
  setDropped: any;
}

export const useDrag = () => <iContext>useContext(dragContext);
