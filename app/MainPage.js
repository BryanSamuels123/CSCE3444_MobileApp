// will clean up components, and put into own files in last sprint

import * as React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Pressable
} from "react-native";
import { Card } from "react-native-paper";
import { Players } from "../components";
import { COLORS, FONTS, icons, images, SHADOWS } from "../constants";
import { Link, useRouter } from "expo-router";


const TeamData = [
  {
    name: "Milwaukee Bucks",
    conference: "East Conference",
    wins: "38",
    loses: "44",
    streak: "L2",
    last10: "6-4",
    winPercent: ".463",
    teamlogo:
      "https://1000logos.net/wp-content/uploads/2018/01/milwaukee-bucks-new-logo.jpg",
    link: "/TestPage",
  },
  {
    name: "Dallas Mavericks",
    conference: "West Conference",
    wins: "58",
    loses: "24",
    streak: "L2",
    last10: "2-8",
    winPercent: ".707",
    teamlogo:
      "https://1000logos.net/wp-content/uploads/2018/05/Dallas-Mavericks-Logo-Color.jpg",
    link: "/testpage",
  },
  {
    name: "New York Knicks",
    conference: "East Conference",
    wins: "47",
    loses: "35",
    streak: "L1",
    last10: "5-5",
    winPercent: ".573",
    teamlogo:
      "https://1000logos.net/wp-content/uploads/2017/12/New-York-Knicks-Emblem.jpg",
    link: "/testpage",
  },
  {
    name: "Los Angeles Lakers",
    conference: "West Conference",
    wins: "43",
    loses: "39",
    streak: "W2",
    last10: "8-2",
    winPercent: ".524",
    teamlogo:
      "https://1000logos.net/wp-content/uploads/2017/03/los-angeles-lakers-logo.jpg",
    link: "/testpage",
  },
];
const LearnData = [
  {
    name: "Intro to the Sport",
    definition: "Learn the sport of Basketball",
    image:
      "https://images.unsplash.com/photo-1627627256672-027a4613d028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    link: "/testpage",
  },
  {
    name: "Common Plays",
    definition: "Learn the common plays in Basketball",
    image:
      "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    link: "/testpage",
  },
  {
    name: "Common Terms",
    definition: "Learn the common terms in Basketball",
    image:
      "https://images.unsplash.com/photo-1543497415-75c0a27177c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80",
    link: "/testpage",
  },
];

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

