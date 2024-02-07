import { isEmpty } from "~/library/utils";

import i18n from "~/i18n";

import Title from "./title";

const isEditing = (key: string, editingKey?: string | number) =>
  key === editingKey;

interface mergedColumnsProps {
  columns: any[];
  keyField: string;
  editingKey?: string | number;
  sorter?: any;
  allowMove?: boolean;
  allowResize?: boolean;
  allowEdit?: boolean;
  allowSort?: boolean;
  handleCellValueChange?: Function;
  handleColumnChange?: Function;
  handleColumnPosChange?: Function;
}

export const mergedColumns = ({
  columns,
  keyField,
  editingKey,
  sorter,
  allowMove,
  allowResize,
  allowEdit,
  allowSort,
  handleCellValueChange,
  handleColumnChange,
  handleColumnPosChange,
}: mergedColumnsProps) => {
  return columns
    .filter((e) => !e.hidden)
    .map((col, index) => {
      if (col.editable === false) {
        return {
          ...col,
          width: col.width ?? 170,
          ellipsis: true,
          title: (
            <Title
              column={col}
              allowMove={allowMove !== false && !col.fixed}
              allowResize={allowResize !== false}
              handleColumnChange={handleColumnChange}
              handleColumnPosChange={handleColumnPosChange}
            />
          ),
        };
      }

      const inputType = (record: any) =>
        typeof col.inputType === "function"
          ? col.inputType(record)
          : col.inputType;

      const inputSource = (record: any) =>
        typeof col.inputSource === "function"
          ? col.inputSource(record)
          : col.inputSource;

      const filter = (record: any) =>
        typeof col.filter === "function" ? col.filter(record) : col.filter;

      const required = (record: any) =>
        typeof col.required === "function"
          ? col.required(record)
          : col.required;

      const readOnly = (record: any) =>
        typeof col.readOnly === "function"
          ? col.readOnly(record)
          : col.readOnly;

      const autoFocus = (record: any) => {
        if (!isEmpty(record[col.dataIndex])) return false;
        if (col.autoFocus) {
          const focusedIndex = columns.findIndex(
            (e) =>
              !(typeof e.readOnly === "function"
                ? e.readOnly(record)
                : e.readOnly)
          );

          return focusedIndex >= index;
        }
      };

      // Sorting
      const sortable =
        col.dataIndex &&
        !Array.isArray(col.dataIndex) &&
        allowSort &&
        col.sorter !== false;

      const sorterProps = sortable
        ? {
            sorter: true,
            sortOrder:
              col.dataIndex.toString() === sorter.field ? sorter.order : null,
          }
        : {};

      return {
        ...col,
        ...sorterProps,
        width: col.width ?? 170,
        ellipsis: true,
        title: () => (
          <Title
            column={col}
            allowMove={allowMove !== false && !col.fixed}
            allowResize={allowResize !== false}
            handleColumnChange={handleColumnChange}
            handleColumnPosChange={handleColumnPosChange}
          />
        ),
        onCell: (record: any) => ({
          record,
          inputType: inputType(record),
          inputSource: inputSource(record),
          filter: filter(record),
          inputFK: col.inputFK,
          title: col.title ?? i18n.t(col.dataIndex),
          dataIndex: col.dataIndex,
          required: required(record),
          readOnly: readOnly(record),
          autoFocus: autoFocus(record),
          editing: allowEdit && isEditing(record[keyField], editingKey),
          onChange: col.onChange,
          handleCellValueChange,
        }),
      };
    });
};
