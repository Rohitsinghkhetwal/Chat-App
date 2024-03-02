import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Fontisto, Feather, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import CustomKeyboardavoiding from "../components/CustomKeyboardavoiding";
import {useAuth} from "../context/Authcontext"

const SignUp = () => {
  const router = useRouter();
  const EmailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");
  const [loading, setLoading] = useState(false);
  const {OnRegister} = useAuth();
  

  const handleSignUp = async () => {
    if (!EmailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert("Sign Up", "All Fields are required !");
      return;
    }
    setLoading(true);
    let response = await OnRegister(EmailRef.current, passwordRef.current, usernameRef.current, profileRef.current);
    setLoading(false);
   

    if(!response.success){
      Alert.alert("Sign Up", response.msg)
    }
  };

  return (
    <CustomKeyboardavoiding>
      <StatusBar style="dark" />
      <View className="flex-1 gap-5">
        <View className="items-center pt-12">
          <Image
            style={{ height: hp(20) }}
            resizeMode="contain"
            source={require("../assets/images/register.png")}
          />
        </View>

        <View className="px-5">
          <Text
            style={{ fontSize: hp(4) }}
            className="text-bold tracking-wider text-center font-bold text-neutral-600 "
          >
            Sign Up
          </Text>
          {/* inputs */}
          <View
            style={{ height: hp(8) }}
            className="flex-row items-center bg-neutral-100 rounded px-4 mt-5"
          >
            <Feather name="user" size={hp(3.5)} color="black" />
            <TextInput
              onChangeText={value => (usernameRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="font-semibold flex-1 px-5"
              placeholder="Username"
              placeholderTextColor={"grey"}
            />
          </View>

          <View
            style={{ height: hp(8) }}
            className="flex-row items-center bg-neutral-100 rounded px-4 mt-3"
          >
            <Fontisto name="email" size={hp(3.5)} color="black" />
            <TextInput
              onChangeText={value => (EmailRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="font-semibold flex-1 px-5"
              placeholder="Email"
              placeholderTextColor={"grey"}
            />
          </View>
          <View
            style={{ height: hp(8) }}
            className="flex-row items-center bg-neutral-100 rounded px-4 mt-3"
          >
            <Feather name="lock" size={hp(3.5)} color="black" />
            <TextInput
              onChangeText={value => (passwordRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="font-semibold flex-1 px-5"
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={"grey"}
            />
          </View>

          <View
            style={{ height: hp(8) }}
            className="flex-row items-center bg-neutral-100 rounded px-4 mt-3"
          >
            <AntDesign name="profile" size={hp(3.5)} color="black" />
            <TextInput
              onChangeText={value => (profileRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="font-semibold flex-1 px-5"
              placeholder="Profile url"
              placeholderTextColor={"grey"}
            />
          </View>
          <View>
            {loading ? (
              <View className="flex-row justify-center">
                <Loading size={hp(7.5)} />
              </View>
            ) : (
              <TouchableOpacity
                className="bg-blue-400 rounded items-center justify-center"
                style={{ height: hp(6), marginTop: 12 }}
                onPress={handleSignUp}
              >
                <Text
                  className=" text-center text-[15px] "
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            className="mt-4 text-center items-center"
            onPress={() => router.push("signIn")}
          >
            <Text
              style={{ color: "black", fontSize: 14 }}
              className="font-semibold"
            >
              Already have account ? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomKeyboardavoiding>
  );
};

export default SignUp;
