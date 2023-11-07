import {useEffect, useState} from "react";
import {StyleSheet, Text, FlatList, ActivityIndicator, View, TextInput} from "react-native";
import PlayerCard from "../../common/cards/player/PlayerCard";
import { useFocusEffect, useRouter } from "expo-router";
import fetchHook from "../../../hook/fetchHook";
import {COLORS, SIZES, FONTS, SHADOWS} from "../../../constants";


const Players = ({ result, query  }) => {

    const [playerData, setPlayerData] = useState([]); // initially empty


    const [isLoading, setIsLoading] = useState(true); // initially load, wait for search bar to give info
    const [error, setError] = useState(null);   // initially no error
    const router = useRouter();
  
    // useEffect(() => {
    // const result = (fetchHook("playerData", { playerName: "all" }));
    
  useEffect(() =>{
    if (result.error){
        setError(result.error);
    }
    else{
        setPlayerData(result.data)
    }
    setIsLoading(false);
  } , []) 

  

    
    return(
        
        <View style={{flex: 1}}>
            { isLoading ? (
                <ActivityIndicator size="large" colors={COLORS.lightBlue}/>
            ) : error ? (
                <Text style={style.list}>Something Went Wrong</Text> // style text
            ): (
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    data={playerData}
                    keyExtractor={(item) => item.id} // can remove question mark to test errors; ? skips items without id's but all should have id's
                    renderItem={({ item }) => (<PlayerCard item={item} handleNavigate={() => router.push(`player-page${item.id}`)}/>)}
                    initialNumToRender={10}

                    // extraData={name}
                />
                )
            }

        </View>
    )
    
}
export default Players;


const style = StyleSheet.create({
    ListHeaders: {
      fontWeight: "bold",
      marginTop: 15,
      color: COLORS.light,
    }
    ,
    cardContainer: {
        backgroundColor: COLORS.orange,
        margin: 5,
        width: 140,
        height: 120,
      },
});