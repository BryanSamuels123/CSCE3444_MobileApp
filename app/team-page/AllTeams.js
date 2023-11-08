// will act as the page that contains the teams with searching/filtering options

import * as react from "react";
import {View, Text, FlatList, Image, ImageBackground, Pressable} from "react-native";
import fetchHook from "../../hook/fetchHook";
import { BackImg } from "../../components";
import { SHADOWS, COLORS, FONTS, icons } from '../../constants';
import { useState } from "react";
import { Teams } from "../../components";

const teamsPage = () =>{
    return(
        <BackImg>
            {/*Search Bar*/}
            <View style={{flex: .8, backgroundColor: COLORS.orange}}>
            </View>

            {/*Card Stack*/ }
            <View style={{flex: 3, backgroundColor: COLORS.darkSecond}}>

            </View>
            
            {/*Favourite Icon*/}
            <View style={{flex: 1.2, flexDirection: "row"}}>
                <View stlye={{flex: 2, justifyContent: "center", alignItems: "center"}}>
                    <Pressable style={({pressed}) => [{marginLeft: 160, width:100, height: 100, alignItems: "center", borderRadius: 10},
                    pressed && SHADOWS.large]}> 
                        {({pressed}) => {
                            return(
                                <Image source={(icons.favIcon_F)} style= {[
                                    {width: 100, height:100, resizeMode: "center", borderRadius: 10},
                                    pressed && {opacity: 0.7}
                                ]}/>
                            );
                        }}
                    </Pressable>

                </View>
            </View>
        </BackImg>
    )
};
export default teamsPage;
