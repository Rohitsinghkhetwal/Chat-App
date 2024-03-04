import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../../context/Authcontext";
import { Stack } from "expo-router";
import ProfileHeader from "../../components/ProfileHeader";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Options = [ "Account", "Privacy", "Notification", "Settings", "Language"];



const Profile = () => {
  const { User } = useAuth();
  console.log("this is a profile", User);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <ProfileHeader />
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "#FFFFFF" }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 60,
          }}
        >
          <Image
            source={User?.profileUrl}
            style={{ height: hp(20), aspectRatio: 1, borderRadius: 100 }}
          />
          <Text style={{ fontSize: hp(3), paddingTop: 10, fontWeight: "600" }}>
            {User?.username}
          </Text>
        </View>
        <View style={{ marginHorizontal: 15, fontSize: hp(3) }}>
          {Options.map((items, index) => {
            return (
              <View key={index} style={{ paddingTop: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#e9ecef",
                    padding: 15,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ fontSize: hp(2.3) }}>{items}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Profile;
