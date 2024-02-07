import React, { useRef } from "react";

import { useQuery } from "@tanstack/react-query";

import { Collapse, Space, Tag } from "antd";

import { Button, Dropdown } from "~/library/components";

import {
  ICheck,
  ICollapse,
  IExpand,
  IHidden,
  IRename,
  IVisible,
  IMore,
} from "~/components/ui/icons";

import { isEmpty } from "~/library/utils";

import { useViews, useMessage } from "~/library/hooks";

import i18n from "~/i18n";

import { FormRow } from "./row";

export const Section = (props) => {
  const { name, children, showTitle, hidden } = props;

  const ref = useRef();

  const message = useMessage();

  const {
    activeViewItems,
    getItemOptions,
    activeViewOptions,
    handleViewChange,
  } = useViews() || {};

  const options = getItemOptions && getItemOptions(name);

  const label = !isEmpty(options?.label)
    ? options.label
    : props.label ?? i18n.t(name);

  const isHidden = activeViewOptions?.hiddenSections?.some((e) => e === name)
    ? activeViewOptions?.showMore !== true
    : hidden;

  const showMore = options?.showMore;
  const active = options?.active ?? props.active ?? true;

  const onShowMoreLessChange = () =>
    handleViewChange({
      viewItems: [{ dataIndex: name, itemOptions: { showMore: !showMore } }],
    });

  const onExpandCollapseChange = () =>
    handleViewChange({
      viewItems: [{ dataIndex: name, itemOptions: { active: !active } }],
    });

  const onRename = () =>
    message.inputBox(
      "Please Enter The New Title",
      (label) =>
        handleViewChange({
          viewItems: [{ dataIndex: name, itemOptions: { label } }],
        }),
      { defaultValue: label }
    );

  const {
    data: { allowShowMore, headerItems },
  } = useQuery({
    queryKey: ["SECTION", name, activeViewItems],
    queryFn: (key) => getExtraOptions(key),
    initialData: {},
    refetchOnWindowFocus: false,
  });

  const getExtraOptions = async () => ({
    allowShowMore: ref?.current?.querySelector(".ant-form-item-hidden"),
    headerItems: ref?.current?.querySelectorAll(".show-in-header"),
  });

  const getClass = () => {
    let className = "";
    className += showMore ? " show-more" : " show-less";
    className += showTitle === false ? " hide-title" : "";
    return className;
  };

  const onVisibleChange = () => {
    let hiddenSections = activeViewOptions?.hiddenSections ?? [];

    if (hiddenSections?.some((e) => e === name)) {
      hiddenSections = hiddenSections.filter((e) => e !== name);
    } else {
      hiddenSections.push(name);
    }

    handleViewChange({ viewOptions: { hiddenSections } });
  };

  const visibleIcon = activeViewOptions?.hiddenSections?.some(
    (e) => e === name
  ) ? (
    <IHidden />
  ) : (
    <IVisible />
  );

  const dropdownItems = [
    {
      label: i18n.t("Show / Hide"),
      icon: visibleIcon,
      onClick: onVisibleChange,
    },
    { label: i18n.t("Rename"), icon: <IRename />, onClick: onRename },
  ];

  const items = [
    {
      key: 1,
      label: (
        <SectionTitle
          active={active}
          label={label}
          name={name}
          headerItems={headerItems}
        />
      ),
      className: getClass(),
      extra: (
        <div className="collapse-extra">
          <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
            <IMore />
          </Dropdown>
        </div>
      ),
      collapsible: "icon",
      hidden: isHidden,
      children: (
        <div style={{ paddingTop: "30px" }}>
          <FormRow>{children}</FormRow>
          <ShowMore
            showMore={showMore}
            onClick={onShowMoreLessChange}
            hidden={!allowShowMore}
          />
        </div>
      ),
    },
  ];

  return (
    <Collapse
      ref={ref}
      items={items}
      activeKey={active !== false && ["1"]}
      bordered={false}
      expandIcon={({ isActive }) => (isActive ? <ICollapse /> : <IExpand />)}
      onChange={onExpandCollapseChange}
    />
  );
};

const SectionTitle = ({ active, label, headerItems }) => {
  const getHeaderItems = () => {
    let array = [];
    headerItems?.forEach((element) => {
      let valueElement = element.querySelector(":first-child");
      if (!isEmpty(valueElement.getAttribute("value"))) {
        let props = {};
        if (element.className.includes("data-boolean"))
          props = { color: "processing", icon: <ICheck /> };
        array.push({
          ...props,
          value: valueElement.getAttribute("value"),
        });
      }
    });

    return array;
  };

  return (
    <Space size={0}>
      <div>{label}</div>
      <div
        style={{ padding: "0 10px" }}
        hidden={headerItems?.length === 0 || active}
      >
        -
      </div>
      {active === false &&
        getHeaderItems()?.map((item, index) => (
          <Tag key={index} color={item.color} icon={item.icon} bordered={false}>
            {item.value}
          </Tag>
        ))}
    </Space>
  );
};

const ShowMore = ({ showMore, onClick, hidden }) => {
  return (
    !hidden && (
      <div style={{ textAlign: "end" }}>
        <Button.Link color="secondary" onClick={onClick}>
          {i18n.t(showMore ? "Show Less" : "Show More")}
        </Button.Link>
      </div>
    )
  );
};
