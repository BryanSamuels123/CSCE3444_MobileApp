// will act as the page that contains the players with searching/filtering options

import { useState } from "react";
import {View, Text, FlatList, Image, ImageBackground, Pressable, SafeAreaView} from "react-native";
import { SHADOWS, COLORS, icons } from "../../constants";
import fetchHook from "../../hook/fetchHook";
import { BackImg } from "../../components";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {Players, SearchBar} from "../../components";

const playersPage = () =>{
    // const {data, isLoading, error} = fetchHook("playerData", {playerName: "all"});

    // if (!data) console.error("NO DATA, CHECK API CALL OR SERVER")

    const [searchQuery, setSearchQuery] = useState("all"); //by default display all players
    const [doSearch, setDoSearch] = useState(false); // tell the list to call its search function
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // creates setter with default variable
    const [error, setError] = useState(null);

    const onSearch = (quer, data, isLoading, error) => {
        setSearchQuery(quer)
        // setDoSearch(true);
        // setData(data);
        // setIsLoading(isLoading);
        // setError(error);
    }

    // const endSearch = () =>{
    //     setDoSearch(false);
    // }

    // console.log(searchQuery);

    return(
        // Page Wrapper
        <BackImg>

            {/* Search bar */}
            <SearchBar onSearch={onSearch}/>

            {/* Card Stack UI */}
            <View style={{flex: 3.2}}>
                <Players query={searchQuery} /*doSearch={doSearch} endSearch={endSearch} data={data} isLoading={isLoading} error={error}*/ />
            </View>



            {/* Fav and compare icon */}
            <View style={{flex: .8, flexDirection: "row"}}> 


                {/* Compare Icon */}
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}> 
                    <Pressable style={({pressed}) => [{paddingRight: 15, width: 80, height: 80, alignItems: "center", borderRadius: 10}, 
                        pressed && SHADOWS.large   
                    ]}>
                    {({pressed}) =>{
                        return(
                            <Image source={(icons.statsCompIcon)}  style={[{width: 80, height: 80, resizeMode: "center", borderRadius: 10},
                                pressed && {opacity: 0.70}
                            ]}/>
                        );
                    }}
                    </Pressable>
                </View>

                {/* favorite icon */}
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}> 
                    <Pressable style={({pressed}) => [{paddingLeft: 15, width: 80, height: 80, alignItems: "center", borderRadius: 10}, 
                        pressed && SHADOWS.large
                    ]}>
                        {({pressed}) =>{
                            return(
                                // will do an animation on pressed later
                                <Image source={(icons.favIcon_U)} style={[
                                    {width: 80, height: 80, resizeMode: "contain", borderRadius: 9},
                                    pressed && {opacity: 0.70},
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
