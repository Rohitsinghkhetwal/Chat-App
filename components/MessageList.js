import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageItems from './MessageItems';

const MessageList = ({ message, currentUser }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 10,
      }}
    >
      {message.map((chats, index) => {
        return <MessageItems message={chats} key={index} currentUser={currentUser} />;
      })}
    </ScrollView>
  );
};

export default MessageList;