const greetings = {
  "New Learners": [
    "Welcome, Rookie! Let's start your NBA stats journey.",
    "Beginner's Luck! Ready to dive into the world of stats?",
    "Hey there, Newbie! Time to get your basketball learn on."
  ],
  "Intermediate Learners": [
    "Impressive Progress, Basketball Enthusiast!",
    "You're Nailing It! Let's explore more together.",
    "Keep the Momentum Going, Stats Apprentice!"
  ],
  "Advanced Learners": [
    "High-Level Stat Seeker, Welcome Back!",
    "Stats Virtuoso, Dive Deeper into the Game!",
    "You're on Fire! Ready for some next-level insights?"
  ],
  "Expert Learners": [
    "You're an NBA Stats Veteran, Keep It Up!",
    "Stats All-Star, What Can We Uncover Today?",
    "Elite Status Achieved! Let's Push the Boundaries!"
  ],
  "Formal": [
    "Welcome to the NBA Stats Hub!",
    "Hello, Basketball Enthusiast!",
    "Get Ready to Dive into NBA Stats!",
    "Explore the NBA with Our Stats Dashboard!",
    "Your Gateway to NBA Insights.",
    "Discover the World of NBA Statistics.",
    "Score with Our NBA Stats Center.",
    "Step into the World of Hoops Data.",
    "Your All-Access Pass to NBA Numbers.",
    "Let's Dive into NBA Stats, Shall We.",
    "Unlock the Magic of NBA Statistics.",
    "Ready to Learn and Explore NBA Stats?",
    "Your NBA Stats Adventure Starts Here.",
    "Become an NBA Stats Expert with Us.",
    "Exploring the NBA, One Stat at a Time."
  ],
  "Puns_Stats": [
    "Dribble into Data Delights!",
    "Ready to Slam Dunk into Stats?",
    "Shoot for the Stars with NBA Stats!",
    "Score Big with NBA Numbers!",
    "Embark on your Baseline! Learning Experience",
    "Learn, 'Assist,' & Explore NBA Stats!",
    "Triple-Double Your Basketball IQ!"
  ],
  "Puns_Learning": [
    "Get Ready to Score 'Triple-Doubles' in Knowledge!",
    "Shoot for the Stars with 'Court-Side Insights!",
    "Unlock the Magic of 'Hoops by the Numbers!",
    "Dive into the World of 'Basketball's Statistic Wonders.",
    "Hello, Basketball Enthusiast! Let's 'Fast Break' into Wisdom!",
    "Learn the Game, 'Assist' Your Knowledge.",
    "Become a 'Basketball Maestro' with Every Swipe!",
    "Ready to 'Crossover' into the World of Basketball IQ?",
    "Get your 'Full-Court Press' on Insights!",
    "Get Ready to 'Drive' Your Basketball Learning Journey!",
    "Score Big with 'Fast Break' Facts and Learning!",
    "Embrace Your Inner 'Sixth Man' of Basketball Wisdom!",
    "Welcome to the 'Tip-Off' of Your Basketball Education!"
  ]
};
// might do something where I can use preferences, but for now it's random bewtween these 3;
const indices = {0: "Formal", 1: "Puns_Stats", 2: "Puns_Learning"};



const MainPage = () =>{ // main page will be split into thirds three views

  const router = useRouter();

  const genGreet = () =>{
    let randInt = Math.floor(Math.random() * 3);
    let randTemp = Math.floor(Math.random() * greetings[indices[randInt]].length);
    let greet = greetings[indices[randInt]][randTemp];
    return greet;
  }
  

  return(
  
    <View style={{flex: 1}}>
      <ImageBackground source={images.mainBackground} resizeMode="cover" style={{ flex: 1, width: '100%', height: "100%"}}>
        
        {/* shadow problem here */}
        <View style={{flex: 1, flexDirection: "row"}}>
          <View style={newStyle.textContainer_Center}>
            <Text style={newStyle.greetingText}>{genGreet()}</Text>
          </View>

          {/* Learning Tile */}
          <View style={{flex: 1,  justifyContent: "center"}}>

            <Pressable onPress={() => router.push("/learning-tile/allLearning")} style={({pressed}) =>[ // must use array of styles for conditional styling
              newStyle.learningTileContainer, 
              pressed && SHADOWS.large
            ]}>
              {({ pressed }) =>{
                return(
                  // an array of styles is used here
                  <Image source={(icons.learningTile)} style={[
                    newStyle.learningTileImg,
                    pressed && {opacity: .80}
                  ]}/>
                );
              }}
              
            </Pressable>
          </View>
          
        </View>


        {/* news feed will go here */}
        <View style={{flex: 0.7}}>

        </View>


        {/* houses the players and teams icons */}
        <View style={{flex: 1, flexDirection: "row"}} >

          <View style={{flex: 1,  justifyContent: "center", alignItems: "center"}}>
                  <Pressable onPress={() => router.push("/team-page/AllTeams")} style={({pressed}) =>[
                    newStyle.cardIconContainer,
                    pressed && SHADOWS.large
                  ]}>
                    {({ pressed }) =>{
                      return(
                        <Image source={(icons.teamsIcon)} style={[
                          newStyle.cardIcon,
                          pressed && {opacity: .70}
                        ]}/>
                      );
                    }}
                    

                  </Pressable>
          </View>

            <View style={{flex: 1,  justifyContent: "center", alignItems: "center"}}>
              <Pressable  onPress={() => router.push(`/player-page/AllPlayers`)} style={({pressed}) =>[
                newStyle.cardIconContainer,
                pressed && SHADOWS.large
              ]}>
                {({pressed}) =>{
                  return(
                    <Image source={(icons.playerCardIcon)} style={[
                      newStyle.cardIcon,
                      pressed && {opacity: 0.7}
                    ]}/>
                  );
                }}
              </Pressable>
            </View>
          
        </View>


      </ImageBackground>
    </View>
  )
};

