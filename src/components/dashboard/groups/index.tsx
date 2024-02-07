import React from "react";

import styled from "styled-components";

import { Card } from "antd";

import { Button, IAdd, IDelete, IEdit, Popconfirm, Space } from "~/library/components";

import Widget from "../widgets/index";

import i18n from "~/i18n";

import { array } from "~/library/utils";

import { useDashboard, useToggle } from "~/library/hooks";

import Options from "./options";
import AddWidget from "../widgets/core/add";
import Empty from "./empty";

const GroupContainer = styled.div({
  padding: 5,
  borderRadius: 4,
});

const GroupContent = styled.div({
  padding: 2,
  display: "flex",
  flexDirection: "column",
  borderRadius: 4,
});

const GroupTitle = styled.div({
  padding: "10px 20px",
  fontWeight: 600,
});

const Group = ({ group }: any) => {
  const optionsToggle = useToggle();
  const addWidgetToggle = useToggle();

  const { deleteGroup } = useDashboard();

  const options = JSON.parse(group.groupOptions);

  const sortedWidgets = array.sort(group?.widgets, "widgetID");

  return (
    <React.Fragment>
      <GroupContainer style={{ width: options.width }}>
        <GroupContent data-role="group">
          {options.title && <GroupTitle>{options.title}</GroupTitle>}
          {sortedWidgets.map((widget: any) => (
            <Widget key={widget.widgetID} widget={widget} />
          ))}
          {sortedWidgets.length === 0 && (
            <Card>
              <Empty onLinkClick={addWidgetToggle.show} />
            </Card>
          )}
          <div data-role="customization">
            <Space wrap>
              <Button
                type="text"
                icon={<IAdd />}
                onClick={addWidgetToggle.show}
              >
                {i18n.t("Widget")}
              </Button>
              <Button
                type="primary"
                icon={<IEdit />}
                onClick={optionsToggle.show}
              >
                {i18n.t("Customize")}
              </Button>
              {sortedWidgets.length === 0 && (
                <Popconfirm
                  title="Are you sure ?"
                  onConfirm={() => deleteGroup(group)}
                >
                  <Button type="primary" danger icon={<IDelete />}>
                    {i18n.t("Delete Group")}
                  </Button>
                </Popconfirm>
              )}
            </Space>
          </div>
        </GroupContent>
      </GroupContainer>
      <AddWidget group={group} toggle={addWidgetToggle} />
      <Options group={group} toggle={optionsToggle} />
    </React.Fragment>
  );
};

export default Group;
