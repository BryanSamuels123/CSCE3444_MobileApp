import * as React from "react";
import { StyleSheet, TouchableOpacity} from "react-native";
import { Card, Text } from "react-native-paper";
import { COLORS } from "../../../../constants";
import { Link } from "expo-router";

const tempImg = require("../../../../assets/images/teamLogos/defaultPlayer.jpeg")

//create TeamCard that will be used throughout the flatlist
const TeamCard = ({ item }, handleNavigate) => {

  //console.log(item)

  let imgSource = (item.teamLogoURl != null) ? {uri: item.teamLogoURl} : images.defaulPlayerPic;

  return (
      //link -> leads to a different page when clicked on
      <Link href={item.link} asChild> 
          <TouchableOpacity>
              <Card 
                  style={style.CardContainer}
              >
                  <Card.Cover
                      style={style.ImageBackground}
                      source={{ uri: item.logo}}
                  />
                  <Card.Cover style={style.BlackBar}/>
                      <Text style={style.leftData}>
                          Wins: {item.wins}
                          {"\n"}
                          Losses: {item.losses}
                      </Text>
                      <Text style={style.RightData}>
                          Conference: {item.conference}
                          {"\n"}
                          Streak: {item.streak}
                      </Text>
                      <Text style={style.TeamName}>{item.title}</Text>

              </Card>
          </TouchableOpacity>
      </Link>
  );
};
  export default TeamCard;
  
  const style = StyleSheet.create({
    CardContainer: {
      backgroundColor: COLORS.orange,
      margin: 5,
      width: 160,
      height: 125,
    },
    ImageLayout: {
      marginTop: 5,
      marginHorizontal: 3,
      width: 85,
      height: 85,
      borderWidth: 0.5,
      borderRadius: 10,
      borderColor: "#121212",
      backgroundColor: "transparent",
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
  