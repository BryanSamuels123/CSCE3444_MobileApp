import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import {icons, SHADOWS} from "../../constants";


const MenuButton = ({handlePress}) => {
    return(
        <View style={{ flex: 1, justifyContent: "flex-end", paddingLeft: 14}}>
          <TouchableOpacity onPress={() => handlePress()} style={{height: 20, width: 35}} hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }} >
                <Image source={(icons.newMenu)}  style={{height: 20, width: 35}} resizeMode="contain"/>
            </TouchableOpacity>
        </View>
    );

}
export default MenuButton;