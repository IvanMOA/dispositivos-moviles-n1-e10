import React from "react";
import Register from "./screens/register/Register";
import Login from "./screens/login/Login";
import { NativeBaseProvider, Text } from "native-base";
import { AuthProvider } from "./components/AuthProvider";
import { I18nProvider, useI18n } from "./components/I18nProvider";
import Home from "./screens/home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { Loading } from "./screens/loading/Loading";
import { View, StyleSheet, Button } from "react-native";
import { LangSelector } from "./components/LangSelector";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import "react-native-gesture-handler";
import MenuButtonItem from "./components/MenuButtonItem";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import ChatUserSelector from "./screens/chat-user-selector/ChatUserSelector";
import ChatMessages from "./screens/chat-messages/ChatMessages";
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <I18nProvider>
          <AuthProvider>
            <Drawer.Navigator
              drawerContent={(props) => <MenuItems {...props} />}
            >
              <Drawer.Screen
                name="Loading"
                component={Loading}
                options={{
                  headerShown: false,
                }}
              />
              <Drawer.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Drawer.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
              <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                  headerTitle: (props) => <HeaderTitle />,
                }}
              />
              <Drawer.Screen
                name="Chat"
                component={ChatUserSelector}
                options={{
                  headerTitle: (props) => <HeaderTitle />,
                }}
              />
              <Drawer.Screen
                name="ChatMessages"
                component={ChatMessages}
                options={({ navigation }) => ({
                  headerTitle: (props) => <HeaderTitle />,
                  headerLeft: () => (
                    <Button
                      title="asd"
                      onPress={() => navigation.navigate("Chat")}
                    >
                      Test
                    </Button>
                  ),
                })}
              />
            </Drawer.Navigator>
          </AuthProvider>
        </I18nProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
function HeaderTitle() {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <LangSelector style={{ marginLeft: 100 }} />
    </View>
  );
}

function MenuItems({ navigation }) {
  const { t } = useI18n();
  async function logout() {
    await signOut(auth);
  }
  return (
    <DrawerContentScrollView style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <MenuButtonItem
        text={t("home")}
        onPress={() => navigation.navigate("Home")}
      />
      <MenuButtonItem
        text={t("chat")}
        onPress={() => navigation.navigate("Chat")}
      />
      <MenuButtonItem
        text={"Chat messages TEMP"}
        onPress={() => navigation.navigate("ChatMessages")}
      />
      <MenuButtonItem text={t("sign_out")} onPress={logout} />
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  container: {
    padding: 15,
  },
});
