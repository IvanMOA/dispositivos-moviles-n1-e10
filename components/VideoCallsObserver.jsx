import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import { Button, Text, useToast } from "native-base";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useVideoCallStore } from "../stores/VideoCallStore";
import { userUserStore } from "../stores/UserStore";

export default function VideoCallsObserver() {
  const toast = useToast();
  const navigation = useNavigation();
  const videoCallStore = useVideoCallStore();
  const userStore = userUserStore();
  useEffect(() => {
    if (userStore.user === null) return () => {};
    console.log("listening");
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "channels"),
        where("callee", "==", userStore.user.id)
      ),
      (ss) => {
        ss.docChanges().forEach((change) => {
          console.log(change.doc.id);
          if (change.type !== "added") return;
          if (
            new Date().getTime() -
              change.doc.data().createdAt.toDate().getTime() >
            5000
          ) {
            return;
          }
          console.log("new doc, should be calling");
          const channel = { id: change.doc.id };
          const s = StyleSheet.create({
            container: {
              backgroundColor: "white",
              padding: 15,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
            },
            buttonsContainer: {
              marginTop: 5,
              display: "flex",
              flexDirection: "row",
            },
            btn: {
              width: "90%",
            },
          });
          const tryJoinCall = () => {
            videoCallStore.setChannelIdToJoin(channel.id);
            toast.closeAll();
            navigation.navigate("VideoCall");
          };
          toast.show({
            render: () => (
              <View style={s.container}>
                <Text>Tienes una nueva llamada</Text>
                <View style={s.buttonsContainer}>
                  <Button onPress={tryJoinCall} style={s.btn}>
                    Contestar
                  </Button>
                </View>
              </View>
            ),
          });
        });
      }
    );
    return () => unsubscribe();
  }, [userStore?.user?.id]);
  return <View></View>;
}
