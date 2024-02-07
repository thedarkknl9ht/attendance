import { useState } from "react";
////________________________________________________________________
interface props {
  onColumnChange?: Function;
  allowResize?: boolean;
}

export const useColumnResize = (props: props) => {
  const language: string = "AR";
  ////______________________________________________________________
  const [pageX, setPageX] = useState<number | null>(null);
  ////______________________________________________________________
  const startResize = (e: React.DragEvent<HTMLDivElement>) => {
    if (props.allowResize !== false) {
      setPageX(e.pageX);
      e.dataTransfer.effectAllowed = "copyMove";
    }
  };

  const endResize = (e: React.DragEvent<HTMLDivElement>, column: any) => {
    if (props.allowResize !== false) {
      const startX = pageX ?? 0;
      const endX: number = e.pageX;
      let width = Number(column.width ?? 150);

      if (language === "AR") {
        width = width + (startX - endX);
        if (width < 0) {
          width = 50;
        }
        if (props.onColumnChange)
          props.onColumnChange(column.dataIndex, { width });
      }

      if (language === "EN") {
      }
    }
  };

  return { startResize, endResize };
};