import { useEffect, useState, useRef, useCallback } from "react";
import { StyleSheet, Text, FlatList, ActivityIndicator, View, TextInput, TouchableOpacity, Modal, ImageBackground, TouchableWithoutFeedback, Image, Animated } from "react-native";
import PlayerCard from "../../common/cards/player/PlayerCard";
import { useRouter } from "expo-router";
import fetchHook from "../../../hook/fetchHook";
import { COLORS, SIZES, FONTS, SHADOWS, images, icons } from "../../../constants";
import  SortOption  from "../../common/SortOption";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Players = ({updateIndex, checkFav, isDiff, resetIsDiff}) => {

    const [searchQuery, setSearchQuery] = useState("");     // update value of input
    const [phText, setphText] = useState("Search");         //place holder text will be removed on focus 
    const [family, setFamily] = useState(FONTS.thin);       // font family will change onfocus and on blur
    const [color, setColor] = useState(COLORS.pastelPurpleLow);
    const [shown, setShown] = useState(false);
    const [newData, setNewData] = useState([]);
    // const [modalOverlay, setModalOverlay] = useState("#00000000");
    const [isSortSet, setIsSortSet] = useState(false);
    // const [isLiked, setIsLiked] = useState(0);
    const [favOn, setFavOn] = useState(true);

    const activeCard = useRef({});
    // useRef instead of useState so that values persist across renders
    

    const [iconStateObj, setIconStateObj] = useState({
        firstName: 0,   //1
        lastName: 0,    //2
        teamName: 0,    //3
        height: 0,      //4
        jerseyNumber: 0,
        ppg: 0,
        apg: 0,
        rpg: 0,
        bpm: 0,
        tpg: 0,
        fgp: 0,
        pos: 0          //5
    });

    const varsMap = {
        jerseyNumber: "jerseyNumber",
        ppg: "PTS",
        apg: "AST",
        rpg: "REB",
        bpm: "PLUS_MINUS",
        tpg: "TOV",
        fgp: "FG_PERCENT",
    }


    const viewabilityConfig = {viewAreaCoveragePercentThreshold: 80, minimumViewTime: 100}

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems && viewableItems.length > 0) {
            const liked  = (1 - viewableItems[0].item.isFavorite);
            
            // console.log(`value 1: ${liked}, value 2: ${activeCard.current}`);
            const currentCard = viewableItems[0].index;

            activeCard.current = currentCard;
            // get id of the currentCard and what type would be supplied to the api to set or reset fav 
            updateIndex({id: viewableItems[0].item.id, type: liked});

            // viewableItems[0].item.isFavorite = liked;
        }
    }, []);
    

    const listRef = useRef(null);
    
    // check if all values are set to zero; will be used to conditionally display the clear button
    let allZero = !(Object.values(iconStateObj).every(value => value === 0));

    useEffect(()=> {
        setIsSortSet(allZero);
    }, [allZero])

    useEffect(() => {
        // console.log(isDiff);
        if(isDiff){
            // console.log("this ran");
            scrollToIndex(activeCard.current);
            resetIsDiff();
        }
    }, [isDiff])


    useEffect(() =>{
        if (checkFav){
            if(newData.length > 0){
                newData[activeCard.current].isFavorite = 1 - newData[activeCard.current].isFavorite;
            }
            else if (filteredData.length > 0){
                filteredData[activeCard.current].isFavorite = 1 - filteredData[activeCard.current].isFavorite;
                // console.log(filteredData[activeCard.current]);
            }
            // if ((favOn) || ((newData.length > 2) && (filteredData.length > 2))){
            scrollToIndex(activeCard.current); 
            // }
            // else{
            //     scrollToTop();
            // }c
        }
    }, [checkFav])

    const router = useRouter();


    const result = fetchHook("playerData", { playerName: "all" });

    const handleToggle = (type) => {


        // player
        switch (type){

            case 0:
                setIconStateObj(((prevState) => ({
                    ...prevState,
                    firstName: (prevState.firstName === 2 ? 0 : prevState.firstName + 1)
                })));

                break;

            case 1:

                setIconStateObj(((prevState) => ({
                    ...prevState,
                    lastName: (prevState.lastName === 2 ? 0 : prevState.lastName + 1)
                })));


                break;
            
            case 2:

                setIconStateObj(((prevState) => ({
                    ...prevState,
                    teamName: (prevState.teamName === 2 ? 0 : prevState.teamName + 1)
                })));


                break;
            case 3:

                setIconStateObj(((prevState) => ({
                    ...prevState,
                    height: (prevState.height === 2 ? 0 : prevState.height + 1)
                })));


                break;
            case 4:

                setIconStateObj(((prevState) => ({
                    ...prevState,
                    jerseyNumber: (prevState.jerseyNumber === 2 ? 0 : prevState.jerseyNumber + 1)
                })));


                break;


            case 5:

                setIconStateObj(((prevState) => ({
                    ...prevState,
                    bpm: (prevState.bpm === 2 ? 0 : prevState.bpm + 1)
                })));

                break;
            case 6:

                setIconStateObj(((prevState) => ({
                    ...prevState,
                    ppg: (prevState.ppg === 2 ? 0 : prevState.ppg + 1)
                })));

                break;
            case 7:

                setIconStateObj(((prevState) => ({
                    ...prevState,
                    apg: (prevState.apg === 2 ? 0 : prevState.apg + 1)
                })));

                break;
            case 8:

                setIconStateObj(((prevState) => ({
                    ...prevState,
                    rpg: (prevState.rpg === 2 ? 0 : prevState.rpg + 1)
                })));


                break;
            
            
            case 9:

                setIconStateObj(((prevState) => ({
                    ...prevState,
                    tpg: (prevState.tpg === 2 ? 0 : prevState.tpg + 1)
                })));
                break;
            
            case 10:
                setIconStateObj(((prevState) => ({
                    ...prevState,
                    pos: (prevState.pos === 2 ? 0 : prevState.pos + 1)
                })));
                break;
            
            case 11:
                setIconStateObj(((prevState) => ({
                    ...prevState,
                    fgp: (prevState.fgp === 2 ? 0 : prevState.fgp + 1)
                })));
                break;

            default:
                break;

        }

        allZero = !(Object.values(iconStateObj).every(value => value === 0));

    }

    // const handleSortval = ({stateObj})

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


    const resetSort = () =>{

        setIconStateObj({
            firstName: 0,
            lastName: 0,
            teamName: 0,
            height: 0,
            jerseyNumber: 0,
            ppg: 0,
            apg: 0,
            rpg: 0,
            bpm: 0,
            tpg: 0,
            fgp: 0,
            pos: 0
        });

        setNewData([]);
        setIsSortSet(false);
        scrollToTop()
    }


    const sortNum = (stateVar, dataArray) => {
        if (iconStateObj[stateVar] === 1) {
          dataArray.sort((a, b) => b[varsMap[stateVar]] - a[varsMap[stateVar]]);
        } 
        else if (iconStateObj[stateVar] === 2) {
          dataArray.sort((a, b) => a[varsMap[stateVar]] - b[varsMap[stateVar]]);
        }
    };

    const handleSort = () => {
        if (Object.values(iconStateObj).every(value => value === 0)) {
            setNewData([]);
            return;
        }

        let sortedData = [...result.data];

        if (newData[0]){
            sortedData = newData;
        }

        // Team Name sorting
        if (iconStateObj.teamName !== 0) {
            sortedData.sort((a, b) => {
                
                let teamNameA = "";
                let teamNameB = "";

                if (a.teamName ===  "NA"){
                    teamNameA = (iconStateObj.teamName === 1) ? "ZZZZ ZZZZ" : "AAAA AAAA";
                }
                else{
                    teamNameA = a.teamName;
                }

                if (b.teamName ===  "NA"){
                    teamNameB = (iconStateObj.teamName === 2) ? "AAAA AAAA" : "ZZZZ ZZZZ"
                }
                else{
                    teamNameB = b.teamName;
                }
                
                // const teamNameA = (a.teamName === "NA" && iconStateObj.teamName === 1) ? "ZZZZ ZZZZ" : a.teamName;
                // const teamNameB = (b.teamName === "NA") ? "ZZZZ ZZZZ" : b.teamName;

                // if (a.teamName === "NA"){
                //     teamNameA = (iconStateObj.teamName === 1) ? "ZZZZ ZZZZ" : "AAAA AAAAA";
                // }
                // if (b.teamName === "NA"){
                //     teamNameB = (iconStateObj.teamName === 1) ? "ZZZZ ZZZZ" : "AAAA AAAAA";
                // }
                
                
                const mascotA = (teamNameA.split(" ").length > 2) ? teamNameA.split(" ")[2] : teamNameA.split(" ")[1];
                const mascotB = (teamNameB.split(" ").length > 2) ? teamNameB.split(" ")[2] : teamNameB.split(" ")[1];

                // console.log(a.teamName);
            
 
                const comparison = mascotA.localeCompare(mascotB);
                // console.log(mascotA, mascotB);
                return iconStateObj.teamName === 1 ? comparison : -comparison;
                
            });
        }


        const heightComparator = (a, b) => {
            const parseHeight = (height) => {
              const [feet, inches] = height.split('-').map(Number);
              return feet * 12 + inches;
            };

            if (iconStateObj.height === 1){
                return parseHeight(b.height) - parseHeight(a.height);
            }   
            else if (iconStateObj.height === 2){
                return parseHeight(a.height) - parseHeight(b.height);
            }
          };
        // height sorting
        if(iconStateObj.height !== 0){
            sortedData.sort(heightComparator);

            
        }

        //position sorting
        if (iconStateObj.pos === 1) {
            sortedData.sort((a, b) => {
                const newPosA = (a.position == "NA") ? "ZZZZ" : a.position;
                const newPosB = (b.position == "NA") ? "ZZZZ" : b.position;
                return newPosA.localeCompare(newPosB)});
        } 
        else if (iconStateObj.pos === 2) {
            sortedData.sort((a, b) => {
            const newPosA = (a.position == "NA") ? "AAAA" : a.position;
            const newPosB = (b.position == "NA") ? "AAAA" : b.position;
            return newPosB.localeCompare(newPosA)});
        } 


        // Player Name sorting
        if (iconStateObj.firstName === 1) {
            sortedData.sort((a, b) => a.playerName.split(" ")[0].replace(/[^a-zA-Z]/g, "").localeCompare(b.playerName.split(" ")[0].replace(/[^a-zA-Z]/g, "")));
        } else if (iconStateObj.firstName === 2) {
            sortedData.sort((a, b) => b.playerName.split(" ")[0].replace(/[^a-zA-Z]/g, "").localeCompare(a.playerName.split(" ")[0].replace(/[^a-zA-Z]/g, "")));
        }

        if (iconStateObj.lastName === 1) {
            sortedData.sort((a, b) => a.playerName.split(" ")[1].replace(/[^a-zA-Z]/g, "").localeCompare(b.playerName.split(" ")[1].replace(/[^a-zA-Z]/g, "")));
        } else if (iconStateObj.lastName === 2) {
            sortedData.sort((a, b) => b.playerName.split(" ")[1].replace(/[^a-zA-Z]/g, "").localeCompare(a.playerName.split(" ")[1].replace(/[^a-zA-Z]/g, "")));
        }



        // sorting by the rest of the number vals
        sortNum("jerseyNumber", sortedData);
        sortNum("apg", sortedData);
        sortNum("ppg", sortedData);
        sortNum("rpg", sortedData);
        sortNum("bpm", sortedData);
        sortNum("tpg", sortedData);
        sortNum("fgp", sortedData);


        /*         
        jerseyNumber: "jerseyNumber",
        ppg: "PTS",
        apg: "AST",
        rpg: "REB",
        bpm: "PLUS_MINUS",
        tpg: "TOV",
        fgp: "FG_PERCENT", */




        // if (iconStateObj.apg  === 1){
        //     sortedData.sort((a ,b) => (b.AST - a.AST));
        // }
        // else if(iconStateObj.apg === 2){
        //     sortedData.sort((a,b) => (a.AST - b.AST));
        // }

        // if (iconStateObj.apg  === 1){
        //     sortedData.sort((a ,b) => (b.AST - a.AST));
        // }
        // else if(iconStateObj.apg === 2){
        //     sortedData.sort((a,b) => (a.AST - b.AST));
        // }
        


        // // Update the data
        // setSortToggleTeam(sortOrderTeam === 2 ? 0 : sortOrderTeam + 1);
        // setSortTogglePlayer(sortOrderPlayer === 2 ? 0 : sortOrderPlayer + 1);

        // console.log(sortedData);

        // filteredData = sortedData;
        setNewData(sortedData);
        scrollToTop()
        // console.log(newData)
    };

    const filterFavs = () =>{
        if (favOn){
            if (newData[0]) {
                setNewData(newData.filter((player) => (player.isFavorite === 1)));
            }
            else {
                setNewData(result.data.filter((player) => (player.isFavorite === 1)));       
            }
        }
        else{
            setNewData([]);
            
        }
        setFavOn(!favOn);
        setShown(false);
        scrollToTop();
    }

    // for use in the flatlist animation
    const y = new Animated.Value(0);
    const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {useNativeDriver: true}); 

    const scrollToTop = () => {
        // listRef.current.scrollToIndex({ index: 0, animated: true });
        scrollToIndex(0);
    };

    const scrollToIndex = (id) =>{
        listRef.current.scrollToIndex({index: id, animated: true});
    }
    
    // console.log(filteredData[0]);

    return (
        <View style={{flex: 1}}>

            {/* sort modal */}
            <Modal visible={shown} transparent={true} animationType="slide">
                {/* Ask them if just having it slide all the way or doing it like this is better  */}
                <View style={{ flex: 1, backgroundColor: "#00000066", justifyContent: "flex-end" }} >
                    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => {
                        setShown(false)
                        handleSort()
                        // setModalOverlay("#00000000")
                    }}>
                        <View style={{ flex: 1 }} />
                    </TouchableWithoutFeedback>

                    <ImageBackground style={{ flex: 1.5, alignItems: "center" }} resizeMode="stretch" source={images.popUpBackground3} >

                        {/* title */}
                        <View style={{ flex: 0.4, width: "80%", justifyContent: "flex-start", flexDirection: "column"}} >
                            <Text style={{ paddingTop: 20, fontFamily: FONTS.regular, fontSize: 18, color: COLORS.backGround_purple }}>
                                Sort By:
                            </Text>
                        </View>

                        {/* sort teams button and players button */}
                        <View style={{ flex: 2, flexDirection: "column", justifyContent: "space-between", alignItems: "center", marginBottom: 5}}>
                            
                            {/*  */}
                            <SortOption label="First Name" handlePress={handleToggle} iconState={iconStateObj.firstName}/>
                            <SortOption label="Last Name" handlePress={handleToggle} iconState={iconStateObj.lastName}/>
                            <SortOption label="Team" handlePress={handleToggle} iconState={iconStateObj.teamName}/>
                            <SortOption label="Position" handlePress={handleToggle} iconState={iconStateObj.pos}/>
                            <SortOption label="Height" handlePress={handleToggle} iconState={iconStateObj.height}/>
                            <SortOption label="Jersey Number" handlePress={handleToggle} iconState={iconStateObj.jerseyNumber}/>
                            <SortOption label="Box Plus/Minus" handlePress={handleToggle} iconState={iconStateObj.bpm}/>
                            <SortOption label="Points Per Game" handlePress={handleToggle} iconState={iconStateObj.ppg}/>
                            <SortOption label="Assists Per Game" handlePress={handleToggle} iconState={iconStateObj.apg}/>
                            <SortOption label="Rebounds Per Game" handlePress={handleToggle} iconState={iconStateObj.rpg}/>
                            <SortOption label="Turnovers Per Game" handlePress={handleToggle} iconState={iconStateObj.tpg}/>
                            <SortOption label="Field Goal %" handlePress={handleToggle} iconState={iconStateObj.fgp}/>
                            <SortOption label="Favorite Players" handlePress={filterFavs}  iconState={0}/>

                        </View>

                        {/* close button */}


                        <View style={{ flex: 0.6, flexDirection: "column", justifyContent: "flex-end", alignItems: "center", marginBottom: 5}}>
                           
                            {isSortSet ? (
                                <TouchableOpacity onPress={() => {
                                    resetSort()
                                    // setModalOverlay("#0000000")
                                }} style={{ height: 30, width: "33%", justifyContent: "center", borderRadius: 10, alignItems: "center"}}>
                                    {/* <Image source={icons.cancel} style={{flex: 1, resizeMode: "contain", alignItems: "center", justifyContent: "center", opacity: 0.4}}/> */}
                                    <View style={{ height: 45, width: "100%", borderRadius: 10, justifyContent: "center", alignItems: "center", ...SHADOWS.small, marginBottom: 30 }}>
                                        <Text style={{ fontFamily: FONTS.regular, fontSize: 16, color: COLORS.lightGray, textAlign: "center" }}>Clear Filter</Text>
                                    </View>
                                </TouchableOpacity>
                                ) : null}

                            <TouchableOpacity onPress={() => {
                                setShown(false)
                                handleSort()
                                // setModalOverlay("#0000000")
                            }} style={{ height: 30, width: "33%", justifyContent: "center", borderRadius: 10, alignItems: "center", marginBottom: 20 }}>
                                {/* <Image source={icons.cancel} style={{flex: 1, resizeMode: "contain", alignItems: "center", justifyContent: "center", opacity: 0.4}}/> */}
                                <View style={{ height: 45, width: "100%", borderRadius: 10, justifyContent: "center", alignItems: "center", ...SHADOWS.small, marginBottom: 30 }}>
                                    <Text style={{ fontFamily: FONTS.regular, fontSize: 16, color: COLORS.lightGray, textAlign: "center" }}>Done</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>


            </Modal>

            {result.isLoading ? (
                <ActivityIndicator size="large" colors={COLORS.lightBlue} />
            ) :
                <View style={{ flex: .3, justifyContent: "center", flexDirection: "row-reverse" , paddingTop: 10}}>

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
                                    scrollToIndex(activeCard.current);
                                    // scrollToTop()
                                }
                            }}

                            // onSubmitEditing={() => handleSubmit()}

                            style={{ height: 45, backgroundColor: color, borderRadius: 10, paddingHorizontal: 5, fontFamily: family, ...SHADOWS.small, color: COLORS.dark, fontSize: 16 }}
                        />
                    </View>
                </View>
            }

            <View style={{ flex: 3.2, justifyContent: "center", alignItems: "center", marginTop: 10}}>
                {result.isLoading ? (
                    <ActivityIndicator size="large" colors={COLORS.lightBlue} />
                ) : result.error ? (
                    <Text style={styles.list}>Something Went Wrong</Text> // style text
                ) : (
                    //implementing deck of cards
                    
                    <AnimatedFlatList
                        onViewableItemsChanged={onViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        ref={listRef}
                        vertical
                        scrollEventThrottle={16}
                        snapToAlignment={"center"}
                        snapToInterval={550}
                        decelerationRate={"fast"}
                        removeClippedSubviews={true}    // don't render things that aren't shown
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
    },

    ListHeaders: {
        fontWeight: "bold",
        marginTop: 15,
        color: COLORS.light,
    },
    
    cardContainer: {
        backgroundColor: COLORS.orange,
        margin: 5,
        width: 140,
        height: 120,
    },
});