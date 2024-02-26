import {View, Text} from "react-native"
import { Slot, useRouter, useSegments } from "expo-router"
import { useAuth, ContextProvider } from "../context/Authcontext";
import { useEffect } from "react";


const MainLayout = () => {
  const { Authenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // check user is authenticated or not
    if(typeof Authenticated == "undefined") return;
    const inApp = segments[0]=== "(apps)"
    if(Authenticated && !inApp){
      //send user to homepage
      router.replace("home")
    }else if(!Authenticated && inApp){
      //send to login page
      router.replace('signIn');
    }
  }, [Authenticated]);

  return <Slot/>

}

export default function RootLayout() {
  
  return (
   <ContextProvider>
    <MainLayout/>
   </ContextProvider>
  )
}


