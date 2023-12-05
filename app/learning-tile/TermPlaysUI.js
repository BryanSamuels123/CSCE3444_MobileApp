import {useState} from "react";
import { SafeAreaView, Text, Image, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { COLORS, FONTS } from "../../constants";
import { StatusBar } from "expo-status-bar";
import { BackImg, SideMenu, MenuButton } from "../../components";
import { useRouter } from "expo-router";



const TermPlaysPage = () => {
    const router = useRouter();
    const terms = [
        {  id:1, term: "Airball", 
          termDef: "The ball misses the hoop and backboard entirely." 
        },
        {
          id: 2,
          term: "Alley-oop",
          termDef: "A high arc pass to a teammate in a position near the basket to leap and score."
        },
        {
          id: 3,
          term: "Assist",
          termDef: "A pass that sets up a score."
        },
        {
          id: 4,
          term: "Backboard",
          termDef: "The surface to which the basket is mounted."
        },
        {
          id: 5,
          term: "Back Court",
          termDef: "Area of the court farthest from the offensive team's goal."
        },
        {
          id: 6,
          term: "Back Door Cut",
          termDef: "A player approaches quickly from behind a defender toward the basket."
        },
        {
          id: 7,
          term: "Back Screen",
          termDef: "An offensive player moves away from the basket to set a screen for a teammate."
        },
        {
          id: 8,
          term: "Ball Fake",
          termDef: "To fake a pass or shot."
        },
        {
          id: 9,
          term: "Bang the Boards",
          termDef: "An aggressive rebound."
        },
        {
          id: 10,
          term: "Bank Shot",
          termDef: "The ball bounces off the backboard and into the basket."
        },
        {
          id: 11,
          term: "Baselines",
          termDef: "Also known as 'end lines', the boundary lines extending across both ends of the court behind the baskets."
        },
        {
          id: 12,
          term: "Double Dribble",
          termDef: "A violation that occurs when a player dribbles the ball, stops, and then starts dribbling again or dribbles with both hands simultaneously."
        },
        {
          id: 13,
          term: "Fast Break",
          termDef: "A quick offensive play in which a team moves the ball rapidly down the court to score before the opposing defense can set up."
        },
        {
          id: 14,
          term: "Foul Line",
          termDef: "The free-throw line, from which players shoot free throws after certain types of fouls."
        },
        {
          id: 15,
          term: "Free Throw",
          termDef: "An unopposed shot awarded after certain fouls, taken from the free-throw line."
        },
  ];

  const plays = [
        {
          id: 1,
          term: "Back Cut",
          termDef: "A back cut is any cut behind the defense towards the rim.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/1.jpg",
        },
        {
          id: 2,
          term: "Bulldog",
          termDef: "Bulldog is when a ball screen and cross screen are being set simultaneously.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/2.jpg",
        },
        {
          id: 3,
          term: "Bump",
          termDef: "Bump is when a cutter rejects a screen sending the screener on the cut instead (5 is bumped to the post by 2).",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/3.jpg",
        },
        {
          id: 4,
          term: "Carolina",
          termDef: "Carolina, from the Roy Williams secondary, is a back screen set from a guard on the trailing post player.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/carolina.jpg",
        },
        {
          id: 5,
          term: "Celtic",
          termDef: "Celtic is a UCLA screen directly into a side ball screen.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/celtic2.jpg",
        },
        {
          id: 6,
          term: "Chicago (Pin Down DHO)",
          termDef: "Chicago, for the Chicago Bulls, is a down screen followed by a dribble handoff",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/4.jpg",
        },
        {
          id: 7,
          term: "Drift (Stunt)",
          termDef: "The guard moves in towards the high post then drifts back out to the perimeter to get the ball.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/17.jpg",
        },
        {
          id: 8,
          term: "Duck-In",
          termDef: "A duck-in is when a post player looks to gain position in the low post by taking the defenders legs out with a low post up. This often works best when the post defender is in a help position and not ready for contact.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/18.jpg",
        },
        {
          id: 9,
          term: "Elevator (Gate/Fence/Gator) Screen",
          termDef: "In an elevator screen, the cutter moves through the screeners who close the screen once he has run through.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/19.jpg",
        },
        {
          id: 10,
          term: "Fade",
          termDef: "A fade is when a player turns down a screen and instead fades away from the action.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/fade.jpg",
        },
        {
          id: 11,
          term: "Flat Screen",
          termDef: "A flat ball screen is set on the perimeter with the screener’s back to the baseline.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/21.jpg",
        },
        {
          id: 12,
          term: "Hammer",
          termDef: "A hammer screen is when a player sets a back screen for another player to cut to the corner for a shot.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/action8-copy.jpg",
        },
        {
          id: 13,
          term: "Hawk",
          termDef: "Hawk, from the Atlanta Hawks, is a UCLA cut in transition for the trailing 4 man.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/action9-copy.jpg",
        },
        {
          id: 14,
          term: "Hi/Lo",
          termDef: "Hi/Lo is an action involving the high and low posts. Typically, the low post player makes a reverse seal for the hi/lo pass.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/action10-copy.jpg",
        },
        {
          id: 15,
          term: "Hook",
          termDef: "Hook is when a player curls a down screen and the screener turns around to set a ball screen.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/action11-copy.jpg",
        },
        {
          id: 16,
          term: "Iso",
          termDef: "Iso, or isolation, is when the ballhandler has a side of the floor to create a scoring opportunity.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/action14-copy.jpg",
        },
        {
          id: 17,
          term: "Jayhawk",
          termDef: "Jayhawk, named for Bill Self’s play call when Mario Chalmers hit the 3-point shot against Memphis in 2008, is a quick handoff or pitch pass in transition.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/jayhawk.jpg",
        },
        {
          id: 19,
          term: "Lob",
          termDef: "A lob is any pass thrown towards the rim for the player to catch in the air for a layup or dunk.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/lob.jpg",
        },
        {
          id: 20,
          term: "Pick & Roll",
          termDef: "1 dribbles towards the middle as 5 rolls to the rim.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/pickandroll.jpg",
        },
        {
          id: 21,
          term: "Pitch",
          termDef: "A pitch is when a dribble pivots and passes back to a player lifting up from the corner for a shot.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/pitch.jpg",
        },
        {
          id: 22,
          term: "Point",
          termDef: "Point refers to the initial action of the “point series” used in the Princeton offense. A down screen is set by the trailing 4 for the low post player who flashes to the opposite elbow.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/point.jpg",
        },
        {
          id: 23,
          term: "Runner",
          termDef: "Runners are often used to attack zone defenses or to create overloads. A runner is any player running the baseline to the opposite wing or corner.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/runner.jpg",
        },
        {
          id: 24,
          term: "Scissor",
          termDef: "Scissor involves two players running around the high post looking for a handoff.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/scissor.jpg",
        },
        {
          id: 26,
          term: "Wide Pin Down/Wave",
          termDef: "In a wide pin down, the cutter is usually in the corner with the down screen coming from the slot and setting the screen in the corner/short corner.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/widepin.jpg",
        },
  ];

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
        <View style={{flex: 1}}>
        <SideMenu toggleState={shown} updateState={closeMenu} followSlug={chasePage} isRoot={false}/>


        
        <ScrollView style={styles.container}>

            {/* menu button */}
            <View style={{height: 50, marginTop: 20}}>
                <MenuButton handlePress={openMenu}/>
            </View>

            <View style={styles.header}>
            <Text style={styles.headerText}>Welcome To The</Text>
            <Text style={styles.headerText}>Terms & Plays Page</Text>
            </View>

            <View style={styles.section}>
            <View style={{flex: 1, alignItems: "center", marginTop: 50}}>
                <Text style={styles.sectionHeader}>TERMS</Text>
            </View>
            

            {terms.map((item) => (
                <View style={styles.card2} key={item.id}>
                <Image source={{ uri: "https://guineeconakry.online/wp-content/uploads/2022/10/bask.jpeg" }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.termText}>{item.term}</Text>
                    <View style={styles.bottomContainer}>
                    <Text style={styles.definitionText}>{item.termDef}</Text>
                    </View>
                </View>
                </View>
            ))}
                </View>

            <View style={styles.section}>
            <View style={{flex: 1, alignItems: "center", marginTop: 10, marginBottom: 10}}>
                <Text style={styles.sectionHeader}>PLAYS</Text>
            </View>
            

            {plays.map((item) => (
                <View style={styles.card} key={item.id}>
                <View style={styles.textContainer2}>
                    <Text style={styles.playsText}>{item.term}</Text>
                </View>
                <View style={styles.topContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image2} />
                </View>
                <View style={styles.textContainer3}>
                    <Text style={styles.playsText2}>{item.termDef}</Text>
                </View>
                </View>
            ))}
            </View>
        </ScrollView>
        </View>
    </BackImg>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    // backgroundColor: '#fff', // Set your background color
  },
  header: {
    padding: 16,
    alignItems: 'center',
     // Set your header background color
  },
  headerText: {
    fontSize: 25,
    fontFamily: FONTS.medium,
    color: "white",

  },
  section: {
    margin: 16,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  card: {
    flexDirection: 'column',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: 'lightblue', // Set your card background color
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card2: {
    flexDirection: 'column',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: COLORS.gold, // Set your card background color
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 4,
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  termText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: "center"
  },
  bottomContainer: {
    marginTop: 10,
  },
  definitionText: {
    textAlign: 'center',
    fontSize: 16,
  },
  textContainer2: {
    flexDirection: 'column',
    flex: 1,
    textAlignVertical: 'center',
    marginVertical: 8,
    alignItems:"center",
  },
  textContainer3: {
    flexDirection: 'column',
    textAlignVertical: 'middle',
  },
  topContainer: {
    marginRight: 10,
    alignItems:"center",
  },
  image2: {
    width: '50%',
    height: 170,
    borderRadius: 4,
    marginBottom: 8,
    alignItems:"center",
  },
  playsText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: "center",
  },
  playsText2: {
    fontSize: 18,
    textAlignVertical: 'center',
  },
});

export default TermPlaysPage;