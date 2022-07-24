import React from "react";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";

import FeedPage from "../Pages/Feed";
import MessagesPage from "../Pages/Messages";
import ModalPageSettings from "../Parts/ModalPageSettings";
import Explorer from "../Pages/Explorer";
import Welcome from "../Pages/Welcome";
import {UserRole} from "../Utils/RolesList";
import UnauthorizedPage from "../Pages/Unauthorized";
import LogDetails from "../Pages/LogDetails";

import PrivateRoute from "./PrivateRoute";

const Routes: React.FC = () => {
  const location = useLocation();

  const background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <PrivateRoute allowedRoles={[UserRole.USER]} path={["/channel/:nameChannel", "/home"]}>
          <FeedPage />
        </PrivateRoute>
        <Route exact component={LogDetails} path="/logs/:logId" />
        <PrivateRoute allowedRoles={[UserRole.ADMIN]} path="/messages">
          <MessagesPage />
        </PrivateRoute>
        <Route component={Explorer} path="/explorer" />
        <Route component={UnauthorizedPage} path="/unauthorized" />
        <Route component={Welcome} path="/" />

        <Redirect to="/" />
      </Switch>

      {/* Show the modal when a background page is set */}
      {background && <Route component={ModalPageSettings} path="/settings" />}
    </>
  );
};

export default Routes;
