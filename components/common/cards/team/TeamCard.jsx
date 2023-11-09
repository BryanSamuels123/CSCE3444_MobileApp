import * as React from "react";
import { StyleSheet, TouchableOpacity} from "react-native";
import { Card, Text } from "react-native-paper";
import { COLORS } from "../../../../constants";
import { Link } from "expo-router";

const TeamCard = ({ item }) => {
    return (
      <Link href={item.link} asChild>
        <TouchableOpacity>
          <Card style={style.CardContainer}>
            <Card.Cover
              style={style.ImageLayout}
              source={{ uri: item.teamlogo }}
            />
            <Card.Cover style={style.TeamStatsLayout} />
            <Card.Content>
              <Text style={style.TeamConferenceLayout}>{item.conference}</Text>
              <Text style={style.TeamNameLayout}>{item.name}</Text>
              <Text style={style.StatsTitle}>Stats</Text>
              <Text style={style.StatsList}>
                Win: {item.wins}
                {"\n"}
                L: {item.loses}
                {"\n"}
                W%: {item.winPercent}
                {"\n"}
                STRK: {item.streak}
                {"\n"}
                L10: {item.last10}
                {"\n"}
              </Text>
            </Card.Content>
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
  