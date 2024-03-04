import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from 'expo-image';
import { blurhash, roomID } from '../utils/Commonutils';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../FirebaseConfig';


const Chatitems = ({ item, router, noBorder, currentUser }) => {

  const [lastMessage, setLastMessage] = useState(undefined);

  useEffect(() => {

    let Roomid = roomID(item?.userId, currentUser?.userId);
    const docRef = doc(db, "rooms", Roomid);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "desc"));

    let result = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0]? allMessages[0] : null);
    });
    return result;
  }, []);

  console.log("last message", lastMessage);
  const NavigateChatRoom = () => {
    router.push({ pathname: "/Chatroom", params: item });
  };

  const renderLastMessage = () => {
    if(typeof lastMessage == "undefined") return "loading.."
    if(lastMessage){
      if(currentUser?.userId == lastMessage?.userId) return "You :" + lastMessage?.text;
      return lastMessage?.text
    }else {
      return "Say Hello 👋"
    }
  }

  return (
    <TouchableOpacity
      className={`flex-row justify-between items-center gap-3 mb-3 pb-3 px-4 ${
        noBorder ? "" : `border-b border-b-neutral-400`
      }`}
      onPress={NavigateChatRoom}
    >
      <Image
        style={{ height: hp(6), width: wp(12), borderRadius: 100 }}
        placeholder={blurhash}
        transition={700}
        source={item?.profileUrl}
      />

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            className="font-semibold text-neutral-800"
            style={{ fontSize: hp(2) }}
          >
            {item.username}
          </Text>
          <Text
            className="font-semibold text-neutral-800"
            style={{ fontSize: hp(1.5) }}
          >
            Time
          </Text>
        </View>
        <Text style={{ fontSize: hp(1.6) }} className="text-neutral-600">
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chatitems