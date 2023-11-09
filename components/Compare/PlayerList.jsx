import * as react from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,

} from "react-native";
import { useRouter } from "expo-router";
import fetchHook from "../../hook/fetchHook";
import { COLORS, SIZES } from "../../constants/theme";
import PlayerCardC from "../common/cards/player/PlayerCardC"
import { TextInput } from "react-native-paper";

//This is the playerlist for the Compare page


//Data for the flatlist. 
const PlayerList = ( {passObjectToParent} ) => {
  const router = useRouter();
  const { data, isLoading, error } = fetchHook("playerData", {
    playerName: "all",
  });
  const [searchText, setSearchText] = react.useState();

//Filter for searching
const searchFilteredData = searchText
    ? data.filter((x) =>
            x.playerName.toLowerCase().includes(searchText.toLowerCase())
      )
    : data;


//searchs thru list whenever the text in the search bar changes. 
  return (
      <SafeAreaView>
        <TextInput
            autoCapitalize="none"
            autoCorrect={true}
            clearButtonMode="always"
            onChangeText={(text) => {
                setSearchText(text);
            }}
            value={searchText}
            placeholder="Search"
            mode= 'outlined'
            dense={true}
            style={{ backgroundColor: '#fff', Flex: .5, paddingHorizontal: 5, margin: 25 }}
          />
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.lightBlue} /> 
        ) : error ? (
          <Text> Something Went Wrong</Text> // error text
        ) : (
          <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={searchFilteredData}
            keyExtractor={(item) => item.id} // can remove question mark to test errors; ? skips items without id's but all should have id's
            renderItem={({ item }) => (
              <PlayerCardC
                item={item}
                passObjectToParent={passObjectToParent}
              />
            )}
          />
        )}
      </SafeAreaView>
  );
};
export default PlayerList;