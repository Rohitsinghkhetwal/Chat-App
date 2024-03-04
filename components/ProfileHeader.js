import { View, Text, TouchableOpacity } from "react-native";
import React from 'react'
import { Stack } from 'expo-router'
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";

const ProfileHeader = () => {
    const router = useRouter()
  return (
    <Stack.Screen
      options={{
        title: "Profile",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row gap-3 mr-5 items-center">
            <TouchableOpacity onPress={() => router.back()} style={{paddingTop: 3}} >
              <Entypo name="chevron-left" size={hp(5)} color="#737373" />
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  );
}

export default ProfileHeader