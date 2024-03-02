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
import { Fontisto, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import CustomKeyboardavoiding from "../components/CustomKeyboardavoiding";
import { useAuth } from "../context/Authcontext";

const SignIn = () => {
  const router = useRouter();
  const EmailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const {Onlogin} = useAuth();

  const handleSignIn = async () => {
    if (!EmailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "All Fields are required !");
      return;
    }
    setLoading(true);
    const response = await Onlogin(EmailRef.current, passwordRef.current);
    setLoading(false);

    if(!response.success){
      Alert.alert("Sign In", "Wrong Credential")
    }
    

  };

  return (
    <CustomKeyboardavoiding>
      <StatusBar style="dark" />
      <View className="flex-1 gap-5">
        <View className="items-center pt-12">
          <Image
            style={{ height: hp(30) }}
            resizeMode="contain"
            source={require("../assets/images/login.png")}
          />
        </View>

        <View className="px-5">
          <Text
            style={{ fontSize: hp(4) }}
            className="text-bold tracking-wider text-center font-bold text-neutral-600 "
          >
            Sign In
          </Text>
          {/* inputs */}
          <View
            style={{ height: hp(8) }}
            className="flex-row items-center bg-neutral-100 rounded px-4 mt-5"
          >
            <Fontisto name="email" size={hp(3.5)} color="black" />
            <TextInput
              onChangeText={(value) => (EmailRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="font-semibold flex-1 px-5"
              placeholder="Email Address"
              placeholderTextColor={"grey"}
            />
          </View>

          <View
            style={{ height: hp(8) }}
            className="flex-row items-center bg-neutral-100 rounded px-4 mt-5"
          >
            <Feather name="lock" size={hp(3.5)} color="black" />
            <TextInput
              onChangeText={(value) => (passwordRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="font-semibold flex-1 px-5"
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={"grey"}
            />
          </View>
          <Text className="text-right pt-2 font-semibold">
            Forgot Password ?
          </Text>
          <View>
            {loading ? (
              <View className="flex-row justify-center">
                <Loading size={hp(7.5)}/>

              </View>
            ) : (
              <TouchableOpacity
                className="bg-blue-400 rounded items-center justify-center"
                style={{ height: hp(6), marginTop: 12 }}
                onPress={handleSignIn}
              >
                <Text
                  className=" text-center text-[15px] "
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            className="mt-4 text-center items-center"
            onPress={() => router.push("signUp")}
          >
            <Text
              style={{ color: "black", fontSize: 14 }}
              className="font-semibold"
            >
              Don't have account ? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomKeyboardavoiding>
  );
};

export default SignIn;
