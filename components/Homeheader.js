import { View, Text, Platform } from 'react-native'
import React from 'react'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import {blurhash} from "../utils/Commonutils";
import { useAuth } from '../context/Authcontext';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import {Menuitem} from "../components/CustumMenuItems"
import { FontAwesome, AntDesign } from "@expo/vector-icons";


export default function Homeheader() {
  const { User, OnLogout } = useAuth();

  const handleProfile = () => {
    console.log("This is a handle profile");
  }

  const Logout = async() => {
    await OnLogout();

  }
  return (
    <View
      style={{ paddingTop: 35 }}
      className="flex-row justify-between bg-indigo-400 px-5 pb-5 "
    >
      <View>
        <Text style={{ fontSize: hp(3.5) }} className="font-medium text-white">
          Chats
        </Text>
      </View>
      <View className="pt-1">
        <Menu>
          <MenuTrigger>
            <Image
              style={{ height: hp(5.3), aspectRatio: 1, borderRadius: 100 }}
              source={User?.profileUrl}
              placeholder={blurhash}
              transition={800}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                marginLeft: -45,
                marginTop: 40,
                borderCurve: "continuous",
                width: 160
              },
            }}
          >
            <Menuitem
              text="Profile"
              action={handleProfile}
              icon={<FontAwesome name="user-o" size={hp(2.5)} color="black" />}
              value={null}
            />
            <Divider/>
            <Menuitem
              text="Sign Out"
              action={Logout}
              icon={<AntDesign name="logout" size={hp(2.5)} color="black" />}
              value={null}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}
const Divider = () => {
  return (
    <View className="p-[1px] bg-neutral-300 w-full"/>
  )
}