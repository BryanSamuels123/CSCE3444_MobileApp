import * as React from "react";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView, View, Text } from "react-native";
import { Button, Divider } from "react-native-paper";
import PlayerList from "../components/Compare/PlayerList";

const Compare = () => {
  const router = useRouter();
  const [showTopList, setTopList] = React.useState(true);
  const [showTopPlayer, setTopPlayer] = React.useState(false);
  const [showBotList, setBotList] = React.useState(true);
  const [showBotPlayer, setBotPlayer] = React.useState(false);
  const [receivedObject, setReceivedObject] = React.useState(null);
  const [receivedObject2, setReceivedObject2] = React.useState(null);

  //Toggles the top view
  const toggleTop = () => {
    setTopList(!showTopList);
    setTopPlayer(!showTopPlayer);
  }
  //Toggles the Bot view
  const toggleBot = () => {
    setBotList(!showBotList);
    setBotPlayer(!showBotPlayer);
  }

  // Function to receive the object from the child component
  const receiveObjectFromGrandChild = (object) => {
    setReceivedObject(object);
    toggleTop();
  };
  const receiveObjectFromGrandChild2 = (object) => {
    setReceivedObject2(object);
    toggleBot();
  };

  const TopCard = () => (
    <View style={{ flex: 1, backgroundColor: "gold", alignItems: 'center', marginTop: 20 }}>
      {receivedObject && <Text>{JSON.stringify(receivedObject)}</Text>}
      {!receivedObject && <Text>Please select a player</Text>}
    </View>
  );
  const BotCard = () => (
    <View style={{ flex: 1, backgroundColor: "gold", alignItems: 'center', marginTop: 20 }}>
      {receivedObject2 && <Text>{JSON.stringify(receivedObject2)}</Text>}
      {!receivedObject2 && <Text>Please select a player</Text>}
    </View>
  );


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "gold" }}>
      <View style={{ flex: 1, backgroundColor: "gold", alignItems: 'center', marginTop: 20 }}>
        {showTopList && <PlayerList passObjectToParent={receiveObjectFromGrandChild} />}
        {showTopPlayer && <TopCard />}
      </View>
      <Divider />
      <View style={{ flex: 1, backgroundColor: "gold", alignItems: 'center', justifyContent: "center", }}>
        {showBotList && <PlayerList passObjectToParent={receiveObjectFromGrandChild2} />}
        {showBotPlayer && <BotCard />}
      </View>
      <View style={{ flex: .6, backgroundColor: "blue", flexDirection: "row", alignItems: 'center' }} >
        <Button style={{ margin: 50 }} mode="contained" onPress={() => toggleTop()}>
          Toggle Top List
        </Button>
        <Button style={{ margin: 50 }} mode="contained" onPress={() => toggleBot()}>
          Toggle Bottom List
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Compare;
