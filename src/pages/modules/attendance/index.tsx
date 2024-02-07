import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Maps, calculateDistance } from "~/components/ui/maps";

import { Button, Divider, Space } from "~/library/components";

import { useAxiosPrivate, useAuth, useMessage } from "~/library/hooks";

import i18n from "~/i18n";
/////////////////////////////////////////////////////////////////////////
const Attendance = () => {
  const { auth } = useAuth();

  const message = useMessage();

  const axios = useAxiosPrivate();
  /////////////////////////////////////////////////////////////////////////
  const [currentLocation, setCurrentLocation] = useState<any>({
    lat: 0,
    lng: 0,
  });
  /////////////////////////////////////////////////////////////////////////
  const { data: employee, isFetching } = useQuery({
    queryKey: ["EMPLOYEE", auth?.userID],
    queryFn: (key) => fetchEmployee(key),
    initialData: { location: "" },
    refetchOnWindowFocus: true,
  });

  const fetchEmployee = async ({ queryKey }: any) => {
    navigator.geolocation.getCurrentPosition(setCurrent);
    if (queryKey)
      return await axios
        .post("employees", {
          form: {
            filter: [
              { propertyName: "userID", operation: 0, value: auth.userID },
            ],
          },
        })
        .then((response) => {
          if (response?.data?.records?.length === 1)
            return response?.data?.records[0];

          return {};
        });

    return { location: "" };
  };

  function setCurrent(location: any) {
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    setCurrentLocation({ lat, lng });
  }
  /////////////////////////////////////////////////////////////////////////
  const { data: attendanceCount, refetch } = useQuery({
    queryKey: ["ATTENDANCE", employee?.employeeID],
    queryFn: (key) => fetchAttendance(key),
    initialData: 0,
    refetchOnWindowFocus: true,
  });

  const fetchAttendance = async ({ queryKey }: any) => {
    if (queryKey && employee.employeeID)
      return await axios
        .fetch("attendance/Today/" + employee.employeeID)
        .then((response) => response?.length);

    return 0;
  };
  /////////////////////////////////////////////////////////////////////////
  const workLocation = {
    lat: Number(employee?.location?.location?.split(",")[0]),
    lng: Number(employee?.location?.location?.split(",")[1]),
    title: "Work Location",
    circle: { radius: 804.672 },
  };

  const allowAttend = calculateDistance(currentLocation, workLocation) < 0.5;

  /////////////////////////////////////////////////////////////////////////
  const form = {
    employeeID: employee.employeeID,
    locationID: employee.locationID,
    attendLocation: `${currentLocation.lat},${currentLocation.lng}`,
  };

  const handleSubmit = () =>
    axios
      .post("attendance/attend", { form })
      .then(() => {
        message.success("form submitted");
        refetch();
      })
      .catch((error) => message.dbError(error));
  /////////////////////////////////////////////////////////////////////////
  return (
    !isFetching && (
      <React.Fragment>
        <Maps toggle={{ open: true }} markers={[workLocation]} />
        <Space style={{ padding: 20 }} split={<Divider type="vertical" />}>
          {allowAttend && (
            <Button onClick={handleSubmit}>{i18n.t("Attend")}</Button>
          )}
          <div style={{ fontSize: "larger", fontWeight: 600 }}>
            {attendanceCount}
          </div>
        </Space>
      </React.Fragment>
    )
  );
};

export default Attendance;
