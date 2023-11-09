import * as React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { COLORS } from "../../../../constants";
import { Link, useRouter } from "expo-router";
import fetchHook from "../../../../hook/fetchHook";

//This is the playercard file for the Compare page

const PlayerCardC = ({ item, passObjectToParent }) => {

  const imagePath = item.playerHeadshot
    ? `../../../../assets/images/playerHeadShots${item.playerHeadshot}`
    : "../../../../assets/images/playerHeadShots/defaultPlayer.jpeg";

  let image = "";
  const router = useRouter();

  const passObjectToParentHandler = () => {
    passObjectToParent(item);
  };

  if (!item.playerHeadshot) {
    image = require("../../../../assets/images/playerHeadShots/defaultPlayer.jpeg");

    return (
      <TouchableOpacity onPress={passObjectToParentHandler}>
        <Card style={style.cardContainer}>
          <Card.Cover style={style.imageLayout} source={image} />
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
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={passObjectToParentHandler}>
        <Card style={style.cardContainer}>
          <Card.Cover
            style={style.imageLayout}
            source={{ uri: item.playerHeadshot }}
          />
          <Card.Cover style={style.statsLayout} />
          <Card.Content>
            <Text style={style.nameLayout}>{item.playerName}</Text>
            <Text style={style.teamLayout}>{item.teamAbv}</Text>
            <Text style={style.statsTitle}>Stats</Text>
            <Text style={style.statsList}>
              PPG: {item.PTS} {"\n"}
              AST: {item.AST} {"\n"}
              REB: {item.REB} {"\n"}
              FG%: {item.FG_PERCENT} {"\n"}
            </Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  }
};

export default PlayerCardC;

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.orange,
    margin: 5,
    width: 160,
    height: 125,
  },
  imageLayout: {
    marginTop: 5,
    marginHorizontal: 3,
    width: 85,
    height: 85,
    borderWidth: 0.5,
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
    fontWeight: "bold",
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
    height: 115,
    width: 65,
  },
  statsList: {
    textAlign: "left",
    color: COLORS.light,
    fontSize: 10,
    position: "absolute",
    right: 9,
    top: -65,
    width: 55,
  },
  statsTitle: {
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
