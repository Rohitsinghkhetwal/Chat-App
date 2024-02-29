import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React from "react";

const android = Platform.OS == "android";
const CustomKeyboardavoiding = ({ children }) => {
  return (
    <KeyboardAvoidingView behavior={android ? "padding" : "height"} style={{flex: 1}}>
      <ScrollView
      style={{flex: 1}}
      bounces={false}
      showsVerticalScrollIndicator={false}
      >{children}</ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardavoiding;
