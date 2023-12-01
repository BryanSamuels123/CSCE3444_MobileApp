import * as React from "react";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView, View, Pressable, Image } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import PlayerList from "../components/Compare/PlayerList";
import { BackImg, SideMenu, MenuButton} from "../components";
import { SHADOWS, COLORS, icons } from "../constants";
import CompareCard from "../components/Compare/CompareCard"

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
      <View style={{ flex: 1, alignItems: 'center'}}>
        {receivedObject && <CompareCard item={receivedObject} ></CompareCard>}
        {!receivedObject && <Text>Please select a player</Text>}
      </View>
  );
  const BotCard = () => (
      <View style={{ flex: 1, alignItems: 'center'}}>
        {receivedObject2 && <CompareCard item={receivedObject2}></CompareCard>}
        {!receivedObject2 && <Text>Please select a player</Text>}
      </View>
  );


  const [shown, setShown] = React.useState(false);

  const openMenu = () =>{
      setShown(true);
  }
  
  const closeMenu = () =>{
      setShown(false);
  }

  const chasePage = (route) =>{
      // console.log(route);
      setShown(false);
      router.push(route);
  }


  return (
    <BackImg>


      <SideMenu toggleState={shown} updateState={closeMenu} followSlug={chasePage} isRoot={false}/>
      {/* menu button */}
      <View style={{flex: 0.08, marginTop: 20}}>
          <MenuButton handlePress={openMenu}/>
      </View>

    <SafeAreaView style={{ flex: 1}}>
      <View style={{ flex: 1, alignItems: 'center',justifyContent: "center"}}>
        {showTopList && <PlayerList passObjectToParent={receiveObjectFromGrandChild} />}
        {showTopPlayer && <TopCard />}
      </View>
      <Divider />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: "center"}}>
        {showBotList && <PlayerList passObjectToParent={receiveObjectFromGrandChild2} />}
        {showBotPlayer && <BotCard />}
      </View>
      <View style={{ flex: .4, flexDirection: "row", alignItems: 'center'  }} >
      <Pressable onPress={() => toggleTop()} style={({ pressed }) => [{ paddingRight: 15, width: 80, height: 80, alignItems: "center", borderRadius: 10 },
                    pressed && SHADOWS.large
                    ]}>
                        {({ pressed }) => {
                            return (
                                <Image source={(icons.Cleartop)} style={[{ width: 80, height: 80, resizeMode: "center", borderRadius: 10 },
                                pressed && { opacity: 0.70 }
                                ]} />
                            );
                        }}
                    </Pressable>
      <Pressable onPress={() => toggleBot()} style={({ pressed }) => [{ paddingRight: 15, width: 80, height: 80, alignItems: "center", borderRadius: 10 },
                    pressed && SHADOWS.large
                    ]}>
                        {({ pressed }) => {
                            return (
                                <Image source={(icons.Clearbot)} style={[{ width: 80, height: 80, resizeMode: "center", borderRadius: 10 },
                                pressed && { opacity: 0.70 }
                                ]} />
                            );
                        }}
                    </Pressable>
      </View>
    </SafeAreaView>
    </BackImg>
  );
};

export default Compare;
