import { 
    SafeAreaView, 
    View,
    Text,
    ScrollView,
    FlatList, 
    StyleSheet,
    StatusBar,
} from 'react-native';
import { Stack } from 'expo-router';
import { COLORS, images } from '../constants';
import * as React from 'react';
//import NavBar from './NavBar'

const Teams = 
[
    {title: "Los Angeles Lakers", id: 1},
    {title : "Golden State Warriors", id: 2},
    {title: "Boston Celtics", id: 3},
    {title: "Dallas Mavericks", id:4},
    {title:"Miami Heat",id: 5},
    {title: "Milwaukee Bucks",id: 6},
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


]

const Item = ({title}) => (
    <View style = {styles.item}>
        <Text style = {styles.title}>{title}</Text>
    </View>
)
const TeamUI = () => {
    return(
        <SafeAreaView>
           <FlatList
                data = {Teams}
                renderItem = {({item}) => <Item title={item.title}/>}
                keyExtractor = {item => item.id}
            />
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTope: StatusBar.currentHeight || 0,
        alignItems: 'center',
        width: 20,
    },
    item: {
        backgroundColor : COLORS.blue,
        padding: 10,
        marginVertical: 12,
        marginHorizontal: 3,
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
    },

})

export default TeamUI;
