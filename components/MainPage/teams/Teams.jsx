import * as react from "react";
import {StyleSheet, Text, FlatList, ActivityIndicator, View} from "react-native";
import TeamCard from "../../common/cards/player/TeamCard";
import { useRouter } from "expo-router";
import fetchHook from "../../../hook/fetchHook";
import {COLORS, SIZES, FONTS, images, icons} from "../../../constants";
import { useEffect, useState } from "react";

const Teams = () =>{

    const [searchQuery, setSearchQuery] = useState("");


    const result = fetchHook("teamData", {playerName: "all"});
}