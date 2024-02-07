import { isEmpty } from "~/library/utils";
////________________________________________________________________
import { useDrag } from "~/library/hooks";
////________________________________________________________________
interface props {
  onColumnChange?: Function;
  allowMove?: boolean;
}

export const useColumnDrag = (props: props) => {
  const dragDrop = useDrag();
  const column = dragDrop?.dragged;
  const newColumn = dragDrop?.dropped;
  ////______________________________________________________________

  const dragStart = (e: React.DragEvent, column: any) => {
    if (props.allowMove !== false) {
      dragDrop.setDragged(column.dataIndex);
      e.dataTransfer.effectAllowed = "copyMove";
    }
  };

  const dragEnter = (e: React.DragEvent, newColumn: any) => {
    if (props.allowMove !== false && column !== null) {
      dragDrop.setDropped(newColumn.dataIndex);
      e.dataTransfer.dropEffect = "copy";
    }
  };

  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (props.allowMove !== false && !isEmpty(newColumn)) {
      if (props.onColumnChange) props.onColumnChange(column, newColumn);
      dragDrop.setDragged();
      dragDrop.setDropped();
      e.dataTransfer.effectAllowed = "copyMove";
    }
  };

  return {
    dragColumn: column,
    dragStart,
    dragEnter,
    dragEnd,
  };
};
