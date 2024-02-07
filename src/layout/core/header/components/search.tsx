import React from "react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { AutoComplete } from "~/library/components";

import { ISearch } from "~/components/ui/icons";

import { useConfig } from "~/hooks/useConfig";

import { privileges } from "~/project/data/privileges";

import { isEmpty } from "~/library/utils";

import i18n from "~/i18n";

const Search = () => {
  const { header } = useConfig();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [options, setOptions] = useState<any>([]);

  const handleSearch = (text: any) => {
    setSearch(text);
    setOptions(
      privileges.filter(
        (e) =>
          e.label &&
          text !== "" &&
          i18n.t(e.label).toLocaleLowerCase().includes(text)
      )
    );
  };

  const handleSelect = (value: any) => {
    navigate(value);
    setSearch("");
  };

  return (
    header.allowSearch && (
      <React.Fragment>
        <div>
          <ISearch />
        </div>
        <AutoComplete
          options={!isEmpty(search) && options}
          onSelect={handleSelect}
          onSearch={handleSearch}
          value={search}
          style={{ width: 200, border: "none", marginTop: 17 }}
          placeholder="Type Keyword"
          bordered={false}
        />
      </React.Fragment>
    )
  );
};

export default Search;
