import * as React from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import NavBar from "./NavBar";
import HeaderMenu from "./HeaderMenu";
import { StatusBar } from "expo-status-bar";

/*This is the high level "Page"
The four pages of MainPage, TeamsPage, PlayersPage, and LearnPage reside here.
They are displayed from the NavBar.
Going into sub pages the NavBar disappears until back at the high level. Similar to Canvas Dashboard. This can be changed if need be.
*/
const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderMenu />
      <NavBar />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};
export default Home;