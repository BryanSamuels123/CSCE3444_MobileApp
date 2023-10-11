import * as React from "react";
import {SafeAreaView} from "react-native";
import { useRouter } from "expo-router";
import TeamUI from "./TeamUI";



const Home = () =>{
    const router = useRouter();


    return(
    
    <SafeAreaView style= {{ flex:1 }}>
        <TeamUI/>
    </SafeAreaView>
    );
}

export default Home;