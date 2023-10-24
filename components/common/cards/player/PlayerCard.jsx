import * as React from "react";
import { StyleSheet, TouchableOpacity, Image, Pressable, View, Text, ImageBackground } from "react-native";
import { Card } from "react-native-paper";
import { COLORS } from "../../../../constants";
import {useRouter} from "expo-router";
import { Link } from "expo-router";
import fetchHook from "../../../../hook/fetchHook";

/* From the React Native Paper Lib 

The Text containers are what need to be changed to dynamicly pull from database.
If need be, this can just be put into MainPage.js.
on press it 
*/

const PlayerCard = ({item}, handleNavigate) => {
  
  // console.log(item)
  // may need to change in the future if doesn't catch all errors
  const imagePath = (item.playerHeadshot) ? `../../../../assets/images/playerHeadShots${item.playerHeadshot}` : "../../../../assets/images/playerHeadShots/defaultPlayer.jpeg"

  let image = "";
  
  if(!item.playerHeadshot){
    image = require("../../../../assets/images/playerHeadShots/defaultPlayer.jpeg");

    return(
      // [playerFile, setPlayerFile] = useState();

      // <Pressable>
      //   {({presssed}) =>{
      //     return(
      //       // <View style={{flex: 1}}> needs closing view
      //         <ImageBackground style={{flex: 1, backgroundColor: COLORS.backGround_purple, width: "90%", height: "100%"}}>

      //           <
      //             <Image source={image} style={{flex: 2, width: "10%", height: "10%"}}/>

      //           <View style={{flex: 3}}>
      //             <Text style={{textAlign: "center", textAlignVertical: "center"}}>
      //               Hello World
      //             </Text>
      //           </View>
      //         </ImageBackground>
           
      //     )
      //   }}
      // </Pressable>
      
      // <Link href="/testpage" asChild>
        <Pressable onPress={(handleNavigate)}>
        {({pressed}) => {
          return(
            <Card style={style.cardContainer}>
              <Card.Cover
                style={style.imageLayout}
                source={image}
              />
              <Card.Cover style={style.statsLayout} />
              <Card.Content>
                <Text style={style.nameLayout}>{item.playerName}</Text>
                <Text style={style.teamLayout}>{item.teamAbv}</Text>
                <Text style={style.statsTitle}>Stats</Text>
                <Text style={style.statsList}>
                  PPG: {item.PTS}
                  AST: {item.AST}
                  REB: {item.REB}
                  FG%: {item.FG_PERCENT}
                </Text>
              </Card.Content>
          </Card>
          );
        }}
        </Pressable>
      // </Link>
    )
  }
  else{
    return(
    <Pressable onPress={(handleNavigate)}>
      {({pressed}) =>{
        return(
          <Card style={style.cardContainer}>
            <Card.Cover
              style={style.imageLayout}
              source={{uri: item.playerHeadshot}}
            />
            <Card.Cover style={style.statsLayout} />
            <Card.Content>
              <Text style={style.nameLayout}>{item.playerName}</Text>
              <Text style={style.teamLayout}>{item.teamAbv}</Text>
              <Text style={style.statsTitle}>Stats</Text>
              <Text style={style.statsList}>
                PPG: {item.PTS}
                AST: {item.AST}
                REB: {item.REB}
                FG%: {item.FG_PERCENT}
              </Text>
            </Card.Content>
          </Card>
        );
      }}
    </Pressable>
    )
  }
  


  };

export default PlayerCard;

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.orange,
    margin: 5,
    width: 140,
    height: 120,
  },
  imageLayout: {
    marginTop: 5,
    marginHorizontal: 3,
    width: 80,
    height: 80,
    borderWidth: 0.1,
    borderRadius: 10,
    borderColor: "#121212",
    backgroundColor: "#121212",
  },
  nameLayout: {
    textAlign: "left",
    color: "#121212",
    fontSize: 10,
    position: "absolute",
    paddingLeft: 3,
  },
  teamLayout: {
    textAlign: "left",
    color: "#121212",
    fontSize: 10,
    position: "absolute",
    top: 10,
    paddingLeft: 3,
  },
  statsLayout: {
    marginTop: 5,
    marginHorizontal: 3,
    position: "absolute",
    backgroundColor: COLORS.dark,
    right: 0,
    height: 110,
    width: 50,
  },
  statsList: {
    textAlign: "left",
    color: COLORS.light,
    fontSize: 10,
    position: "absolute",
    right: 10,
    top: -60,
    width: 40,
  },
  statsTitle: {
    textAlign: "center",
    color: COLORS.light,
    fontSize: 10,
    position: "absolute",
    right: 10,
    top: -80,
    width: 40,
  },
});
