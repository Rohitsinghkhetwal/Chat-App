import { View, Text } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MessageItems = ({message, currentUser}) => {
    console.log("message", message)
    console.log("currentUser", currentUser);
    if(currentUser?.userId == message?.userId){
        return (
            <View className="flex-row justify-end mb-3 mr-3">
                <View style={{width: wp(80) }}>
                    <View className="flex self-end p-3 rounded-2xl bg-blue-200">
                        <Text style={{fontSize: hp(2)}}>{message?.text}</Text>

                    </View>

                </View>

            </View>
        )
    }else {
        return (
            <View className="ml-3 mb-3" style={{width: wp(80)}}>
                <View className="flex self-start p-3 px-4 rounded-2xl bg-neutral-200">
                    <Text style={{fontSize: hp(2)}}>{message?.text}</Text>

                </View>

            </View>
        )

    }
}

export default MessageItems