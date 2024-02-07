import React from "react";

import { useNavigate } from "react-router-dom";

import { IWelcome, IHomeFilled, Selection } from "~/library/components";

import { useConfig } from "~/hooks/useConfig";

import Item from "../core/item";

import { iconStyle } from "../style/icon";

import { useAuth, useAxiosPrivate, useToggle } from "~/library/hooks";

import { loadColumns } from "~/library/utils";

const Extra = () => {
  const navigate = useNavigate();

  const { header } = useConfig();

  return (
    header.allowExtra && (
      <React.Fragment>
        <Item
          text="Home"
          icon={<IHomeFilled style={iconStyle} />}
          onClick={() => navigate("/")}
        />
        <Entity />
      </React.Fragment>
    )
  );
};

const Entity = () => {
  const axios = useAxiosPrivate();

  const { auth, filterEntities, entity } = useAuth();

  const navigate = useNavigate();

  const toggle = useToggle();

  const columns = loadColumns("legalEntities");

  const handleConfirm = (entity: any) =>
    axios
      .post("users/update", { form: { ...auth, entityID: entity.entityID } })
      .then(() => navigate(0));

  return (
    <React.Fragment>
      <Item
        text={`Welcome${entity?.entityName ? ", " + entity?.entityName : ""}`}
        icon={<IWelcome style={iconStyle} />}
        onClick={toggle.show}
      />
      <Selection
        title="Please select a company"
        name="legalEntities"
        dataSource="legalEntities"
        keyField="entityID"
        columns={columns}
        filter={filterEntities}
        toggle={toggle}
        onConfirm={handleConfirm}
      />
    </React.Fragment>
  );
};

export default Extra;
