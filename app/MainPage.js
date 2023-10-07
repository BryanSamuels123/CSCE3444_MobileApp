import * as React from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet } from 'react-native';
import PlayerCard from '../components/PlayerCard';
import { COLORS} from '../constants';

const PlayerData = [
    {
        name: "Lebron James",
        number: "6",
        points: "28.9",
        min: "35.5",
        gp: "55",
        position: "SF",
        team: "LA Lakers",
    },
    {
        name: "Lebron James 2",
        number: "6",
        points: "28.9",
        min: "35.5",
        gp: "55",
        position: "SF",
        team: "LA Lakers",
    },
    {
        name: "Lebron James 3",
        number: "6",
        points: "28.9",
        min: "35.5",
        gp: "55",
        position: "SF",
        team: "LA Lakers",
    },
    {
        name: "Lebron James 4",
        number: "6",
        points: "28.9",
        min: "35.5",
        gp: "55",
        position: "SF",
        team: "LA Lakers",
    },
];

const MainPage = () => {
    return(
        <SafeAreaView style={style.ListItems}>
            <Text style={style.ListHeaders} >
                {'\t'}Teams
            </Text>
            <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator ={false}
            data={PlayerData}
            keyExtractor={(item, index) => item.name + index.toString()}
            renderItem={({}) => <PlayerCard/>}         
            />

            <Text style={style.ListHeaders} >
                {'\t'}Players
            </Text>
            <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator ={false}
            data={PlayerData}
            keyExtractor={(item, index) => item.name + index.toString()}
            renderItem={({}) => <PlayerCard/>}         
            />
            
            <Text style={style.ListHeaders} >
                {'\t'}Learn
            </Text>
            <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator ={false}
            data={PlayerData}
            keyExtractor={(item, index) => item.name + index.toString()}
            renderItem={({}) => <PlayerCard/>}         
            />

        </SafeAreaView>
    )
}
export default MainPage

const style = StyleSheet.create({
    ListHeaders: {
        fontWeight: 'bold',
        marginTop: 15,
    },
    ListItems: {
        backgroundColor: COLORS.light, 
        borderLeftWidth: 5, 
        borderColor: COLORS.light,
    }
})