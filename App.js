import React from "react";
import Register from "./screens/register/Register";
import Login from "./screens/login/Login";
import { NativeBaseProvider } from "native-base";
import { NativeRouter, Route, Switch } from "react-router-native";
import { PrivateRoute } from "./components/PrivateRoute";
import { OnlyPublicRoute } from "./components/OnlyPublicRoute";
import { AuthProvider } from "./components/AuthProvider";
import { I18nProvider } from "./components/I18nProvider";
import Home from "./screens/home/Home";

export default function App() {
  return (
    <NativeBaseProvider>
      <I18nProvider>
        <AuthProvider>
          <NativeRouter>
            <Switch>
              <OnlyPublicRoute path="/login" exact redirectTo="/">
                <Login />
              </OnlyPublicRoute>
              {/*<Route component={Login} />*/}
              <Route path="/register" exact component={Register} />
              <PrivateRoute redirectTo="/login" path="/" exact>
                <Home />
              </PrivateRoute>
            </Switch>
          </NativeRouter>
        </AuthProvider>
      </I18nProvider>
    </NativeBaseProvider>
  );
}
