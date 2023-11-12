import { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, ActivityIndicator, View, TextInput, TouchableOpacity, Modal, ImageBackground, TouchableWithoutFeedback, Image } from "react-native";
import TeamCard from "../../common/cards/team/TeamCard";
import { useRouter } from "expo-router";
import fetchHook from "../../../hook/fetchHook";
import { COLORS, SIZES, FONTS, SHADOWS, images, icons } from "../../../constants";



const Teams = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [phText, setphText] = useState("Search");
  const [family, setFamily] = useState(FONTS.thin);
  const [color, setColor] = useState(COLORS.pastelPurpleLow);
  const [shown, setShown] = useState(false);
  const [newData, setNewData] = useState([]);
  const [modalOverlay, setModalOverlay] = useState("#00000000");
  const [sortToggleTeam, setSortToggleTeam] = useState(0);
  const [sortTogglePlayer, setSortTogglePlayer] = useState(0);
  const [arrowIcon, setArrowIcon] = useState(null);
  const router = useRouter();

  const result = fetchHook("teamData", { teamName: "all"});

  const handleToggle = (type) => {
    setSortToggleTeam((prevState) => (prevState == 2 ? 0 : prevState + 1));
  }

  let filteredData = [];

  if (newData[0]) {
    filteredData = (searchQuery) ? newData.filter((team) =>
      team.teamName.toLowerCase().includes(searchQuery.toLowerCase())) : newData.data;
  }
  else {
    filteredData = (searchQuery) ? result.data.filter((team) =>
      team.teamName.toLowerCase().inclues(searchQuery.toLowerCase())) : result.data
  }

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  }

  //Arrow for sorting
  const getIcon = (sortToggle) => {
    //Arrow Orientation (Switches between 3 cases)
    switch (sortToggle) {
        case 0:
            return null; // No arrow
        case 1:
            return (
                <View style={{}}>
                    <Image source={icons.upArrow} resizeMode="contain" style={{ width: 33, height: 25 }} />
                </View>
            ); // Arrow up
        case 2:
            return (
                <View style={styles.arrowContainer}>
                    <Image source={icons.downArrow} resizeMode="contain" style={{ width: 33, height: 25 }} />
                </View>
            ); // Arrow down
        default:
            return null;
    }
}

const handleSort = () => {
  if (sortToggleTeam == 0) {
    setNewData([]);
    return;
  }
  
  const sortedData = [...result.data];
}

  return (
    <View>
      <Text style={style.ListHeaders}>{"\t"}Teams</Text>
      
    </View>
  );
};
export default Teams;

const style = StyleSheet.create({

  arrowContainer: {

  },

  ListHeaders: {
      fontWeight: "bold",
      marginTop: 15,
      color: COLORS.light,
  }
  ,
  cardContainer: {
      backgroundColor: COLORS.orange,
      margin: 5,
      width: 140,
      height: 120,
  },
});