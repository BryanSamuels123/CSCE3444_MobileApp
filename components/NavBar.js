import * as React from 'react';
import { icons } from '../constants'
import { BottomNavigation, Text } from 'react-native-paper';

const MainPageRoute = () => <Text>Home</Text>;

const TeamsRoute = () => <Text>Teams</Text>;

const PlayersRoute = () => <Text>Players</Text>;

const LearnRoute = () => <Text>Learn</Text>;

const NavBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'MainPage', title: 'Home', focusedIcon: icons.MainPageIcon },
    { key: 'Teams', title: 'Teams', focusedIcon: icons.teamsIcon },
    { key: 'Players', title: 'Players', focusedIcon: icons.playersIcon },
    { key: 'Learn', title: 'Learn', focusedIcon: icons.learnIcon},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    MainPage: MainPageRoute,
    Teams: TeamsRoute,
    Players: PlayersRoute,
    Learn: LearnRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default NavBar;