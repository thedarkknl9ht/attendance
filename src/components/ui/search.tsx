import { Input } from "antd";

const { Search: Control } = Input;

export const Search = ({ onSearch }: any) => (
  <Control
    placeholder="input search text"
    allowClear
    onSearch={onSearch}
    style={{
      width: "100%",
      maxWidth: 304,
      display: "block",
      marginBottom: "10px",
    }}
  />
);
