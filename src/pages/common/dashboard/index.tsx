import { DashboardProvider } from "~/library/services";

import { Dashboard } from "~/library/components";

const UserDashboard = () => {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
};

export default UserDashboard;
