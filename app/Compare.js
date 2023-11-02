import * as React from "react";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView, View, Text } from "react-native";
import { Button, Divider } from "react-native-paper";
import PlayerList from "../components/Compare/PlayerList";

const Compare = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{ flex: 3, backgroundColor: "gold", alignItems: 'center' }}>
        <Text> THIS NEEDS TO BE SEARCH BAR</Text>
        <PlayerList />
      </View>
      <Divider />
      <View style={{ flex: 3, backgroundColor: "gold", alignItems: 'center' }}>
        <PlayerList />
      </View>
      <View style={{ flex: 2, backgroundColor: "blue", flexDirection:"row", alignItems: 'center'}} >
        <Button style={{margin: 50}} mode="contained" onPress={() => console.log("Pressed")}>
          Press me
        </Button>
        <Button style={{margin: 50}} mode="contained" onPress={() => console.log("Pressed")}>
          Press me
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Compare;
