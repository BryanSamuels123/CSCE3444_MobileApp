import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';


const SideMenu = ({toggleState, updateState}) => {

    const [shown, setShown] = useState(toggleState);
    // console.log(shown);
    useEffect(() =>{
        setShown(toggleState)
    }, [toggleState])

    return (
        <Modal transparent visible={shown} animationType="fade">
            <View style={{flex: 1, flexDirection: "row"}} >
                <View style={{flex: 2, backgroundColor: "#FFFFFF"}}>
                    
                </View>



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
