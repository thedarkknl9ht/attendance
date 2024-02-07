import { Avatar, List as _List } from "antd";

interface fileListProps {
  items: any[];
  loading?: boolean;
  actions?: Function;
  render?: Function;
}

export const List = (props: fileListProps) => {
  const { items, loading, actions, render } = props;

  return (
    <_List
      loading={loading}
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item) => (
        <_List.Item actions={actions && actions(item)}>
          <_List.Item.Meta
            avatar={<Avatar src={item.picture} />}
            title={item.label}
            description={item.description}
          />
          {render && render(item)}
        </_List.Item>
      )}
    />
  );
};
