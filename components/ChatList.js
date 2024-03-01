import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Chatitems from './Chatitems';
import { useRouter } from 'expo-router';


const ChatList = ({user}) => {
    
    const router = useRouter();
  return (
    <View>
        <FlatList
        data={user}
        contentContainerStyle={{ paddingVertical: 25}}
        keyExtractor={item => Math.random()}
        showsVerticalScrollIndicator={true}
        renderItem={({item, index}) => <Chatitems item={item}
        router={router}
        index={index}
        />}
        />
      
    </View>
  )
}

export default ChatList