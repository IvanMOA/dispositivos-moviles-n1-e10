import React from "react";
import Register from "./screens/register/Register";
import Login from "./screens/login/Login";
import {
  Box,
  HamburgerIcon,
  HStack,
  Menu,
  NativeBaseProvider,
  Pressable,
  Stack,
  Text,
} from "native-base";
import { NativeRouter, Route, Switch } from "react-router-native";
import { View } from "react-native";
import { PrivateRoute } from "./components/PrivateRoute";
import { OnlyPublicRoute } from "./components/OnlyPublicRoute";
import { AuthProvider, useAuthStore } from "./components/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { I18nProvider, useI18n } from "./components/I18nProvider";
import { LangSelector } from "./components/LangSelector";
function Home() {
  const { user } = useAuthStore();
  const { t } = useI18n();
  async function logout() {
    await signOut(auth);
  }
  return (
    <View>
      <Stack space={4}>
        <HStack
          justifyContent="space-between"
          alignContent="center"
          px={5}
          py={5}
        >
          <Text></Text>
          <HStack
            justifyContent="space-between"
            alignContent="center"
            alignItems="center"
          >
            <LangSelector />
            <Box style={{ paddingRight: 20 }}></Box>
            <Menu
              shadow={2}
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                  >
                    <HamburgerIcon />
                  </Pressable>
                );
              }}
            >
              <Menu.Item onPress={logout}>{t("sign_out")}</Menu.Item>
            </Menu>
          </HStack>
        </HStack>
        <Stack px={5}>
          <Text>
            {t("welcome")} {user.displayName}
          </Text>
          <Text>
            {t("role")}: {t(user.photoURL.split("//")[1])}
          </Text>
        </Stack>
      </Stack>
    </View>
  );
}
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
