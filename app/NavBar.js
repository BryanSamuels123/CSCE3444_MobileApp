import * as React from "react";
import { icons, COLORS } from "../constants";
import { BottomNavigation, Text } from "react-native-paper";
import MainPage from "./MainPage";
import TeamUI from "./TeamUI";
import LearnPage from "./LearnPage";

//This is currently not being used. 

const MainPageRoute = () => <MainPage />;
// const TeamsRoute = () => <Text>Teams</Text>;
// const PlayersRoute = () => <Text>Players</Text>;
// const LearnRoute = () => <Text>Learn</Text>;

const NavBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "MainPage", title: "Home", focusedIcon: icons.MainPageIcon },
    // { key: "Teams", title: "Teams", focusedIcon: icons.teamsIcon },
    // { key: "Players", title: "Players", focusedIcon: icons.playersIcon },
    // { key: "Learn", title: "Learn", focusedIcon: icons.learnIcon },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    MainPage: MainPageRoute,
    // Teams: TeamsRoute,
    // Players: PlayersRoute,
    // Learn: LearnRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: COLORS.dark, colors: "white" }}
      theme={{
        colors: {
          secondaryContainer: COLORS.light,
          onSurface: COLORS.light,
          onSecondaryContainer: COLORS.dark,
          onSurfaceVariant: COLORS.light,
        },
      }}
    />
  );
};
export default NavBar;
