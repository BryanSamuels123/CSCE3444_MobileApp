import { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, ActivityIndicator, View, TextInput, TouchableOpacity, Modal, ImageBackground, TouchableWithoutFeedback, Image, Animated } from "react-native";
import PlayerCard from "../../common/cards/player/PlayerCard";
import { useRouter } from "expo-router";
import fetchHook from "../../../hook/fetchHook";
import { COLORS, SIZES, FONTS, SHADOWS, images, icons } from "../../../constants";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Players = () => {

    const [searchQuery, setSearchQuery] = useState("");     // update value of input
    const [phText, setphText] = useState("Search");         //place holder text will be removed on focus 
    const [family, setFamily] = useState(FONTS.thin);       // font family will change onfocus and on blur
    const [color, setColor] = useState(COLORS.pastelPurpleLow);
    const [shown, setShown] = useState(false);
    const [newData, setNewData] = useState([]);
    const [modalOverlay, setModalOverlay] = useState("#00000000");
    const [sortToggleTeam, setSortToggleTeam] = useState(0);
    const [sortTogglePlayer, setSortTogglePlayer] = useState(0);
    const [arrowIcon, setArrowIcon] = useState(null);
    const router = useRouter();


    const result = fetchHook("playerData", { playerName: "all" });

    const handleToggle = (type) => {

        // player
        if (type === 0) {
            setSortTogglePlayer((prevState) => (prevState === 2 ? 0 : prevState + 1));
        }
        //team
        else {
            setSortToggleTeam((prevState) => (prevState === 2 ? 0 : prevState + 1));
        }

    }


    let filteredData = [];

    if (newData[0]) {
        filteredData = (searchQuery) ?
            newData.filter((player) =>
                player.playerName.toLowerCase().includes(searchQuery.toLowerCase()))
            : newData.data;
    }
    else {
        filteredData = (searchQuery) ?
            result.data.filter((player) =>
                player.playerName.toLowerCase().includes(searchQuery.toLowerCase()))
            : result.data;
    }




    const handleSearchQuery = (query) => {
        setSearchQuery(query);
    }



    // will handle sort arrow
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
                    <View style={styles.arrowContainer}>
                        <Image source={icons.downArrow} resizeMode="contain" style={{ width: 33, height: 25 }} />
                    </View>
                ); // Arrow down
            default:
                return null;
        }
    }

    const handleSort = () => {
        if (sortTogglePlayer === 0 && sortToggleTeam === 0) {
            setNewData([]);
            return;
        }

        const sortedData = [...result.data];

        // Team Name sorting
        if (sortToggleTeam === 1) {
            sortedData.sort((a, b) => a.teamName.localeCompare(b.teamName));
        } else if (sortToggleTeam === 2) {
            sortedData.sort((a, b) => b.teamName.localeCompare(a.teamName));
        }

        // Player Name sorting
        if (sortTogglePlayer === 1) {
            sortedData.sort((a, b) => a.playerName.localeCompare(b.playerName));
        } else if (sortTogglePlayer === 2) {
            sortedData.sort((a, b) => b.playerName.localeCompare(a.playerName));
        }

        // // Update the data
        // setSortToggleTeam(sortOrderTeam === 2 ? 0 : sortOrderTeam + 1);
        // setSortTogglePlayer(sortOrderPlayer === 2 ? 0 : sortOrderPlayer + 1);

        // console.log(sortedData);

        // filteredData = sortedData;
        setNewData(sortedData);
        // console.log(newData)
    };


    // for use in the flatlist animation
    const y = new Animated.Value(0);
    const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {useNativeDriver: true}); 

    return (
        <View style={{ flex: 1 }}>

            <Modal visible={shown} transparent={true} animationType="slide">
                {/* Ask them if just having it slide all the way or doing it like this is better  */}
                <View style={{ flex: 1, backgroundColor: "#00000066", justifyContent: "flex-end" }} onLayout={() => setModalOverlay("#00000066")}>
                    <TouchableWithoutFeedback style={{ flex: 0.6 }} onPress={() => {
                        setShown(false)
                        handleSort()
                        // setModalOverlay("#00000000")
                    }}>
                        <View style={{ flex: 1 }} />
                    </TouchableWithoutFeedback>

                    <ImageBackground style={{ flex: 0.4, alignItems: "center" }} resizeMode="stretch" source={images.popUpBackground3} >

                        {/* title */}
                        <View style={{ flex: 0.6, width: "80%", justifyContent: "flex-start", flexDirection: "row" }} >
                            <Text style={{ paddingTop: 20, fontFamily: FONTS.regular, fontSize: 18, color: COLORS.backGround_purple }}>
                                Sort By:
                            </Text>
                        </View>








                        {/* teams button and players button */}
                        <View style={{ flex: 2, flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 10 }}>


                            <View style={{ flex: 1, flexDirection: "row" }} >
                                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-start" }}>
                                    <TouchableOpacity onPress={() => {
                                        // setShown(false)
                                        handleToggle(1);
                                        // setModalOverlay("#0000000")
                                    }} style={{ flex: 1, borderRadius: 10, justifyContent: "flex-end" }}>
                                        {/* <Image source={icons.cancel} style={{flex: 1, resizeMode: "contain", alignItems: "center", justifyContent: "center", opacity: 0.4}}/> */}
                                        <View style={{ height: 45, width: "100%", borderRadius: 10, justifyContent: "center", alignItems: "center", ...SHADOWS.small, marginBottom: 28 }}>
                                            <Text style={{ fontFamily: FONTS.regular, fontSize: 18, color: COLORS.lightGray }}>Team Name</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "flex-start" }}>
                                    {getIcon(sortToggleTeam)}
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: "row" }} >
                                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-start" }}>
                                    <TouchableOpacity onPress={() => {
                                        // setShown(false)
                                        handleToggle(0);
                                        // setModalOverlay("#0000000")
                                    }} style={{ flex: 1, borderRadius: 10, justifyContent: "flex-end" }}>
                                        {/* <Image source={icons.cancel} style={{flex: 1, resizeMode: "contain", alignItems: "center", justifyContent: "center", opacity: 0.4}}/> */}
                                        <View style={{ height: 45, width: "100%", borderRadius: 10, justifyContent: "center", alignItems: "center", ...SHADOWS.small, marginBottom: 28 }}>
                                            <Text style={{ fontFamily: FONTS.regular, fontSize: 18, color: COLORS.lightGray }}>Player Name</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "flex-start" }}>
                                    {getIcon(sortTogglePlayer)}
                                </View>
                            </View>

                        </View>


                        {/* close button */}
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>

                            <TouchableOpacity onPress={() => {
                                setShown(false)
                                handleSort()
                                // setModalOverlay("#0000000")
                            }} style={{ height: 30, width: "33%", justifyContent: "center", borderRadius: 10, alignItems: "center", marginBottom: 20 }}>
                                {/* <Image source={icons.cancel} style={{flex: 1, resizeMode: "contain", alignItems: "center", justifyContent: "center", opacity: 0.4}}/> */}
                                <View style={{ height: 45, width: "100%", borderRadius: 10, justifyContent: "center", alignItems: "center", ...SHADOWS.small, marginBottom: 30 }}>
                                    <Text style={{ fontFamily: FONTS.regular, fontSize: 16, color: COLORS.lightGray }}>Done</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>


            </Modal>

            {result.isLoading ? (
                <ActivityIndicator size="large" colors={COLORS.lightBlue} />
            ) :
                <View style={{ flex: .6, justifyContent: "center", flexDirection: "row-reverse" }}>

                    {/* sort button */}
                    <View style={{ flex: 2.2, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end", paddingRight: 10 }}>
                        {/* maybe does the same thing with less code */}
                        <TouchableOpacity onPress={() => {
                            setShown(true)
                            // setModalOverlay("#0000066")
                        }} style={{ height: 45, width: "100%", justifyContent: "center", borderRadius: 10 }}>
                            <View backgroundColor={COLORS.pastelPurpleLow} style={{ height: 45, borderRadius: 10, justifyContent: "center", alignItems: "center", ...SHADOWS.small }}>
                                <Text style={{ fontFamily: FONTS.regular, fontSize: 14 }}>Sort</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* search bar */}
                    <View style={{ flex: 7.8, marginHorizontal: 10, justifyContent: "flex-end", flexDirection: "column" }}>
                        <TextInput
                            placeholder={phText}
                            clearButtonMode="always"
                            autoCapitalize="words"
                            autoCorrect={false}
                            value={searchQuery}
                            lineBreakStrategyIOS={"standard"}
                            enablesReturnKeyAutomatically={true}
                            returnKeyType="done"
                            onChangeText={(query) => handleSearchQuery(query)}
                            placeholderTextColor={COLORS.dark}
                            onFocus={() => {
                                setphText("")
                                setFamily(FONTS.regular)
                                setColor(COLORS.pastelPurpleHigh)
                            }}
                            onBlur={() => {
                                if (searchQuery === "") {
                                    setphText("Search")
                                    setFamily(FONTS.thin)
                                    setColor(COLORS.pastelPurpleLow)
                                }
                            }}

                            // onSubmitEditing={() => handleSubmit()}

                            style={{ height: 45, backgroundColor: color, borderRadius: 10, paddingHorizontal: 5, fontFamily: family, ...SHADOWS.small, color: COLORS.dark, fontSize: 16 }}
                        />
                    </View>
                </View>
            }

            <View style={{ flex: 3.2, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                {result.isLoading ? (
                    <ActivityIndicator size="large" colors={COLORS.lightBlue} />
                ) : result.error ? (
                    <Text style={styles.list}>Something Went Wrong</Text> // style text
                ) : (
                    //implementing deck of cards
                    
                    <AnimatedFlatList
                        vertical
                        scrollEventThrottle={16}
                        snapToAlignment={"center"}
                        snapToInterval={550}
                        decelerationRate={"fast"}
                        removeClippedSubviews={true}
                        bounces={false} // stops the cards from bouncing when scrolled to top or bottom
                        showsVerticalScrollIndicator={false}
                        data={((newData.length > 0) && (searchQuery == "")) ? newData : filteredData}
                        keyExtractor={(item) => item.id} // can remove question mark to test errors; ? skips items without id's but all should have id's
                                                                // the decompression allows to pass the y component like this.
                        renderItem={({ index, item }) => (<PlayerCard {...{y, index}} item={item} handleNavigate={() => router.push(`player-page${item.id}`)} />)}
                        initialNumToRender={10}
                        {...{onScroll}}
                    // extraData={name}
                    />
                )
                }
            </View>

        </View>

    )

}
export default Players;


const styles = StyleSheet.create({

    arrowContainer: {

    },

    ListHeaders: {
        fontWeight: "bold",
        marginTop: 15,
        color: COLORS.light,
    }
    ,
    cardContainer: {
        backgroundColor: COLORS.orange,
        margin: 5,
        width: 140,
        height: 120,
    },
});