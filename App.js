import React, { useEffect } from "react";
import Register from "./screens/register/Register";
import Login from "./screens/login/Login";
import { Icon, NativeBaseProvider, Text } from "native-base";
import { AuthProvider } from "./components/AuthProvider";
import { I18nProvider, useI18n } from "./components/I18nProvider";
import Home from "./screens/home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { Loading } from "./screens/loading/Loading";
import {
  View,
  StyleSheet,
  Button,
  Pressable,
  PermissionsAndroid,
} from "react-native";
import { LangSelector } from "./components/LangSelector";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import "react-native-gesture-handler";
import MenuButtonItem from "./components/MenuButtonItem";
import { signOut } from "firebase/auth";
import { auth, firestore } from "./firebase";
import ChatUserSelector from "./screens/chat-user-selector/ChatUserSelector";
import ChatMessages from "./screens/chat-messages/ChatMessages";
import { onSnapshot, collection, where, query } from "firebase/firestore";
import { userUserStore } from "./stores/UserStore";
import { useChatsStore } from "./stores/ChatsStore";
import { FontAwesome } from "@expo/vector-icons";
import VideoCall from "./screens/video-call/VideoCall";
import VideoCallsObserver from "./components/VideoCallsObserver";
import PendingAcceptableChats from "./screens/pending-acceptable-chats/PendingAcceptableChats";
import { theme } from "./theme";
import { ProductFormScreen } from "./screens/create-sellable-item/ProductFormScreen";
import ProductDetailScreen from "./screens/product-detail/ProductDetailScreen";
import MyLocation from "./screens/my-location/MyLocation";
import SellerStatistics from "./screens/statistics/SellerStatistics";
const Drawer = createDrawerNavigator();
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
export default function App() {
  const userStore = userUserStore();
  const chatsStore = useChatsStore();
  useEffect(() => {
    if (userStore.user === null) return () => {};
    const unsubscribe = onSnapshot(
      collection(firestore, "chats"),
      { includeMetadataChanges: true },
      (querySnapshot) => {
        const chats = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        chatsStore.addChats(chats);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [userStore.user]);
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <I18nProvider>
          <AuthProvider>
            <VideoCallsObserver />
            <Drawer.Navigator
              detachInactiveScreens={true}
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
                name="PendingAcceptableChats"
                component={PendingAcceptableChats}
                options={{
                  headerTitle: (props) => <HeaderTitle />,
                }}
              />
              <Drawer.Screen
                name="ChatMessages"
                component={ChatMessages}
                options={({ navigation }) => ({
                  headerTitle: (props) => (
                    <HeaderTitle>
                      <Pressable
                        onPress={() => navigation.navigate("VideoCall")}
                        style={{
                          marginRight: 20,
                        }}
                      >
                        <Icon as={FontAwesome} name="video-camera" />
                      </Pressable>
                    </HeaderTitle>
                  ),
                  headerLeft: () => (
                    <Pressable
                      onPress={() => navigation.navigate("Chat")}
                      style={{
                        marginLeft: 20,
                      }}
                    >
                      <Icon as={FontAwesome} name="chevron-left" />
                    </Pressable>
                  ),
                })}
              />
              <Drawer.Screen name="VideoCall" component={VideoCall} />
              <Drawer.Screen
                name="ProductForm"
                component={ProductFormScreen}
                options={({ navigation }) => ({
                  headerTintColor: "transparent",
                  unmountOnBlur: true,
                  headerTransparent: true,
                  headerLeft: () => (
                    <Pressable
                      onPress={() => navigation.navigate("Home")}
                      style={{
                        marginLeft: 20,
                      }}
                    >
                      <Icon as={FontAwesome} name="chevron-left" />
                    </Pressable>
                  ),
                })}
              />
              <Drawer.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={({ navigation }) => ({
                  headerTintColor: "transparent",
                  headerTransparent: true,
                  headerLeft: () => (
                    <Pressable
                      onPress={() => navigation.navigate("Home")}
                      style={{
                        marginLeft: 20,
                      }}
                    >
                      <Icon as={FontAwesome} name="chevron-left" />
                    </Pressable>
                  ),
                })}
              />
              <Drawer.Screen
                options={{
                  headerTitle: "Mi ubicación",
                }}
                name="MyLocation"
                component={MyLocation}
              />
              <Drawer.Screen
                options={{
                  headerTitle: "Estadísticas",
                }}
                name="SellerStatistics"
                component={SellerStatistics}
              />
            </Drawer.Navigator>
          </AuthProvider>
        </I18nProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
function HeaderTitle({ children }) {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {children}
      <LangSelector style={{ marginLeft: 100 }} />
    </View>
  );
}

function MenuItems({ navigation }) {
  const { t } = useI18n();
  const userStore = userUserStore();
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
        text={t("chats_pending_to_accept")}
        onPress={() => navigation.navigate("PendingAcceptableChats")}
      />
      {userStore?.user?.role === "seller" && (
        <MenuButtonItem
          text={t("statistics")}
          onPress={() => navigation.navigate("SellerStatistics")}
        />
      )}
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
