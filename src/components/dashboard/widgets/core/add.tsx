import { Card } from "antd";

import i18n from "~/i18n";

import { Drawer } from "~/library/components";

import { useDashboard } from "~/library/hooks";

interface textCustomizationProps {
  group: any;
  toggle: any;
}

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
  cursor: "pointer",
};

const AddWidget = ({ group, toggle }: textCustomizationProps) => {
  const { addWidget } = useDashboard();

  const handleAddWidget = (name: any) => {
    addWidget(name, group.groupID);
    toggle.close();
  };

  return (
    <Drawer title={"Add Widget"} size="large" toggle={toggle}>
      <Card bordered>
        <Card.Grid
          style={gridStyle}
          onClick={() => handleAddWidget("DataView")}
        >
          {i18n.t("DataView")}
        </Card.Grid>
      </Card>
    </Drawer>
  );
};

export default AddWidget;
