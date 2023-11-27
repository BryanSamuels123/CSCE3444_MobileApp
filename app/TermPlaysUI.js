import * as React from "react";
import { SafeAreaView, Text, Image, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { COLORS } from "../constants";
import { StatusBar } from "expo-status-bar";
import { BackImg } from "../components";


  const TermPlaysPage = () => {

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
          id: 4,
          term: "Assist",
          termDef: "A pass that sets up a score."
        },
        {
          id: 5,
          term: "Backboard",
          termDef: "The surface to which the basket is mounted."
        },
        {
          id: 6,
          term: "Back Court",
          termDef: "Area of the court farthest from the offensive team's goal."
        },
        {
          id: 7,
          term: "Back Door Cut",
          termDef: "A player approaches quickly from behind a defender toward the basket."
        },
        {
          id: 8,
          term: "Back Screen",
          termDef: "An offensive player moves away from the basket to set a screen for a teammate."
        },
        {
          id: 9,
          term: "Ball Fake",
          termDef: "To fake a pass or shot."
        },
        {
          id: 10,
          term: "Bang the Boards",
          termDef: "An aggressive rebound."
        },
        {
          id: 11,
          term: "Bank Shot",
          termDef: "The ball bounces off the backboard and into the basket."
        },
        {
          id: 12,
          term: "Baselines",
          termDef: "Also known as 'end lines', the boundary lines extending across both ends of the court behind the baskets."
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
          termDef: "Chicago, for the Chicago Bulls, is a down.",
          imageUrl: "https://hoopschalktalk.files.wordpress.com/2016/03/4.jpg",
        },
  ];

  return (
    <BackImg>
      <SafeAreaView>
      <ScrollView>
      <View style={styles.AdditionalCard}>
        <Text style={styles.additionalCardText}> Welcome To The </Text>
        <Text style={styles.additionalCardText}> Terms & Plays Page </Text>
      </View>

      <View style={styles.AdditionalCard2}>
     <Text style={styles.additionalCardText2}> TERMS </Text>
      </View>

        <FlatList
          data={terms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.Card}>
              <Image source={{ uri: "https://guineeconakry.online/wp-content/uploads/2022/10/bask.jpeg" }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.termText}>{item.term}</Text>
                <View style={styles.bottomContainer}>
                  <Text style={styles.definitionText}>{item.termDef}</Text>
                </View>
              </View>
            </View>
          )}
        />
     
     <View style={styles.AdditionalCard2}>
     <Text style={styles.additionalCardText2}> PLAYS </Text>
      </View>

    <FlatList
      data={plays}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.Card2}>
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
      )}
      />
      </ScrollView>
      </SafeAreaView>
    </BackImg>
  );
};

export default TermPlaysPage;

const styles = StyleSheet.create({
  AdditionalCard: {
    flexDirection: 'column',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "transparent",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  additionalCardText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
  AdditionalCard2: {
    flexDirection: 'column',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "transparent",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  additionalCardText2: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  Card: {
    flexDirection: 'column',
    padding: 16,

    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: COLORS.orange,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 380,
    height: 150,
    borderRadius: 4,
    marginLeft: -6,

  },
  textContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  termText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomContainer: {
    marginTop: 10,
  },
  definitionText: {
    textAlign: 'center',
    fontSize: 16,
  },
 Card2: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'lightblue',
    borderRadius: 8,
    shadowColor: '#000',
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topContainer: {
    marginRight: 10,
  },
  image2: {
    width: 180,
    height: 170,
    borderRadius: 4,
    marginBottom: 8,
    alignItems:"center",
  },
  playsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  playsText2: {
    fontSize: 18,
    textAlignVertical: "center",
  },
  textContainer2: {
    flexDirection: 'column',
    flex: 1, 
    textAlignVertical: "center",
    marginVertical: 8,
  },
  textContainer3: {
    flexDirection: 'column',
    verticalAlign: 'middle'
  },
});