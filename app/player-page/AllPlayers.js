// will act as the page that contains the players with searching/filtering options

import * as react from "react";
import {View, Text, FlatList, Image, ImageBackground, Pressable} from "react-native";
import fetchHook from "../../hook/fetchHook";

const playersPage = () =>{
    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{textAlign: "center", textAlignVertical: "center"}}>
                Hello World
            </Text>
        </View>
       
    ) 
};
export default playersPage;
