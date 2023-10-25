import * as React from "react";
import { StyleSheet, TouchableOpacity} from "react-native";
import { Card, Text } from "react-native-paper";
import { COLORS } from "../../../../constants";
import { Link } from "expo-router";

const LearnCard = ({ item }) => {
    return (
      <Link href={item.link} asChild>
        <TouchableOpacity>
          <Card style={style.CardContainer}>
            <Card.Cover
              style={style.LearnImageLayout}
              source={{ uri: item.image }}
            />
            <Card.Content>
              <Text style={style.LearnNameLayout}>{item.name}</Text>
              <Text style={style.LearnDefLayout}>{item.definition}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </Link>
    );
  };
export default LearnCard;

const style = StyleSheet.create({
    CardContainer: {
      backgroundColor: COLORS.orange,
      margin: 5,
      width: 160,
      height: 125,
    },
    LearnImageLayout: {
      marginTop: 5,
      marginHorizontal: 5,
      width: 150,
      height: 80,
      borderWidth: 0.5,
      borderRadius: 10,
      borderColor: "#121212",
      backgroundColor: "transparent",
    },
    LearnNameLayout: {
      textAlign: "left",
      color: "#121212",
      fontSize: 10,
      position: "absolute",
      left: 3,
      top: 0,
      fontWeight: "bold",
      width: 140,
    },
    LearnDefLayout: {
      textAlign: "left",
      color: "#121212",
      fontSize: 10,
      position: "absolute",
      top: 10,
      left: 3,
      width: 140,
    },
  });
  