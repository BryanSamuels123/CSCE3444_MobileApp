import * as react from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { useRouter } from "expo-router";
import fetchHook from "../../hook/fetchHook";
import { COLORS, SIZES } from "../../constants/theme";
import PlayerCard from "../common/cards/player/PlayerCard"
import { TextInput } from "react-native-paper";


const PlayerList = () => {
  const router = useRouter();
  const { data, isLoading, error } = fetchHook("playerData", {
    playerName: "all",
  });
  const [searchText, setSearchText] = react.useState();


//Filter
const searchFilteredData = searchText
    ? data.filter((x) =>
            x.playerName.toLowerCase().includes(searchText.toLowerCase())
      )
    : data;


  return (
      <SafeAreaView>
        <TextInput
            autoCapitalize="none"
            autoCorrect={false}
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
          <Text style={style.list}>Something Went Wrong</Text> // style text
        ) : (
          <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={searchFilteredData}
            keyExtractor={(item) => item.id} // can remove question mark to test errors; ? skips items without id's but all should have id's
            renderItem={({ item }) => (
              <PlayerCard
                item={item}
                handleNavigate={() => router.push(`player-page${item.id}`)}
              />
            )}
          />
        )}
      </SafeAreaView>
  );
};
export default PlayerList;

const style = StyleSheet.create({
  ListHeaders: {
    fontWeight: "bold",
    marginTop: 15,
    color: COLORS.light,
  },
  cardContainer: {
    backgroundColor: COLORS.orange,
    margin: 5,
    width: 140,
    height: 120,
  },
});