// const MainPage = () => {
//   return ( 
//     // will be turned into <Teams/>
//     <SafeAreaView style={style.ListItems}>
//       <ScrollView>
//         <Text style={style.ListHeaders}>{"\t"}Teams</Text>
//         <FlatList
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           data={TeamData}
//           keyExtractor={(item, index) => item.name + index.toString()}
//           renderItem={({ item }) => <TeamCard item={item} />}
//         />
        
//         <Players/>

//         {/* will be turned into <Learn/> */}
//         <Text style={style.ListHeaders}>{"\t"}Learn</Text>
//         <FlatList
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           data={LearnData}
//           keyExtractor={(item, index) => item.name + index.toString()}
//           renderItem={({ item }) => <LearnCard item={item} />}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

export default MainPage;

const newStyle = StyleSheet.create({
  homeContainer: {
    flex: 1
  },
  childContainer: {
    flex: 1
  },

  greetingText: {
    color: "#FFFFFF", marginTop: 40, padding: 5, fontFamily: FONTS.medium, fontSize: 20, 
    textAlign: "center", textAlignVertical: "center"
  },
  textContainer_Center:{
    flex: 1, alignItems: "center", justifyContent: "center", textAlign: "center"
  },

  learningTileContainer: {
  marginLeft: 5, marginTop: 40, borderRadius: 10, width: 170, height: 170, 
  alignItems: "center", justifyContent: "center", 
  shadowColor: SHADOWS.medium.shadowColor,
  shadowOffset: SHADOWS.medium.shadowOffset,
  shadowRadius: SHADOWS.medium.shadowRadius,
  shadowOpacity: SHADOWS.medium.shadowOpacity},

  learningTileImg: {
    width: 170,
    height: 170,
    resizeMode: 'center',
    borderRadius: 10
  },

  cardIconContainer: {
    borderRadius: 10, width: 170, height: 230, alignItems: "center", 
    justifyContent: "center", marginBottom: 40
  },

  cardIcon: {
    width: 170,
    height: 230,
    resizeMode: 'center',
    borderRadius: 10
  },




})

const style = StyleSheet.create({
  ListHeaders: {
    fontWeight: "bold",
    marginTop: 15,
    color: COLORS.light,
  },
  ListItems: {
    backgroundColor: COLORS.darkSecond,
    borderLeftWidth: 5,
    borderColor: COLORS.darkSecond,
    flexDirection: "column",
    flexGrow: 1,
  },
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
  LogoLayout: {
    position: "absolute",
    marginTop: 5,
    marginHorizontal: 3,
    width: 85,
    height: 85,
    borderWidth: 0.1,
    borderRadius: 10,
    backgroundColor: "#121212",
  },
  PlayerNameLayout: {
    textAlign: "left",
    color: "#121212",
    fontSize: 10,
    position: "absolute",
    left: 3,
    fontWeight: "bold",
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
  PlayerTeamLayout: {
    textAlign: "left",
    color: "#121212",
    fontSize: 10,
    position: "absolute",
    top: 10,
    left: 3,
  },
  TeamConferenceLayout: {
    textAlign: "left",
    color: "#121212",
    fontSize: 10,
    position: "absolute",
    top: 5,
    left: 3,
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
  PlayerStatsLayout: {
    marginTop: 5,
    marginHorizontal: 3,
    position: "absolute",
    backgroundColor: COLORS.dark,
    right: 0,
    height: 115,
    width: 65,
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
