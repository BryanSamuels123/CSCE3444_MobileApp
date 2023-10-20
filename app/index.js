import * as React from "react";
import {View, SafeAreaView, Text} from "react-native";
import { Stack, useRouter } from "expo-router";     
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavBar from "./NavBar";
import MainPage from "./MainPage";
import { COLORS, icons, images, DIMS } from "../constants";

/*This is the high level "Page"
The four pages of MainPage, TeamsPage, PlayersPage, and LearnPage reside here.
They are displayed from the NavBar.
Going into sub pages the NavBar disappears until back at the high level. Similar to Canvas Dashboard. This can be changed if need be.
*/
const Drawer = createDrawerNavigator();

const Home = () => {
  const router = useRouter();

  return(
    <View style={{flex: 1}}>
      <Stack.Screen // will be the nav bar

        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,

          headerTitle: "title"
        }}
        />
      <MainPage/>
    </View>)
  
  

  // return (
  //   <NavigationContainer independent={true} style={{ flex: 1 }}>
  //     <Drawer.Navigator
  //       initialRouteName="Home"
  //       screenOptions={{
  //         headerStyle: { backgroundColor: COLORS.darkSecond },
  //         headerTintColor: COLORS.light,
  //         headerTitle: "",
  //       }}
  //     >
  //       <Drawer.Screen name="Home" component={NavBar} />
  //     </Drawer.Navigator>
  //   </NavigationContainer>
  // );
};
export default Home;
