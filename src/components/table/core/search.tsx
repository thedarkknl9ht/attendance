import { Divider, Input } from "antd";

import { ISearch, Space, Search as _Search } from "~/library/components";

interface searchProps {
  search?: string | null;
  onSearch: Function;
}

export const Search = ({ onSearch }: searchProps) => (
  <Space
    style={{ marginBottom: 10, width: "100%" }}
    split={<Divider type="vertical" />}
  >
    <ISearch style={{ color: "rgb(190,190,190)" }} />
    <Input
      onBlur={(e) => onSearch({ search: e.target.value })}
      style={{ border: "none", width: "350px" }}
      placeholder="Search ..."
      bordered={false}
    />
    <div></div>
  </Space>
);
