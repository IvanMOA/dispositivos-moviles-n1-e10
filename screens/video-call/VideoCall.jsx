import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  mediaDevices,
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
} from "react-native-webrtc";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  answerCandidatesCollection,
  firestore,
  offerCandidatesCollection,
} from "../../firebase";
import { useVideoCallStore } from "../../stores/VideoCallStore";
import { useChatsStore } from "../../stores/ChatsStore";
import { userUserStore } from "../../stores/UserStore";
import { useNavigation } from "@react-navigation/native";
import { Icon, useToast } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

export default function VideoCall() {
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [webcamStarted, setWebcamStarted] = useState(false);
  const [channelId, setChannelId] = useState(null);
  const peerConnection = useRef();
  const navigation = useNavigation();
  const videoCallStore = useVideoCallStore();
  const userStore = userUserStore();
  const chatStore = useChatsStore();
  const toast = useToast();
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  const startWebcam = async () => {
    try {
      peerConnection.current = new RTCPeerConnection(servers);
      const local = await mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      peerConnection.current.addStream(local);
      setLocalStream(local);
      const remote = new MediaStream();
      setRemoteStream(remote);
      local.getTracks().forEach((track) => {
        peerConnection.current.getLocalStreams()[0].addTrack(track);
      });
      peerConnection.current.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remote.addTrack(track);
        });
      };
      peerConnection.current.onaddstream = (event) => {
        setRemoteStream(event.stream);
      };
      setWebcamStarted(true);
    } catch (e) {
      toast.show({
        description: e,
      });
      console.log("Error: ", e);
    }
  };
  function listenDisconnect() {
    peerConnection.current.oniceconnectionstatechange = function () {
      try {
        if (
          !["disconnected", "closed"].includes(
            peerConnection?.current?.iceConnectionState
          )
        )
          return;
        setChannelId(null);
        setRemoteStream(null);
        setLocalStream(null);
        setWebcamStarted(null);
        peerConnection.current = null;
        videoCallStore.setChannelIdToJoin(null);
        navigation.navigate("Home");
      } catch (e) {}
    };
  }
  async function startCall() {
    try {
      const channelDoc = doc(
        firestore,
        "channels",
        new Date().getTime().toString()
      );
      peerConnection.current.onicecandidate = async (event) => {
        await addDoc(
          offerCandidatesCollection(channelDoc.id),
          event.candidate.toJSON()
        );
      };
      const offerDescription = await peerConnection.current.createOffer();
      peerConnection.current.setLocalDescription(offerDescription);
      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };
      await setDoc(channelDoc, {
        offer,
        callee:
          chatStore.selectedChat().createdToUser.id === userStore.user.id
            ? chatStore.selectedChat().createdByUser.id
            : chatStore.selectedChat().createdToUser.id,
        createdAt: new Date(),
      });
      onSnapshot(channelDoc, { includeMetadataChanges: true }, (snapshot) => {
        const data = snapshot.data();
        if (!peerConnection.current.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          peerConnection.current.setRemoteDescription(answerDescription);
        }
      });
      onSnapshot(answerCandidatesCollection(channelDoc.id), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            peerConnection.current.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
      listenDisconnect();
    } catch (e) {
      toast.show({
        description: e,
      });
      console.log(e);
    }
  }
  async function joinCall(channelId) {
    try {
      const channelDoc = doc(firestore, "channels", channelId);
      peerConnection.current.onicecandidate = async (event) => {
        if (event.candidate) {
          await addDoc(
            answerCandidatesCollection(channelDoc.id),
            event.candidate.toJSON()
          );
        }
      };
      const channelDocument = await getDoc(channelDoc);
      const channelData = channelDocument.data();
      const offerDescription = channelData.offer;
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );
      const answerDescription = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answerDescription);
      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };
      await updateDoc(channelDoc, { answer });
      onSnapshot(offerCandidatesCollection(channelDoc.id), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            peerConnection.current.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
      listenDisconnect();
    } catch (e) {
      console.log(e);
    }
  }
  async function closeCall() {
    peerConnection.current.close();
  }
  useEffect(() => {
    const tmp = async () => {
      await startWebcam();
      await joinCall(videoCallStore.channelIdToJoin);
      videoCallStore.setChannelIdToJoin(null);
    };
    if (videoCallStore.channelIdToJoin !== null) {
      tmp();
    }
  }, [videoCallStore.channelIdToJoin]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (videoCallStore.channelIdToJoin === null) {
        startWebcam().then(() => startCall());
        setTimeout(() => {
          if (peerConnection?.current?.iceConnectionState !== "completed") {
            closeCall();
          }
        }, 70000);
      }
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <KeyboardAvoidingView style={styles.body} behavior="position">
      <SafeAreaView style={styles.sav}>
        {remoteStream && (
          <RTCView
            streamURL={remoteStream?.toURL()}
            style={{ ...styles.stream, ...styles.other }}
            objectFit="cover"
            mirror
          />
        )}

        {localStream && (
          <RTCView
            streamURL={localStream?.toURL()}
            style={{ ...styles.stream, ...styles.me }}
            objectFit="cover"
            mirror
          />
        )}
        {webcamStarted && (
          <View
            style={{
              position: "absolute",
              bottom: 20,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={closeCall}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#dc2626",
              }}
            >
              <Icon
                as={FontAwesome}
                style={{ color: "white", marginLeft: 5 }}
                name="close"
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.buttons}>
          {/*{!webcamStarted && (*/}
          {/*  <Button title="Start webcam" onPress={startWebcam} />*/}
          {/*)}*/}
          {/*{webcamStarted && <Button title="Start call" onPress={startCall} />}*/}
          {/*{webcamStarted && (*/}
          {/*  <View style={{ flexDirection: "row" }}>*/}
          {/*    <Button title="Join call" onPress={joinCall} />*/}
          {/*    <TextInput*/}
          {/*      value={channelId}*/}
          {/*      placeholder="callId"*/}
          {/*      minLength={45}*/}
          {/*      style={{ borderWidth: 1, padding: 5 }}*/}
          {/*      onChangeText={(newText) => setChannelId(newText)}*/}
          {/*    />*/}
          {/*  </View>*/}
          {/*)}*/}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    justifyContent: "center",
    ...StyleSheet.absoluteFill,
  },
  sav: {
    width: "100%",
    height: "100%",
  },
  stream: {
    flex: 2,
    width: 200,
    height: 200,
  },
  me: {
    position: "absolute",
    width: 100,
    height: 200,
    borderColor: "red",
    top: 10,
    left: 10,
    zIndex: 1000,
  },
  other: {
    width: "100%",
    // height: "100%",
  },
  closeCallBtn: {
    marginBottom: 10,
  },
  buttons: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
});
