import React, { useEffect, useState } from 'react';
import { Modal, View, SafeAreaView,Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Button, ImageBackground} from 'react-native';
import {FONTS, images, COLORS} from "../../constants"
import {Link} from "expo-router";


const SideMenu = ({toggleState, updateState, followSlug, isRoot}) => {

    const [shown, setShown] = useState(toggleState);
    // console.log(shown);
    useEffect(() =>{
        setShown(toggleState)
    }, [toggleState])


    const prefix = (isRoot) ? "/" : "../";

    return (
        <Modal transparent visible={shown} animationType="fade">
            <View style={{flex: 1, flexDirection: "row"}} >
                {/* <ImageBackground source={images.menuBackground} style={{flex: 1}}> */}
                    <SafeAreaView style={{flex: 1, flexDirection: "column", alignItems: "center", backgroundColor: "#160D31"}}>

                        <TouchableOpacity style={{marginTop: 20}} onPress={()=> followSlug("/MainPage")} >
                            
                            <Text style={{color: COLORS.linkBlue, fontFamily: FONTS.italicRegular, fontSize: 20 , textAlign: "center"}}>
                                Home of Baseline! 
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{marginTop: 40}} onPress={()=> followSlug("/learning-tile/TermPlaysUI")} >
                            <Text style={{color: COLORS.linkBlue, fontFamily: FONTS.regular, fontSize: 20 , textAlign: "center"}}>
                                Learning Center
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{marginTop: 40}} onPress={()=> followSlug("/player-page/AllPlayers")} >
                            <Text style={{color: COLORS.linkBlue, fontFamily: FONTS.regular, fontSize: 20 , textAlign: "center"}}>
                                Players
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{marginTop: 40}} onPress={()=> followSlug("/team-page/AllTeams")} >
                            <Text style={{color: COLORS.linkBlue, fontFamily: FONTS.regular, fontSize: 20 , textAlign: "center"}}>
                                Teams
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{marginTop: 40}} onPress={()=> followSlug("/Compare")} >
                            <Text style={{color: COLORS.linkBlue, fontFamily: FONTS.regular, fontSize: 20 , textAlign: "center"}}>
                                Compare Players
                            </Text>
                        </TouchableOpacity>
                        
                        

                        <TouchableOpacity style={{marginTop: 40}} onPress={()=> {}} >
                            <Text style={{color: COLORS.linkBlue, fontFamily: FONTS.regular, fontSize: 20 , textAlign: "center"}}>
                                Need Help?
                            </Text>
                        </TouchableOpacity>

                    </SafeAreaView>
                {/* </ImageBackground> */}




                {/* to close it when you tap out, gonna add gesture handler for swipe left to close too, and a button to close menu */}
                <TouchableWithoutFeedback  style={{flex: 1}} onPress={() => updateState()} >
                    <View style={{flex: 1}}/>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
});

export default SideMenu;
