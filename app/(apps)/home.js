import { View, Text, Pressable, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/Authcontext';


const Home = () => {
  const {OnLogout} = useAuth();

  const Logout = () => {
    console.log('called');
    OnLogout();

  }


  return (
    <View>
      <Text>Home</Text>
      <Pressable>
        <Button title="Press here" onPress={Logout} />
      </Pressable>
    </View>
  );
}

export default Home