// will clean up components, and put into own files in last sprint

import {useState} from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  SafeAreaView
} from "react-native";
import { COLORS, FONTS, icons, images, SHADOWS } from "../constants";
import { BackImg } from "../components";
import { useRouter } from "expo-router";
import NewsWidget from "./NewsWidget";
import {SideMenu, MenuButton} from "../components";


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
const indices = { 0: "Formal", 1: "Puns_Stats", 2: "Puns_Learning" };



const MainPage = () => { // main page will be split into thirds three views

  const router = useRouter();

  const genGreet = () => {
    let randInt = Math.floor(Math.random() * 3);
    let randTemp = Math.floor(Math.random() * greetings[indices[randInt]].length);
    let greet = greetings[indices[randInt]][randTemp];
    return greet;
  }

  const [shown, setShown] = useState(false);

    const openMenu = () =>{
        setShown(true);
    }
    
    const closeMenu = () =>{
        setShown(false);
    }

    const chasePage = (route) =>{
        // console.log(route);
        setShown(false);
        router.push(route);
    }


  return (

    <BackImg>



      {/* <View backgroundColor={"blue"} style={{flex: .01}}>

      </View> */}

      <View style={{flex: 1}} >

        {/* shadow problem here */}
        <View style={{flex: 1, flexDirection: "column"}}>

        <SideMenu toggleState={shown} updateState={closeMenu} followSlug={chasePage} isRoot={false}/>

        {/* menu button */}
        <View style={{flex: .3, marginTop: 20}}>
            <MenuButton handlePress={openMenu}/>
        </View> 


          <View style={{ flex: 1, flexDirection: "row"}}>
            <View style={newStyle.textContainer_Center}>
              <Text style={newStyle.greetingText}>{genGreet()}</Text>
            </View>

            {/* Learning Tile */}
            <View style={{ flex: 1, justifyContent: "center" }}>

              <Pressable onPress={() => router.push("/learning-tile/TermPlaysUI")} style={({ pressed }) => [ // must use array of styles for conditional styling
                newStyle.learningTileContainer,
                pressed && SHADOWS.large
              ]}>
                {({ pressed }) => {
                  return (
                    // an array of styles is used here
                    <Image source={(icons.learningTile_F)} style={[
                      newStyle.learningTileImg,
                      pressed && { opacity: .80 }
                    ]} />
                  );
                }}

              </Pressable>
              <View style={{alignItems: "center"}}>
                <Text style={{fontFamily: FONTS.regular, color: COLORS.white, fontSize: 14, paddingRight: 10, paddingTop:10}}>Learning Tile</Text>
              </View>
              
            </View>

          </View>
        </View>       

        {/* news feed will go here */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <NewsWidget />
        </View>


        {/* houses the players and teams icons */}
        <View style={{ flex: 1, flexDirection: "row" }} >

          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Pressable onPress={() => router.push("/team-page/AllTeams")} style={({ pressed }) => [
              newStyle.cardIconContainer,
              pressed && SHADOWS.large
            ]}>
              {({ pressed }) => {
                return (
                  <Image source={(icons.teamsIcon)} style={[
                    newStyle.cardIcon,
                    pressed && { opacity: .70 }
                  ]} />
                );
              }}
            </Pressable>

            <Text style={{marginBottom: 10, fontFamily: FONTS.light, color: COLORS.white, fontSize: 14}}>Teams</Text>
          </View>

          <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Pressable onPress={() => router.push(`/player-page/AllPlayers`)} style={({ pressed }) => [
              newStyle.cardIconContainer,
              pressed && SHADOWS.large
            ]}>
              {({ pressed }) => {
                return (
                  <Image source={(icons.playerCardIcon)} style={[
                    newStyle.cardIcon,
                    pressed && { opacity: 0.7 }
                  ]} />
                );
              }}
            </Pressable>
            <Text style={{marginBottom: 10, fontFamily: FONTS.light, color: COLORS.white, fontSize: 14}}>Players</Text>
          </View>

        </View>
      </View>
    </BackImg>
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
    color: "#FFFFFF", padding: 5, fontFamily: FONTS.medium, fontSize: 20,
    textAlign: "center", textAlignVertical: "center"
  },
  textContainer_Center: {
    flex: 1, alignItems: "center", justifyContent: "center", textAlign: "center", paddingTop: 0
  },

  learningTileContainer: {
    marginLeft: 5, paddingTop: 0, borderRadius: 10, width: 170, height: 170,
    alignItems: "center", justifyContent: "center",
    shadowColor: SHADOWS.medium.shadowColor,
    shadowOffset: SHADOWS.medium.shadowOffset,
    shadowRadius: SHADOWS.medium.shadowRadius,
    shadowOpacity: SHADOWS.medium.shadowOpacity
  },

  learningTileImg: {
    width: 170,
    height: 170,
    resizeMode: 'center',
    borderRadius: 10
  },

  cardIconContainer: {
    borderRadius: 10, width: 170, height: 230, alignItems: "center",
    justifyContent: "center", marginBottom: 0
  },

  cardIcon: {
    width: 170,
    height: 230,
    resizeMode: 'center',
    borderRadius: 10
  },




})

const style = StyleSheet.create({
  ListItems: {
    backgroundColor: COLORS.darkSecond,
    borderLeftWidth: 5,
    borderColor: COLORS.darkSecond,
    flexDirection: "column",
    flexGrow: 1,
  },
});
