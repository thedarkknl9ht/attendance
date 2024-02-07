import React from "react";

import { useColumnDrag, useColumnResize } from "~/library/hooks";

interface titleProps {
  allowMove?: boolean;
  allowResize?: boolean;
  handleColumnChange?: Function;
  handleColumnPosChange?: Function;
  restProps: any;
}

const HeaderCell = ({
  allowMove,
  allowResize,
  handleColumnChange,
  handleColumnPosChange,
  restProps,
}: titleProps) => {
  const { dragStart, dragEnter, dragEnd } = useColumnDrag({
    allowMove: allowMove,
    onColumnChange: handleColumnPosChange,
  });

  const column = restProps.children[1]?.props?.column;

  const { startResize, endResize } = useColumnResize({
    allowResize: allowResize,
    onColumnChange: handleColumnChange,
  });

  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return !column ? (
    <th {...restProps}>{restProps.children}</th>
  ) : (
    <th {...restProps}>
      <div onDragOver={allowDrop} style={{ display: "flex" }}>
        <div
          className="col-title"
          onDragStart={(e) => allowMove && dragStart(e, column)}
          onDragEnter={(e) => allowMove && dragEnter(e, column)}
          onDragEnd={(e) => allowMove && dragEnd(e)}
          onDragOver={(e) => allowDrop(e)}
          draggable={allowMove}
        >
          {restProps.children}
        </div>
        <div
          className="col-resize"
          style={{ cursor: "e-resize" }}
          onDragStart={startResize}
          onDragEnd={(e) => endResize(e, column)}
          onDragOver={allowDrop}
          draggable={allowResize}
        ></div>
      </div>
    </th>
  );
};

export default HeaderCell;
