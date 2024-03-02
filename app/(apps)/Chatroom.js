import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessageList from "../../components/MessageList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Chatroom() {
  const [chats, setChats] = useState([]);
  const item = useLocalSearchParams();
  const router = useRouter();
  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View className="flex-1 text-neutral-400 justify-between overflow-visible">
        <View className="flex-1">
          <MessageList chats={chats}/>
        </View>
        <View className="pt-3" style={{marginBottom:hp(1.4)}}>
          <View className="flex-row border rounded p-9 bg-white justify-between border-red-300">
            <TextInput placeholder="Messages...." className="flex-1"/>

          </View>

        </View>

        

      </View>
    </View>
  );
}
