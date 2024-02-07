import { BrowserRouter, Routes, Route } from "react-router-dom";
////__________________________________________________________________
import Auth from "~/auth";
////__________________________________________________________________
import NoMatch from "./errors/noMatch";
////__________________________________________________________________
import RequireAuth from "./requireAuth";
////__________________________________________________________________
import SystemAdministration from "./modules/systemAdministration";
////__________________________________________________________________

import Dashboard from "./common/dashboard";
import UserSettings from "./common/core/userSettings";
import Attendance from "./modules/attendance";
////__________________________________________________________________
const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/************** Authentication **************/}
        <Route path="/login" element={<Auth />} />
        {/************** Protected Routes **************/}
        <Route path="" element={<RequireAuth />}>
          <Route path="" element={<Attendance />} />
          <Route path="/System/*" element={<SystemAdministration />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/Settings" element={<UserSettings />} />
        </Route>
        {/************** Templates **************/}
        {/************** No Match **************/}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
