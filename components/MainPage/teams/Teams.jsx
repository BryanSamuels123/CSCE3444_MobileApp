import * as react from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import TeamCard from "../../common/cards/team/TeamCard";

const TeamData = [
  {
    name: "Milwaukee Bucks",
    conference: "East Conference",
    wins: "38",
    loses: "44",
    streak: "L2",
    last10: "6-4",
    winPercent: ".463",
    teamlogo:
      "https://1000logos.net/wp-content/uploads/2018/01/milwaukee-bucks-new-logo.jpg",
    link: "/TestPage",
  },
  {
    name: "Dallas Mavericks",
    conference: "West Conference",
    wins: "58",
    loses: "24",
    streak: "L2",
    last10: "2-8",
    winPercent: ".707",
    teamlogo:
      "https://1000logos.net/wp-content/uploads/2018/05/Dallas-Mavericks-Logo-Color.jpg",
    link: "/testpage",
  },
  {
    name: "New York Knicks",
    conference: "East Conference",
    wins: "47",
    loses: "35",
    streak: "L1",
    last10: "5-5",
    winPercent: ".573",
    teamlogo:
      "https://1000logos.net/wp-content/uploads/2017/12/New-York-Knicks-Emblem.jpg",
    link: "/testpage",
  },
  {
    name: "Los Angeles Lakers",
    conference: "West Conference",
    wins: "43",
    loses: "39",
    streak: "W2",
    last10: "8-2",
    winPercent: ".524",
    teamlogo:
      "https://1000logos.net/wp-content/uploads/2017/03/los-angeles-lakers-logo.jpg",
    link: "/testpage",
  },
];

const Teams = () => {
  const router = useRouter();

  return (
    <View>
      <Text style={style.ListHeaders}>{"\t"}Teams</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={TeamData}
        keyExtractor={(item, index) => item.name + index.toString()}
        renderItem={({ item }) => <TeamCard item={item} />}
      />
    </View>
  );
};
export default Teams;

const style = StyleSheet.create({
  ListHeaders: {
    fontWeight: "bold",
    marginTop: 15,
    color: COLORS.light,
  }
});
