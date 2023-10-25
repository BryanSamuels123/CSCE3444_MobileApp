import * as react from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import LearnCard from "../../common/cards/learn/LearnCard";

const LearnData = [
  {
    name: "Intro to the Sport",
    definition: "Learn the sport of Basketball",
    image:
      "https://images.unsplash.com/photo-1627627256672-027a4613d028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    link: "/testpage",
  },
  {
    name: "Common Plays",
    definition: "Learn the common plays in Basketball",
    image:
      "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    link: "/testpage",
  },
  {
    name: "Common Terms",
    definition: "Learn the common terms in Basketball",
    image:
      "https://images.unsplash.com/photo-1543497415-75c0a27177c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80",
    link: "/testpage",
  },
];

const Learn = () => {
  const router = useRouter();

  return (
    <View>
      <Text style={style.ListHeaders}>{"\t"}Learn</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={LearnData}
        keyExtractor={(item, index) => item.name + index.toString()}
        renderItem={({ item }) => <LearnCard item={item} />}
      />
    </View>
  );
};
export default Learn;

const style = StyleSheet.create({
  ListHeaders: {
    fontWeight: "bold",
    marginTop: 15,
    color: COLORS.light,
  },
});
