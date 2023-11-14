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
    <ImageBackground source={images.background0} style={style.CardContainer} imageStyle={{resizeMode: "contain", borderRadius:20}}>
      <Pressable style={({pressed})=>[
        { flex : 1 }
      ]}>
        {({ pressed }) => {
          return (
            <View style={[
              {flex : 1}, pressed && { opacity: 0.8, ...SHADOWS.small}
            ]}>

              <View>
                <Text style={{color: COLORS.light}}> {item.teamName} </Text>
                <Text style={{color: COLORS.light}}>{item.city}</Text>
              </View>
              <View>
              <Image source={(backImages[item.teamAbv])} style={style.ImageLayout}/>
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
      height: 540,
    },
    ImageLayout: {
      width: 150,
      height: 150,
      resizeMode:
      "cover",
      borderRadius: 20,
    },
    TeamNameLayout: {
      textAlign: "left",
      color: "#121212",
      fontSize: 10,
      position: "absolute",
      left: 3,
      top: 15,
      fontWeight: "bold",
      width: 140,
    },
    TeamConferenceLayout: {
      textAlign: "left",
      color: "#121212",
      fontSize: 10,
      position: "absolute",
      top: 5,
      left: 3,
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
  