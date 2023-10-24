import * as react from "react";
import {StyleSheet, Text, FlatList, ActivityIndicator, View} from "react-native";
import PlayerCard from "../../common/cards/player/PlayerCard";
import { useRouter } from "expo-router";
import fetchHook from "../../../hook/fetchHook";
import {COLORS, SIZES} from "../../../constants";


const Players = () =>{
    const router = useRouter();
    const {data, isLoading, error} = fetchHook("playerData", {playerName: "all"});
    console.log(data[0]);

    // console.log(error)
    // const handleCardPress = () =>{ // handles navigation
    //     router.push(`player-page${item.id}`);
    // }

    return(


        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                { isLoading ? (
                    <ActivityIndicator size="large" colors={COLORS.lightBlue}/>
                ) : error ? (
                    <Text style={style.list}>Something Went Wrong</Text> // style text
                ): (
                    <FlatList
                        vertical
                        showsVerticalScrollIndicator={false}
                        data={data}
                        keyExtractor={(item) => item.id} // can remove question mark to test errors; ? skips items without id's but all should have id's
                        renderItem={({ item }) => (<PlayerCard item={item} handleNavigate={() => router.push(`player-page${item.id}`)}/>)}
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