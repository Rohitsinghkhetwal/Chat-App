import { View, Text, Pressable, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Authcontext";
import { StatusBar } from "expo-status-bar";
import Loading from "../../components/Loading";
import ChatList from "../../components/ChatList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getDocs, query, where } from "firebase/firestore";
import { userRef } from "../../FirebaseConfig";

const Home = () => {
  const {GetUserData, User } = useAuth();
  const [user, setUser] = useState([]);
 
  
  useEffect(() => {
    if(User?.userId)
    GET_ALL_USERS();

  },[])


  const GET_ALL_USERS = async() => {
    const q = query(userRef, where("userId" , "!=", User?.userId));
    // this above it will not fetch the current Logged in user
    const result = await getDocs(q);
    let data = [];
    result.forEach(item => {
      data.push({...item.data()})
    })
    setUser(data);
  }

  

  return (
    <View className="flex-1">
      <StatusBar style="light" />

      {user.length > 0 ? (
        <ChatList user={user} />
      ) : (
        <View className="flex items-center" style={{top: hp(35), left: wp(40)}}>
          <Loading size={hp(10)}/>
        </View>
      )}
    </View>
  );
};

export default Home;
