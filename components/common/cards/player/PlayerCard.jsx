import * as React from "react";
import { StyleSheet, TouchableOpacity, Image, Pressable, View, Text, ImageBackground } from "react-native";
import { Card } from "react-native-paper";
import { COLORS, images, SHADOWS, FONTS } from "../../../../constants";
import { useRouter } from "expo-router";
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

const PlayerCard = ({ item }, handleNavigate) => {

  // console.log(item)
  // may need to change in the future if doesn't catch all errors
  let imgSource = (item.playerHeadshot != null) ? { uri: item.playerHeadshot } : images.defaultPlayerPic;

  let fontColor = (item.teamAbv !== "NA") ? "#FFFFFF" : "#000000"

  if (item.teamAbv === "NA"){
    item.teamName = "National Basketball Association";
  }

  // console.log(fontColor)
  return (

    <ImageBackground source={(backImages[item.teamAbv])} style={styles.cardContainer} imageStyle={{ resizeMode: "contain", borderRadius: 20 }}>
      <Pressable onPress={() =>{console.log(item.teamAbv)}} style={({ pressed }) => [
        { flex: 1 }
      ]}>
        {({ pressed }) => {
          return (
            // house the entire card
            <View style={[
              { flex: 1 },
              pressed && { opacity: 0.8, ...SHADOWS.small }
            ]}>

              {/* player headshot, and general info container */}
              <View style={{ flex: 1.2, flexDirection: "row" }}>

                {/* headshot */}
                <View style={styles.headshotContainer}>
                  <Image source={imgSource} style={styles.headImgContainer} />
                </View>

                {/* general info container */}
                <View style={{ flex: 1, flexDirection: "column" }}>

                  {/* Position and number section */}
                  <View style={styles.position_numberContainer}>

                    {/* position */}
                    <View style={styles.posContainer}>
                      <Text style={{...styles.posText, color: fontColor}}>POS{"\n"}{item.position}</Text>
                    </View>

                    {/* number */}
                    <Text style={{...styles.numberContainer, color: fontColor}}>#{item.jerseyNumber}</Text>
                  </View>

                  {/* name section */}
                  <View style={styles.nameContainer}>
                    <Text style={{...styles.nameText, color: fontColor}}>{item.playerName}</Text>
                  </View>

                </View>

              </View>


              {/* Top stats section */}
              <View style={styles.statsTopContainer}>

                <View style={styles.statsHeaderContainer}>
                  <Text style={{...styles.statsHeader, color: fontColor}}>PPG</Text>
                  <Text style={{...styles.statsText, color: fontColor}}>{item.PTS}</Text>
                </View>

                <View style={styles.statsHeaderContainer}>
                  <Text style={{...styles.statsHeader, color: fontColor}}>FG%</Text>
                  <Text style={{...styles.statsText, color: fontColor}}>{item.FG_PERCENT}</Text>
                </View>

                <View style={styles.statsHeaderContainer}>
                  <Text style={{...styles.statsHeader, color: fontColor}}>AST</Text>
                  <Text style={{...styles.statsText, color: fontColor}}>{item.AST}</Text>
                </View>

              </View>

              {/* Bottom stats section */}
              <View style={{ flex: 0.9, flexDirection: "row" }}>

                <View style={styles.statsHeaderContainer}>
                  <Text style={{...styles.statsHeader, color: fontColor}}>REB</Text>
                  <Text style={{...styles.statsText, color: fontColor}}>{item.REB}</Text>
                </View>

                <View style={styles.statsHeaderContainer}>
                  <Text style={{...styles.statsHeader, color: fontColor}}>BPM</Text>
                  <Text style={{...styles.statsText, color: fontColor}}>{item.PLUS_MINUS}</Text>
                </View>

                <View style={styles.statsHeaderContainer}>
                  <Text style={{...styles.statsHeader, color: fontColor}}>TOV</Text>
                  <Text style={{...styles.statsText, color: fontColor}}>{item.TOV}</Text>
                </View>

              </View>


              {/* team name section */}
              <View style={styles.teamNameContainer}>
                <Text style={{...styles.teamNameText, color: fontColor}}>{item.teamName}</Text>
              </View>

            </View>
          );
        }}
      </Pressable>
    </ImageBackground>
  );
};

export default PlayerCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: 342.7, //342.7 or 330 ?
    height: 540, //540 or 520 ?
    margin: 5,
    ...SHADOWS.medium
  },

  headshotContainer: {
    width: 120,
    height: 150,
    marginLeft: 30,
    marginTop: 10
  },

  headImgContainer: {
    width: 120,
    height: 150,
    resizeMode:
      "cover",
    borderRadius: 20
  },

  position_numberContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row"
  },

  posContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 10,
    justifyContent: "flex-start"
  },

  posText: {
    // color: "#FFFFFF",
    fontFamily: FONTS.light,
    fontSize: 16,
    textAlign: "center"
  },

  numberContainer: {
    marginRight: 20,
    marginTop: 10,
    // color: "#FFFFFF",
    fontFamily: FONTS.light,
    fontSize: 16
  },

  nameContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },

  nameText: {
    // color: "#FFFFFF",
    lineHeight: 20,
    fontFamily: FONTS.light,
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 10,
    width: 150
  },

  statsTopContainer: {
    flex: 0.9,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 30
  },

  statsHeaderContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  },

  statsHeader: {
    // color: "#FFFFFF",
    fontFamily: FONTS.light,
    fontSize: 24,
    textAlign: "center",
    lineHeight: 30
  },

  statsText: {
    // color: "#FFFFFF",
    fontFamily: FONTS.light,
    fontSize: 16,
    textAlign: "center"
  },

  teamNameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  teamNameText: {
    // color: "#FFFFFF",
    fontFamily: FONTS.light,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 30,
    paddingTop: 45,
    paddingLeft: 40
  },

});
