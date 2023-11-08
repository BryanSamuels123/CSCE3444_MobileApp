import * as React from "react";
import { Link } from "expo-router";
import fetchHook from "../../../../hook/fetchHook";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import {Card, Text } from "react-native-paper";
import { SHADOWS, COLORS, FONTS, icons } from "../../../../constants";

const teamCard = ({item}, handleNaviagte) =>{

    console.log(item)
    const imagePath = (item.teamLogo) ? `../../../../assets/images/teamLogos${item.teamLogo}` : 
    "../../../../assets/images/teamLogos/defaultPlayer.jpeg"

    let image = "";

    if(item.teamLogo){
        image = require("../../../../assets/images/teamLogos/defaultPlayer.jpeg");

        return(

            <TouchableOpacity onPress={(handleNaviagte)}>
                <Card style={style.CardContainer}>
                        <Card.Cover
                            style={style.ImageBackground}
                            source={image}
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
        ); //return
    };//if(item.logo)

}; //TeamCard

export default teamCard;

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
