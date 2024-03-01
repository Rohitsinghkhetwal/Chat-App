import { Text, View } from "react-native";
import {MenuOption} from "react-native-popup-menu";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const Menuitem = ({value, icon, text, action}) => {
    return (
        <MenuOption onSelect={() => action(value)}>
            <View className="px-5 py-2 flex-row justify-between items-center">
                <Text style={{fontSize: hp(2)}}className="font-semibold text-neutral-500">{text}</Text>
                {icon}
            </View>
        </MenuOption>
    )
}