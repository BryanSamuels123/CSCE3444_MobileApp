import * as React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Players from "../components/MainPage/players/Players";
import Teams from "../components/MainPage/teams/Teams";
import Learn from "../components/MainPage/learn/Learn";
import { COLORS, FONTS } from "../constants";
import NewsWidget from "./NewsWidget";

const MainPage = () => {
  return (
    // will be turned into <Teams/>
    <SafeAreaView style={style.ListItems}>
      <ScrollView>
        <NewsWidget />
        <Teams />
        <Players />
        <Learn />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainPage;

const style = StyleSheet.create({
  ListItems: {
    backgroundColor: COLORS.darkSecond,
    borderLeftWidth: 5,
    borderColor: COLORS.darkSecond,
    flexDirection: "column",
    flexGrow: 1,
  },
});
