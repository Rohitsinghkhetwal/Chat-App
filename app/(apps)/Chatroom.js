import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessageList from "../../components/MessageList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import {roomID} from "../../utils/Commonutils"
import { useAuth } from "../../context/Authcontext";
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";


export default function Chatroom() {
  const [chats, setChats] = useState([]);
  const item = useLocalSearchParams();
  const router = useRouter();
  const {User} = useAuth();
  const inputRef = useRef("")
  const textRef = useRef(null)



  useEffect(() => {
    createRoomId();

    let Roomid = roomID(item?.userId, User?.userId);
    const docRef = doc(db, "rooms", Roomid);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    let result = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map(doc => {
        return doc.data()
      })
      setChats([...allMessages])
    })
    return result;
  },[])

  const createRoomId = async() => {
    const roomId = roomID(item?.userId, User?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    })

  }

  const onMessageSend = async() => {
    let message = inputRef.current.trim();
    if(!message) return;
    try {
      let roomId = roomID(item?.userId, User?.userId);
      const docRef = doc(db, "rooms", roomId);
      

      const messageRef = collection(docRef, "messages");
      inputRef.current = "";
      if(textRef) textRef?.current?.clear()
      const newDoc = await addDoc(messageRef, {
        userId: User?.userId,
        text: message,
        profileUrl: User?.profileUrl,
        senderName: User?.username,
        createdAt: Timestamp.fromDate(new Date())
      })
     

      console.log("This is inside OnsendMessage", newDoc.id);
    } catch(err){
      Alert.alert("Message", "Something went wrong !")
    } 
  }


  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View style={{ flex: 1 }}>
        <MessageList message={chats} currentUser={User} />
      </View>

      <View
        style={{ flexDirection: "row", paddingHorizontal: 1, marginBottom: 20 }}
      >
        <TextInput
          placeholder="Message..."
          onChangeText={(value) => (inputRef.current = value)}
          ref={textRef}
          style={{
            fontSize: hp(2),
            flex: 1,
            height: 45,
            borderWidth: 1,
            borderColor: "#737373",
            borderRadius: 5,
            paddingHorizontal: 15,
            borderRadius: 100,
            paddingVertical: 10,
          }}
        />
        <TouchableOpacity style={{ paddingLeft: 5 }} onPress={onMessageSend}>
          <Ionicons name="send-sharp" size={hp(5.2)} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
