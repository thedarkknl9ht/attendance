import { useQuery } from "@tanstack/react-query";

import { Input as Control } from "antd";

import { AutoComplete } from "../../library/components";

import { useAxiosPrivate } from "~/library/hooks";

import { inputSources } from "~/library/models";
import { useEffect, useState } from "react";

export const Input = ({ onValueChange, onChange, ...props }: any) => {
  const handleChange = (e: any) => {
    if (onChange) onChange(e);
    if (onValueChange) onValueChange(e);
  };

  return <Control {...props} autoComplete="off" onChange={handleChange} />;
};

Input.Password = ({ onValueChange, onChange, ...props }: any) => {
  const handleChange = (e: any) => {
    if (onChange) onChange(e);
    if (onValueChange) onValueChange(e);
  };

  return <Control.Password {...props} onChange={handleChange} />;
};

Input.AutoComplete = ({
  dataSource,
  filter,
  onValueChange,
  onChange,
  ...props
}: any) => {
  const axios = useAxiosPrivate();

  const inputSource = inputSources[dataSource];
  const valueField = inputSource?.valueField;

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search !== props.value) setSearch(props.value);
  }, [props.value]);

  const { data: options } = useQuery({
    queryKey: ["AUTOCOMPLETE", search],
    queryFn: (key) => fetchData(key),
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const fetchData = async ({ queryKey }: any) => {
    if (queryKey)
      return axios
        .post(inputSource.dataSource, {
          form: { search, pageSize: 20, filter },
        })
        .then((response) => {
          const options: any = [];

          response.data.records.forEach((element: any) => {
            if (!options.some((e: any) => e.value === element[valueField]))
              options.push({
                element,
                value: element[valueField],
                label: element[valueField],
              });
          });
          return options;
        });

    return [];
  };

  const handleChange = (value: any) => {
    setSearch(value);
    if (onChange) onChange(value);
    if (onValueChange) onValueChange(value);
  };

  return (
    <AutoComplete
    {...props}
      options={options}
      onSearch={(value: any) => setSearch(value)}
      onSelect={handleChange}
      value={search}      
    />
  );
};
