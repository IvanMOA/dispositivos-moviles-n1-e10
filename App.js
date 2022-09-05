import React from "react";
import Register from "./screens/register/Register";
import Login from "./screens/login/Login";
import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "./components/AuthProvider";
import { I18nProvider } from "./components/I18nProvider";
import Home from "./screens/home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Loading } from "./screens/loading/Loading";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <I18nProvider>
          <AuthProvider>
            <Stack.Navigator>
              <Stack.Screen
                name="Loading"
                component={Loading}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </AuthProvider>
        </I18nProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
