import { 
    SafeAreaView, 
    Text,
    FlatList, 
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, icons } from '../constants';
import { Card } from "react-native-paper";
import * as React from 'react';
import { Link } from "expo-router";
//import NavBar from './NavBar'


//Data for testing
const Teams = 
[
    {
        title: "Los Angeles Lakers", 
        id: 1,
        wins: 3,
        losses: 4,
        streak: 3,
        last10: "3-4",
        conference: "East",
        logo: 
            "https://1000logos.net/wp-content/uploads/2017/03/los-angeles-lakers-logo.jpg",
        link: "/TestPage",
    },
    {
        title : "Golden State Warriors",
        id: 2,
        wins: 5,
        losses: 3,
        streak: 0,
        last10: "5-3",
        conference: "West",
        logo: 
            "https://teamcolorcodes.com/wp-content/uploads/2017/03/GSW-1-248x300.png",
        link: "/TestPage",
    },
    {   
        title: "League Of Legends",
        id: 3,
        wins: 5,
        losses: 3,
        streak: 0,
        last10: "5-3",
        conference: "East",
        logo: 
            "https://i.pinimg.com/originals/95/e2/be/95e2beeff28cf0ca9a65acc6616c0bd6.png",
        link: "/TestPage",
    },
    //{title: "Dallas Mavericks", id:4},
    //{title:"Miami Heat",id: 5},
   /* {title: "Milwaukee Bucks",id: 6},
    {title: "Chicago Bulls",id:7},
    {title: "Toronto Raptors",id: 8},
    {title: "Phoenix Suns",id: 9},
    {title: "New York Knicks", id: 10},
    {title: "San Antonio Spurs", id: 11},
    {title: "Philedalphia 76rs", id: 12},
    {title: "LA Clippers", id: 13},
    {title: "Denver Nuggets", id: 14},
    {title: "Minnesota Timberwolves", id: 15},
    {title: "Portland Trail Blazers", id: 16},
    {title: "Brooklyn Nets", id: 17},
    {title: "Houston Rockets", id: 18},
    {title: "Memphis Grizzlies", id: 19},
    {title: "Cleveland Cavaliers", id:20},
    {title: "Utah Jazz", id:21},
    {title: "Detroit Pistons", id: 22},
    {title: "Sacramento Kings", id: 23},
    {title: "Charlotte Hornets", id: 24},
    {title: "Oklahoma City Thunder", id: 25},
    {title: "Indiana Pacers", id: 26},
    {title: "Washington Wizards",id: 27},
    {title: "Atlanta Hawks", id: 28},
    {title: "Orlando Magic", id: 29},
    {title: "New Orleans Pelicans", id: 30},
*/

]

//create TeamCard that will be used throughout the flatlist
const TeamCard = ({ item }) => {
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
    
const TeamUI = () => {
    return(
        <SafeAreaView style={style.ListTeams}>
            <Text style={style.Headers}>Teams</Text>
            <FlatList
                data = {Teams}
                renderItem = {({item}) => <TeamCard  item = {item} />}
                keyExtractor = {item => item.id}
            />
        </SafeAreaView>

    );
};

export default TeamUI;
//Note: We need to figure out a different way of displaying statistics for teams
//Does not look very realistic with teams like Lakers (Or find a way for text borders)
const style = StyleSheet.create({
    Headers:{
        left: 150,
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 15,
        color: COLORS.light
    },
    ListTeams:{
        backgroundColor: COLORS.darkSecond,
        borderLeftWidth: 5,
        borderColor: COLORS.darkSecond,
        flexDirection: "column",
        flexGrow: 3,
    },
    CardContainer:{
        backgroundColor: COLORS.orange,
        margin: 5,
        height: 180,
        width: 370,
    },
    ImageBackground:{
        height: 100,
        width: 180,
        left: 90,
        backgroundColor: "transparent",
    },
    BlackBar:{
        position: "absolute",
        marginTop: 100, 
        height: 80,
        width: 370,
        backgroundColor: COLORS.dark,
    },
    leftData: {
        position: "absolute",
        textAlign: "left",
        top: 135,
        left: 10,
        color: COLORS.light,
        BorderStyle: "solid",
        //textDecorationColor: COLORS.dark,
        fontSize: 14,
    },
    RightData:{
        position: "absolute",
        textAlign: "left",
        top: 135,
        left: 250,
        color: COLORS.light,
        BorderStyle: "solid",
        //textDecorationColor: COLORS.dark,
        fontSize: 14,

    },
    TeamName:{
        position: "absolute",
        textAlign: "center",
        top: 105,
        left: 80,
        fontSize: 20,
        color: COLORS.light,
        font: FONTS.robLight,
        fontWeight: "bold",
    },
    Title: {
        fontSize: 32,
        textAlign: 'center',
    },

})

