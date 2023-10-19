import * as React from "react";
import { SafeAreaView, Text, Image, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { COLORS } from "../constants";
import Video from "react-native-video";
import { StatusBar } from "expo-status-bar";
import { Players } from "../components";

const TestPage = () => {

  const teams = [
    {id: 6, title: "Milwaukee Bucks", 
    imageUrl: "https://cdn.nba.com/teams/uploads/sites/1610612749/2022/03/1150409-wallpaper-primary-640x480-1.jpg", 
    },
];

  const players = [
    {
      id: 1,
      name: "Giannis Antetokounmpo",
      imageUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png",
    },
    {
      id: 2,
      name: "Damian Lillard",
      imageUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203081.png",
    },
    {
      id: 3,
      name: "Bobby Portis",
      imageUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1626171.png",
    },
    {
      id: 3,
      name: "Marjon Beauchamp",
      imageUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1630699.png",
    },
    {
      id: 3,
      name: "Cameron Payne",
      imageUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1626166.png",
    },
];


const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  return (
    
      <SafeAreaView style={style.Container}>
      <ScrollView style={style.Container}>
      <Text style={style.BigTitle}>Milwaukee Bucks</Text>
      <View style={style.ImageB}>
        <Image 
          source={{uri: teams[0].imageUrl}}
          style={style.Image}
        />
      </View>
      
       <Text style={style.BigTitle}>Highlights</Text>
       {isVideoPlaying ? (
        <Video
          //source={{ uri: "https://youtu.be/fLrlIZG98yM?si=54qMDNHu-1_uuJ8K" }} 
          //Download videos and add it
          style={style.Card}
          controls
          resizeMode="contain"
        />
      ) : (
        <TouchableOpacity
          style={style.Card}
          underlayColor="transparent"
          onPress={() => {
            setIsVideoPlaying(true); // Start playing the video
          }}
        >
          <View>
            <Text style={style.VideoButtonText}>Play Video</Text>
          </View>
        </TouchableOpacity>
        
      )}
      
      <View>
      <Text style={style.BigTitle}>Players</Text>
      <ScrollView horizontal={true} style={style.PlayersCard}>
        {players.map((player) => (
          <View style={style.Player}>
           
            <Image
              source={{uri: player.imageUrl}}
              style={style.PlayerImage}
            />
            <Text style={style.PlayerName}></Text>
          </View>
        ))}
        
      
      </ScrollView>
      <Text style={style.BigTitle}>General Info</Text>
 
      <View style={style.GeneralInfoCard}>
        <Text style={style.GeneralInfoText}>-Team Info: The Milwaukee Bucks are an 
        American professional basketball team in Milwaukee.{"\n"} 
        {"\n"}- Head Coach: LLLLLL {"\n"}
        {"\n"}- Owner: MMMMM {"\n"}
        {"\n"}- The Bucks compete in the National Basketball Association 
        as a member of the Central Division of the Eastern Conference. 
        Fiserv Forum is where they play games at. </Text>
      </View>

    <Text style={style.BigTitle}>History</Text>
 
   <View style={style.GeneralInfoCard}>
   <Text style={style.GeneralInfoText}>- 
   The team was founded in 1968 as an expansion team, 
   and play at Fiserv Forum. 
   {"\n"}-Wins: 10000
   {"\n"}-Past Names: The ________ </Text>
  </View>

      </View>
    </ScrollView>
    </SafeAreaView>
  );
};
export default TestPage;


const style = StyleSheet.create({
    
    Container: {
      backgroundColor: COLORS.dark,
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    BigTitle: {
      fontSize: 30, 
      fontWeight: 'bold', 
      marginVertical: 5, 
      textAlign: 'center',
      color: 'white' 
    },
    Card: {
      marginTop: 20,
      marginBottom: 20, 
      marginHorizontal: 45,
      width: 340,
      height: 200, 
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#121212",
      backgroundColor: COLORS.orange,
      justifyContent:"center",
      alignItems: "center",
    },
    Image: {
      marginTop: 0,
      marginHorizontal: 0,
      width: 340,
      height: 100,
      borderWidth: 0,
      paddingBottom: 100,
      padding:10,
      borderRadius: 10,
      borderWidth: 2,
      alignItems: "center",
    },
    ImageB: {
      backgroundColor: COLORS.dark,
      marginVertical: 10,
      marginHorizontal: 20,
      paddingBottom: 10,
      borderRadius: 10,
      alignItems: "center",
    },
    PlayersCard: {
      marginTop: 10,
      marginHorizontal: 10,
      color: 'green',
    },
    Player: {
      width: 140, 
      marginHorizontal: 0,
      alignItems: 'center',
    },
    PlayerImage: {
      width: 100,
      height: 100,
      borderRadius: 0,    
    },
    PlayerName: {
      color: 'white',
      textAlign: 'center',
    },
    GeneralInfoCard: {
      width: 350,
      backgroundColor: COLORS.orange, 
      borderRadius: 10,
      borderWidth: 1,
      padding: 10,
      marginBottom: 20,
      marginHorizontal:40,
      alignItems: 'center',
      alignContent: 'center',
    },
    GeneralInfoText: {
      fontSize: 16,
      color: 'black', 
      marginBottom: 5,
      alignItems: 'center',
      alignContent: 'center',
    },
});