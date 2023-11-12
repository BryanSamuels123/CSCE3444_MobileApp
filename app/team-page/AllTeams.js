// will act as the page that contains the teams with searching/filtering options

import { useState } from "react";
import { View, Text, FlatList, Image, ImageBackground, Pressable, SafeAreaView } from "react-native";
import { SHADOWS, COLORS, icons } from "../../constants";
import fetchHook from "../../hook/fetchHook";
import { BackImg } from "../../components";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Teams } from "../../components";
import { useRouter } from "expo-router";

const teamsPage = () =>{
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("all");
    const [doSearch, setDoSearch] = useState(false);
    const [res, setResult] =useState([]);

    const onSearch = ({result}) => {
        console.log("in teams page", result)
        setResult(result);
    }
    
    return(
        //Wrapper
        <BackImg>
            {/* Search Bar*/}
            {/*Card UI */}
            <View style={{ flex: 3.8}}>
                <Teams />
            </View>

            {/*Fav icon*/}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    <Pressable style={({ pressed }) => [{ paddingLeft: 15, width: 80, height: 80, alignItems: "center", borderRadius: 10 },
                    pressed && SHADOWS.large
                    ]}>
                        {({ pressed }) => {
                            return (
                                // will do an animation on pressed later
                                <Image source={(icons.favIcon)} style={[
                                    { width: 80, height: 80, resizeMode: "contain", borderRadius: 9 },
                                    pressed && { opacity: 0.70 },
                                ]} />
                            );
                        }}
                    </Pressable>
                </View>
        </BackImg>
    )
};
export default teamsPage;
