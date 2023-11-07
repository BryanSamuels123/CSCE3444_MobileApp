import { TextInput, Image, View } from "react-native";
import { useState } from "react";
import { COLORS, FONTS, SHADOWS } from "../../constants";
import fetchHook from "../../hook/fetchHook"



const SearchBar = ({ onSearch }) =>{

    const [searchQuery, setSearchQuery] = useState("");     // update value of input
    const [phText, setphText] = useState("Search");         //place holder text will be removed on focus 
    const [family, setFamily] = useState(FONTS.thin);       // font family will change onfocus and on blur

    // const {data, isLoading, error} = fetchHook("playerData", {playerName: searchQuery}); // make api call

    const handleSearchQuery = (query) =>{
        setSearchQuery(query);
    }

    const handleSubmit = () =>{
        onSearch(searchQuery);
    }

    // const handleSearchQuery = (query) => {
    //     setSearchQuery(query);
    //   }
    
    //   const searchList = () => {
    //     const newData = playerData.filter((player) =>
    //       player.playerName.toLowerCase().includes(searchQuery.toLowerCase())
    //     );
    //   //   setPlayerData(newData);
    //   }

    return(


        <View style={{flex: .6, justifyContent:"center", flexDirection: "row"}}>

            {/* filter icon */}
            <View backgroundColor={COLORS.dark} style={{flex: 2.2}}>
                {/* <Image/> */}
            </View>

            <View style={{flex: 7.8, marginHorizontal: 10, justifyContent: "flex-end", flexDirection: "column"}}>
                <TextInput
                    placeholder={phText}
                    clearButtonMode="always"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={searchQuery}
                    lineBreakStrategyIOS={"standard"}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType="done"
                    onChangeText={(query) => handleSearchQuery(query)}
                    placeholderTextColor={COLORS.dark}
                    onFocus={() => {
                        setphText("")
                        setFamily(FONTS.regular)
                    }}
                    onBlur={() => {
                        if (searchQuery === ""){
                            setphText("Search")
                            setFamily(FONTS.thin)
                        }
                    }}

                    onSubmitEditing={() => handleSubmit()}

                    style={{height: 45, backgroundColor: COLORS.lightGray, borderRadius: 10, paddingHorizontal: 5, fontFamily: family, ...SHADOWS.small}}
                />
            </View>
        </View>

    );


};
export default SearchBar;