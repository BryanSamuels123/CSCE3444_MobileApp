import * as React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import { COLORS, FONTS } from "../constants";
import { Link } from "expo-router";

const LearnData =[
    {
        title: "Introduction to game",
        id: 1,
        lower: "Tap for an introduction to the sport",
        link: "/TestPage",
    },
    {
        title: "Airball",
        id: 2,
        info: "A shot attempt that was off the mark and \ndidn't touch the basket or the backboard",
        lower: "Tap for more details",
        link: "/TestPage",
    }
]

const LearnCard =({ item }) => {
    return (
        <Link href = {item.link} asChild>
            <TouchableOpacity>
                <Card style = {style.Container}>
                    <Card.Cover
                        style={style.BgImage}
                        source = {{ uri: "https://t3.ftcdn.net/jpg/05/32/69/64/360_F_532696455_KAce2D5R3bxfo5qdKFeKhOqgWhO2fKmz.jpg"}}
                    />
                </Card>
            </TouchableOpacity>
        </Link>
        
    );
};

const LearnPage = () => {
    return (
        <SafeAreaView style={style.ListLearn}>
            <FlatList
                data = {LearnData}
                renderItem = {({ item }) => <LearnCard item = { item } />}
                keyExtractor = { item => item.id }
            />

        </SafeAreaView>
    );
};

export default LearnPage;

const style = StyleSheet.create({
    ListLearn:{
        backgroundColor: COLORS.darkSecond,
        borderLeftWidth: 5,
        borderColor: COLORS.darkSecond,
        flexDirection: "column",
        flexGrow: 2,
    },
    Container: {
        backgroundColor: COLORS.light,
        margin: 7.5,
        height: 160,
        width: 370,
    },
    BgImage:{
        height: 160,
        width: 370,
        opacity: 0.5,
    }
})