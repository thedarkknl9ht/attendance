import { useState, createContext, ReactNode } from "react";
////________________________________________________________________
const dragContext = createContext({});
////________________________________________________________________
const DragProvider = ({ children }: { children: ReactNode }) => {
  const [dragged, setDragged] = useState();
  const [dropped, setDropped] = useState();
  ////________________________________________________________________
  return (
    <dragContext.Provider value={{ dragged, dropped, setDragged, setDropped }}>
      <div style={{ display: "block", width: "100%" }}>{children}</div>
    </dragContext.Provider>
  );
};
////________________________________________________________________
export { DragProvider, dragContext };
