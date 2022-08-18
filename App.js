import React from "react";
import Register from "./screens/register/Register";
import { NativeBaseProvider } from "native-base";
export default function App() {
  return (
    <NativeBaseProvider>
      <Register />
    </NativeBaseProvider>
  );
}
