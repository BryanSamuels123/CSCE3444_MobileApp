// will act as the page that contains the players with searching/filtering options

import * as react from "react";
import {View, Text, FlatList, Image, ImageBackground, Pressable} from "react-native";
import { SHADOWS, COLORS, icons } from "../../constants";
import fetchHook from "../../hook/fetchHook";
import { BackImg } from "../../components";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {Players} from "../../components";

const playersPage = () =>{
    // const {data, isLoading, error} = fetchHook("playerData", {playerName: "all"});

    // if (!data) console.error("NO DATA, CHECK API CALL OR SERVER")

    return(
        <BackImg>
            {/* Search bar */}
            <View style={{flex: .8, backgroundColor: COLORS.orange}}> 

            </View>

            {/* Card Stack UI */}
            <View style={{flex: 3.2}}>
                <Players/>
            </View>



            {/* Fav and compare icon */}
            <View style={{flex: 1, flexDirection: "row"}}> 


                {/* Compare Icon */}
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}> 
                    <Pressable style={({pressed}) => [{paddingRight: 15, width: 100, height: 100, alignItems: "center", borderRadius: 10}, 
                        pressed && SHADOWS.large   
                    ]}>
                    {({pressed}) =>{
                        return(
                            <Image source={(icons.statsCompIcon)}  style={[{width: 100, height: 100, resizeMode: "center", borderRadius: 10},
                                pressed && {opacity: 0.70}
                            ]}/>
                        );
                    }}
                    </Pressable>
                </View>

                {/* favorite icon */}
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}> 
                    <Pressable style={({pressed}) => [{paddingLeft: 15, width: 100, height: 100, alignItems: "center", borderRadius: 10}, 
                        pressed && SHADOWS.large
                    ]}>
                        {({pressed}) =>{
                            return(
                                // will do an animation on pressed later
                                <Image source={(icons.favIcon_U)} style={[
                                    {width: 100, height: 100, resizeMode: "center", borderRadius: 10},
                                    pressed && {opacity: 0.70}
                                ]}/>
                            );
                        }}
                    </Pressable>
                </View>
            </View>
        </BackImg>
    ) 
};
export default playersPage;
