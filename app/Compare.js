import * as React from "react";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView, View, Text } from "react-native";
import { Button, Divider } from "react-native-paper";
import PlayerList from "../components/Compare/PlayerList";

const Compare = () => {
  const router = useRouter();
  const [showTopList, setTopList] = React.useState(true);
  const [showTopPlayer, setTopPlayer] = React.useState(false);
  const [receivedObject, setReceivedObject] = React.useState(null);

  //Set to only clear back to list. 
	const toggleViews = () => {
  	setTopList(!showTopList);
    setTopPlayer(!showTopPlayer);
  }

  // Function to receive the object from the child component
  const receiveObjectFromGrandChild = (object) => {
    setReceivedObject(object);
  };


  const Landing = () => (
    <View style={{ flex: 1, backgroundColor: "gold", alignItems: 'center', marginTop: 20 }}>
      {receivedObject && <Text>{JSON.stringify(receivedObject)}</Text>}
    </View>
  );
 

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "gold"}}>
      <View style={{ flex: 1, backgroundColor: "gold", alignItems: 'center', marginTop: 20 }}>
        
        {showTopList && <PlayerList passObjectToParent={receiveObjectFromGrandChild}/>}
        
        {showTopPlayer && <Landing toggleViewFn={toggleViews} />}
      </View>
      <Divider />
      <View style={{ flex: 1, backgroundColor: "gold", alignItems: 'center', justifyContent: "center",  }}>
          <PlayerList />
      </View>
      <View style={{ flex: .6, backgroundColor: "blue", flexDirection:"row", alignItems: 'center'}} >
        <Button style={{margin: 50}} mode="contained" onPress={() => toggleViews()}>
          Clear Top
        </Button>
        <Button style={{margin: 50}} mode="contained" onPress={() => console.log("Pressed")}>
          Clear Bottom
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Compare;
