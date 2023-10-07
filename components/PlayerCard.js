import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { COLORS } from '../constants';

/* From the React Native Paper Lib 

The Text containers are what need to be changed to dynamicly pull from database.
If need be this can just be put into MainPage.js.
*/

const PlayerCard = () => ( 
  <Card style={style.cardContainer}> 
    <Card.Cover 
    style={style.imageLayout} 
    source={{ uri: 'https://picsum.photos/700' }} 
    />
    <Card.Cover 
    style={style.statsLayout} 
    />
    <Card.Content>
      <Text style={style.nameLayout}>Lebron James</Text> 
      <Text style={style.teamLayout}>LA Lakers</Text> 
      <Text style={style.statsTitle}>
        Stats
      </Text>
      <Text style={style.statsList}> 
        Pts {"\n"}
        Min {"\n"}
        GP {"\n"}
        POS {"\n"}
      </Text>
    </Card.Content>
  </Card>
  
);

export default PlayerCard;


const style = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.orange,
        margin: 5,
        width: 140,
        height: 120,
    },
    imageLayout: {
        marginTop: 5,
        marginHorizontal: 3,
        width: 80,
        height: 80,
        borderWidth: .1,
        borderRadius: 10,
        borderColor: '#121212',
        backgroundColor: '#121212',
        
    },
    nameLayout: {
        textAlign: 'left',
        color:'#121212',
        fontSize: 10,
        position: 'absolute',
        paddingLeft: 3,
    },
    teamLayout: {
        textAlign: 'left',
        color:'#121212',
        fontSize: 10,
        position: 'absolute',
        top: 10,
        paddingLeft: 3,

    },
    statsLayout: {
        marginTop: 5,
        marginHorizontal: 3,
        position: 'absolute',
        backgroundColor: COLORS.dark,
        right: 0,
        height: 110,
        width: 50,
    },
    statsList: {
        textAlign: 'left',
        color: COLORS.light,
        fontSize: 10,
        position: 'absolute',
        right: 10,
        top: -60,
        width: 40,
    },
    statsTitle: {
        textAlign: 'center',
        color: COLORS.light,
        fontSize: 10,
        position: 'absolute',
        right: 10,
        top: -80,
        width: 40,
    }
})