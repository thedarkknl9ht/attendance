import React from "react";

import styled from "styled-components";

import {
  Button,
  FloatButton,
  IAdd,
  IDelete,
  IPin,
  IRename,
} from "~/library/components";

import { useDashboard, useToggle, useMessage, useAccess } from "~/library/hooks";

import i18n from "~/i18n";

import { array } from "~/library/utils";

import Group from "./groups";
import Create from "./core/create";

const Content = styled.div({
  display: "flex",
  boxSizing: "border-box",
  width: "100%",
  flexWrap: "wrap",
  padding: "20px 0",
});

export const Dashboard = () => {
  const { hasAccess } = useAccess();

  const toggle = useToggle();

  const message = useMessage();

  const {
    activeDashboard,
    activeGroups,
    addGroup,
    updateDashboard,
    deleteDashboard,
  } = useDashboard();

  const sortedGroups = array.sort(activeGroups, "groupID");

  return (
    hasAccess({ name: "dashboard", type: "read" }) && (
      <React.Fragment>
        <Content>
          {sortedGroups.map((group: any) => (
            <Group key={group.groupID} group={group} />
          ))}
          <div data-role="customization">
            <Button
              type="dashed"
              style={{ height: "100px" }}
              onClick={() => addGroup()}
            >
              <div>
                <IAdd style={{ fontSize: "30px" }} />
              </div>
              {i18n.t("Add Group")}
            </Button>
          </div>
        </Content>
        <FloatButton.Group type="primary" shape="square">
          {activeDashboard.isDefault === false && (
            <React.Fragment>
              <FloatButton
                type="primary"
                icon={<IPin />}
                onClick={() =>
                  updateDashboard({ ...activeDashboard, isDefault: true })
                }
              />
            </React.Fragment>
          )}

          {activeDashboard.dashboardID && (
            <React.Fragment>
              {hasAccess({ name: "dashboard", type: "delete" }) &&
                activeGroups?.length === 0 && (
                  <FloatButton
                    type="primary"
                    icon={<IDelete />}
                    onClick={deleteDashboard}
                  />
                )}
              {hasAccess({ name: "dashboard", type: "update" }) && (
                <FloatButton
                  type="primary"
                  icon={<IRename />}
                  onClick={() =>
                    message.inputBox(
                      i18n.t("Enter the new name"),
                      (dashboardName: any) =>
                        updateDashboard({ ...activeDashboard, dashboardName })
                    )
                  }
                />
              )}
            </React.Fragment>
          )}
          {hasAccess({ name: "dashboard", type: "create" }) && (
            <FloatButton type="primary" icon={<IAdd />} onClick={toggle.show} />
          )}
        </FloatButton.Group>
        <Create toggle={toggle} />
      </React.Fragment>
    )
  );
};
