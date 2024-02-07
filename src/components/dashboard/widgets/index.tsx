import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { Card } from "antd";

import { ViewsProvider } from "~/library/services";

import {
  Button,
  ICustomLink,
  IDelete,
  IEdit,
  ISettings,
  Popconfirm,
  Space,
} from "~/library/components";

import { useDashboard, useToggle } from "~/library/hooks";

import i18n from "~/i18n";

import getOptions from "../utils/getOptions";

import Options from "./options";

import DataView from "./core/dataview";

interface widgetProps {
  widget: any;
}

const WidgetContainer = styled.div({
  width: "100%",
  padding: 5,
});

const Widget = ({ widget }: widgetProps) => {
  const navigate = useNavigate();

  const dataOptionsToggle = useToggle();
  const widgetOptionsToggle = useToggle();

  const { deleteWidget } = useDashboard();

  const widgetOptions = getOptions(widget.widgetOptions);

  const dataOptions = getOptions(widget.dataOptions);

  const handleCustomLinkClick = () => {
    if (widgetOptions.customLinkNewTab)
      window.open("/" + widgetOptions.customLink, "_blank");
    else navigate("/" + widgetOptions.customLink);
  };

  return (
    <WidgetContainer>
      <Card
        title={widgetOptions.title}
        style={{
          overflow: "auto",
          height: widgetOptions?.height,
        }}
        headStyle={{ textAlign: widgetOptions.titleAlign }}
        actions={
          widgetOptions.actionsLocation === "Bottom"
            ? [
                widgetOptions.customLink && (
                  <ICustomLink onClick={handleCustomLinkClick} />
                ),
                <ISettings onClick={widgetOptionsToggle.show} />,
                <IEdit onClick={dataOptionsToggle.show} />,
                <Popconfirm
                  title={i18n.t("Are you sure")}
                  onConfirm={() => deleteWidget(widget)}
                >
                  <IDelete />
                </Popconfirm>,
              ]
            : []
        }
        extra={
          widgetOptions.actionsLocation !== "Bottom" && (
            <Space>
              {widgetOptions.customLink && (
                <Button
                  type="text"
                  icon={<ICustomLink style={{ color: "#999" }} />}
                  onClick={handleCustomLinkClick}
                />
              )}
              <Button
                type="text"
                icon={<ISettings style={{ color: "#999" }} />}
                onClick={widgetOptionsToggle.show}
              />
              <Button
                type="text"
                icon={<IEdit style={{ color: "#999" }} />}
                onClick={dataOptionsToggle.show}
              />
              <Popconfirm
                title={i18n.t("Are you sure")}
                onConfirm={() => deleteWidget(widget)}
              >
                <Button
                  type="text"
                  icon={<IDelete style={{ color: "#999" }} />}
                />
              </Popconfirm>
            </Space>
          )
        }
        bordered={false}
      >
        {widget.widgetType === "DataView" ? (
          <ViewsProvider name={dataOptions.name} type="table" singleView>
            <DataView {...widget} toggle={dataOptionsToggle} />
          </ViewsProvider>
        ) : null}
      </Card>
      <Options widget={widget} toggle={widgetOptionsToggle} />
    </WidgetContainer>
  );
};

export default Widget;
