import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Chatitems = ({item, router, noBorder}) => {
  return (
    <TouchableOpacity className="flex-row justify-between items-center gap-3 mb-3 pb-3 mx-2 border-b border-b-neutral-400">
      <Image
        source={{uri:item?.profileUrl}}
        style={{ height: hp(6), width: wp(12) }}
        className="rounded-full"
      />

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-neutral-800" style={{fontSize: hp(2)}}>{item.username}</Text>
          <Text className="font-semibold text-neutral-800" style={{fontSize: hp(1.5)}}>Time</Text>
        </View>
        <Text style={{fontSize: hp(1.6)}} className="text-neutral-600">Last message</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Chatitems