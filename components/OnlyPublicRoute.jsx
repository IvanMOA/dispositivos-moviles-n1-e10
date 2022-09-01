import React, { useContext } from "react";
import { Redirect, Route } from "react-router-native";
import { AuthContext } from "./AuthProvider";
import { Text } from "react-native";
export const OnlyPublicRoute = ({ path, exact, redirectTo, children }) => {
  const authStoreState = useContext(AuthContext);
  if (authStoreState.isAuthenticatingUser) {
    return <Text>Cargando</Text>;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={() =>
        authStoreState.user ? <Redirect to={redirectTo} /> : children
      }
    />
  );
};
