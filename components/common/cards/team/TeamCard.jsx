import * as React from "react";
import { StyleSheet, TouchableOpacity,Image, View, Pressable, ImageBackground} from "react-native";
import { Card, Text } from "react-native-paper";
import { COLORS, images, SHADOWS, FONTS } from "../../../../constants";
import { Link } from "expo-router";

const backImages = {
  "ATL": images.hawksLogo,
  "BKN": images.netsLogo,
  "BOS": images.celtsLogo,
  "CHA": images.hornetsLogo,
  "CHI": images.bullsLogo,
  "CLE": images.cavsLogo,
  "DAL": images.mavsLogo,
  "DEN": images.nuggetsLogo,
  "DET": images.pistonsLogo,
  "GSW": images.warriorsLogo,
  "HOU": images.rocketsLogo,
  "IND": images.pacersLogo,
  "LAC": images.clippersLogo,
  "LAL": images.lakersLogo,
  "MEM": images.grizzliesLogo,
  "MIA": images.heatLogo,
  "MIL": images.bucksLogo,
  "MIN": images.timberLogo,
  "NA": images.defBackground,
  "NOP": images.pelicansLogo,
  "NYK": images.knicksLogo,
  "OKC": images.thunderLogo,
  "ORL": images.magicLogo,
  "PHI": images.sixersLogo,
  "PHX": images.sunsLogo,
  "POR": images.trailLogo,
  "SAC": images.kingsLogo,
  "SAS": images.spursLogo,
  "TOR": images.raptorsLogo,
  "UTA": images.jazzLogo,
  "WAS": images.wizardsLogo,
};

const tempImg = require("../../../../assets/images/teamLogos/defaultPlayer.jpeg")

//create TeamCard that will be used throughout the flatlist
const TeamCard = ({ item }, handleNavigate) => {

  console.log(item)

  let imgSource = (item.teamLogoURI != null) ? {uri: item.teamLogoURI} : images.defaultPlayerPic;
  return(
    <ImageBackground source={images.background0} style={style.CardContainer} imageStyle={{resizeMode: "stretch", borderRadius:20}}>
      <Pressable style={({pressed})=>[
        { flex : 1 }
      ]}>
        {({ pressed }) => {
          return (
            <View style={[
              {flex : 1}, pressed && { opacity: 0.8, ...SHADOWS.small}
            ]}>
              {/*Team Name and Location*/}
              <View>
                <Text style={style.TeamNameLayout}> {item.teamName}</Text>
                <Image source={(backImages[item.teamAbv])} style={style.ImageLayout}/>
              </View>
              {/*Team Logo*/}
              <View>
              </View>
            </View>
          );
        }}

        </Pressable>
  </ImageBackground>
  );
};
  export default TeamCard;
  
  const style = StyleSheet.create({
    CardContainer: {
      margin: 5,
      width: 342.7,
      height: 300,
    },
    ImageLayout: {
      alignItems:"center",
      justifyContent: "center",
      marginTop: 30,
      marginLeft: 90,
      width: 160,
      height: 160,
      
      borderRadius: 20,
    },
    TeamNameLayout: {
      color: COLORS.light,
      fontSize: 25,
      flexDirection: "row",
      textAlign: "center",
      justifyContent: "flex-start",
      fontWeight: "bold",
    },
    TeamLocation: {
      textAlign: "center",
      alignItems: "center",
      flexDirection: "row",
      color: COLORS.light,
      position: "absolute",
      marginLeft: 90,
      fontSize: 25,
      marginTop: 220,
    },
    TeamStatsLayout: {
      marginTop: 5,
      marginHorizontal: 3,
      position: "absolute",
      backgroundColor: COLORS.dark,
      right: 0,
      height: 100,
      width: 65,
    },
    StatsList: {
      textAlign: "left",
      color: COLORS.light,
      fontSize: 10,
      position: "absolute",
      right: 9,
      top: -65,
      width: 55,
    },
    StatsTitle: {
      textAlign: "center",
      color: COLORS.light,
      fontSize: 10,
      position: "absolute",
      right: 10,
      top: -85,
      width: 50,
      fontWeight: "bold",
    },
  });
  