import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import { Image } from "expo-image";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


const ChatRoomHeader = ({ user, router }) => {
  console.log("items and router are here", user);
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center gap-5">
            <TouchableOpacity
              onPress={() => router.back()}
              style={{paddingTop: 10}}
            >
              <Entypo name="chevron-left" size={hp(5)} color="#737373" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <Image
                source={user.profileUrl}
                style={{ height: hp(4.5), borderRadius: 100, aspectRatio: 1 }}
              />
              <Text
                style={{ fontSize: hp(2.5) }}
                className="text-neutral-600 font-medium"
              >
                {user.username}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View className="flex-row items-center gap-5 px-5 pt-2">
            <Ionicons name="call" size={hp(3.2)} color="#737373" />
            <Feather name="video" size={hp(3.3)} color="#737373" />
          </View>
        ),
      }}
    />
  );
};

export default ChatRoomHeader;
