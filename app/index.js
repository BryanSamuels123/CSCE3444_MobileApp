import * as React from "react";
import { useRouter } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavBar from "./NavBar";
import { COLORS } from "../constants";

/*This is the high level "Page"
The four pages of MainPage, TeamsPage, PlayersPage, and LearnPage reside here.
They are displayed from the NavBar.
Going into sub pages the NavBar disappears until back at the high level. Similar to Canvas Dashboard. This can be changed if need be.
*/
const Drawer = createDrawerNavigator();

const Home = () => {
  const router = useRouter();

  return (
    <NavigationContainer independent={true} style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.darkSecond },
          headerTintColor: COLORS.light,
          headerTitle: "",
        }}
      >
        <Drawer.Screen name="Home" component={NavBar} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default Home;
