import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { FONTS, COLORS, icons} from '../../constants'; // Import your style constants

const SortOption = ({ label, handlePress, iconState }) => {

    const labelTable = {
        "First Name": 0,
        "Last Name" : 1,
        "Team": 2,
        "Height": 3,
        "Jersey Number": 4,
        "Box Plus/Minus": 5,
        "Points Per Game": 6,
        "Assists Per Game": 7,
        "Rebounds Per Game": 8,
        "Turnovers Per Game": 9,
        "Position": 10,
        "Field Goal %": 11
    };

  const getIcon = (sortToggle) => {

    // let icon = 
    switch (sortToggle) {
        case 0:
            return null; // No arrow
        case 1:
            return (
                <View style={{}}>
                    <Image source={icons.upArrow} resizeMode="contain" style={{ width: 33, height: 25 }} />
                </View>
            ); // Arrow up
        case 2:
            return (
                <View style={{}}>
                    <Image source={icons.downArrow} resizeMode="contain" style={{ width: 33, height: 25 }} />
                </View>
            ); // Arrow down
        default:
            return null;
    }
}

  return (
        <View style={styles.sortAndIconContainer} >
            <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-start" }}>
                <TouchableOpacity onPress={() => {
                    if(label !== "Favorite Players"){
                        handlePress(labelTable[label])
                    }
                    else{
                        handlePress();
                    }   

                    }} style={{ flex: 1, borderRadius: 10, justifyContent: "flex-end" }}>
                    {/* <Image source={icons.cancel} style={{flex: 1, resizeMode: "contain", alignItems: "center", justifyContent: "center", opacity: 0.4}}/> */}
                    <View style={styles.sortOptions_containers}>
                        <Text style={{ fontFamily: FONTS.regular, fontSize: 18, color: COLORS.backGround_purple }}>{label}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                {getIcon(iconState)}
            </View>
        </View>
  );
};

export default SortOption;


styles = StyleSheet.create({
    sortAndIconContainer: { 
        flex: 1, 
        flexDirection: "row", 
        marginTop: 5
    },

    sortOptions_containers: { 
        flex: 1,
        width: "100%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }

});