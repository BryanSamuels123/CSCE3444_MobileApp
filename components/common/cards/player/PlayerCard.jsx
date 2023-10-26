import * as React from "react";
import { StyleSheet, TouchableOpacity, Image, Pressable, View, Text, ImageBackground } from "react-native";
import { Card } from "react-native-paper";
import { COLORS, images, SHADOWS } from "../../../../constants";
import {useRouter} from "expo-router";
import { Link } from "expo-router";

/* From the React Native Paper Lib 

The Text containers are what need to be changed to dynamicly pull from database.
If need be, this can just be put into MainPage.js.
on press it 
*/
const backImages = {
  "ATL": images.hawksBackground,
  "BKN": images.netsBackground,
  "BOS": images.celticsBackground,
  "CHA": images.hornetsBackground,
  "CHI": images.bullsBackground,
  "CLE": images.cavsBackground,
  "DAL": images.mavsBackground,
  "DEN": images.nuggetsBackground,
  "DET": images.pistonsBackground,
  "GSW": images.warriorsBackground,
  "HOU": images.rocketsBackground,
  "IND": images.pacersBackground,
  "LAC": images.clippersBackground,
  "LAL": images.lakersBackground,
  "MEM": images.grizzliesBackground,
  "MIA": images.heatBackground,
  "MIL": images.bucksBackground,
  "MIN": images.timberwolvesBackground,
  "NA": images.defBackground,
  "NOP": images.pelicansBackground,
  "NYK": images.knicksBackground,
  "OKC": images.okcBackground,
  "ORL": images.magicBackground,
  "PHI": images.sixersBackground,
  "PHX": images.sunsBackground,
  "POR": images.tbBackground,
  "SAC": images.kingsBackground,
  "SAS": images.spursBackground,
  "TOR": images.raptorsBackground,
  "UTA": images.jazzBackground,
  "WAS": images.wizardsBackground
};

const tempImg = require("../../../../assets/images/playerHeadShots/headShot-151.png")

const PlayerCard = ({item}, handleNavigate) => {
  
  // console.log(item)
  // may need to change in the future if doesn't catch all errors
  const imagePath = (item.playerHeadshot) ? `../../../../assets/images/playerHeadShots${item.playerHeadshot}` : "../../../../assets/images/playerHeadShots/defaultPlayer.jpeg"
  
  let image = "";
  
  // if(!item.playerHeadshot){
    image = require("../../../../assets/images/playerHeadShots/defaultPlayer.jpeg");

    return(
      // <Text>hi</Text>
      // [playerFile, setPlayerFile] = useState();
      <ImageBackground source={(backImages[item.teamAbv])} style={{flex: 1, width: 330, height: 520, margin: 5}} imageStyle={{resizeMode: "contain", borderRadius: 20}}>
        <Pressable style={({pressed}) => [
          {flex: 1}
        ]}>
          {({pressed}) => {
              return(
              <View style={{flex: 1, flexDirection: "row"}}>
                <View style={{width: 120, height: 130, marginLeft: 30, marginTop: 10}}>
                  <Image source={(tempImg)} style={[
                    {width: 120, height: 156, resizeMode: "cover", borderRadius: 20}
                  ]}/>
                </View>
                
              </View>
              );
          }}
        </Pressable>
      </ImageBackground>
    );
      // <Link href="/testpage" asChild>
        // <Pressable onPress={(handleNavigate)}>
        // {({pressed}) => {
        //   return(
        //     <Card style={style.cardContainer}>
        //       <Card.Cover
        //         style={style.imageLayout}
        //         source={image}
        //       />
        //       <Card.Cover style={style.statsLayout} />
        //       <Card.Content>
        //         <Text style={style.nameLayout}>{item.playerName}</Text>
        //         <Text style={style.teamLayout}>{item.teamAbv}</Text>
        //         <Text style={style.statsTitle}>Stats</Text>
        //         <Text style={style.statsList}>
        //           PPG: {item.PTS}
        //           AST: {item.AST}
        //           REB: {item.REB}
        //           FG%: {item.FG_PERCENT}
        //         </Text>
        //       </Card.Content>
        //   </Card>
          // );
        // }}
        // </Pressable>
      // </Link>
  //   )
  // }
  // else{
  //   return(
  //   <Pressable onPress={(handleNavigate)}>
  //     {({pressed}) =>{
  //       return(
  //         <Card style={style.cardContainer}>
  //           <Card.Cover
  //             style={style.imageLayout}
  //             source={{uri: item.playerHeadshot}}
  //           />
  //           <Card.Cover style={style.statsLayout} />
  //           <Card.Content>
  //             <Text style={style.nameLayout}>{item.playerName}</Text>
  //             <Text style={style.teamLayout}>{item.teamAbv}</Text>
  //             <Text style={style.statsTitle}>Stats</Text>
  //             <Text style={style.statsList}>
  //               PPG: {item.PTS}
  //               AST: {item.AST}
  //               REB: {item.REB}
  //               FG%: {item.FG_PERCENT}
  //             </Text>
  //           </Card.Content>
  //         </Card>
  //       );
  //     }}
  //   </Pressable>
  //   )
  // }
  


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
