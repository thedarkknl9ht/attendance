import React from "react";

import i18n from "~/i18n";

import { useColumnDrag, useColumnResize } from "~/library/hooks";

interface titleProps {
  column: any;
  allowMove?: boolean;
  allowResize?: boolean;
  handleColumnChange?: Function;
  handleColumnPosChange?: Function;
}

const Title = ({
  column,
  allowMove,
  allowResize,
  handleColumnChange,
  handleColumnPosChange,
}: titleProps) => {
  const { dragStart, dragEnter, dragEnd } = useColumnDrag({
    allowMove,
    onColumnChange: handleColumnPosChange,
  });

  const { startResize, endResize } = useColumnResize({
    allowResize,
    onColumnChange: handleColumnChange,
  });

  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <div onDragOver={allowDrop} style={{ display: "flex" }}>
        <div
          className="col-title"
          onDragStart={(e) => allowMove && dragStart(e, column)}
          onDragEnter={(e) => allowMove && dragEnter(e, column)}
          onDragEnd={(e) => allowMove && dragEnd(e)}
          onDragOver={(e) => allowDrop(e)}
          draggable={allowMove}
        >
          {column.title ?? i18n.t(column.dataIndex)}
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
    </React.Fragment>
  );
};

export default Title;
