import { useState, useRef, useEffect } from "react";
import { View, Image, ActivityIndicator, Pressable,  } from "react-native";
import { SHADOWS, COLORS, icons } from "../../constants";
import fetchHook from "../../hook/fetchHook";
import { Players, BackImg, MenuButton, SideMenu } from "../../components";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useRouter } from "expo-router";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

const PlayersPage = () => {
    const router = useRouter();

    const [shown, setShown] = useState(false);
    const [checkFav, setCheckFav] = useState(false);
    const [liked, setLiked] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isDiff, setIsDiff] = useState(false);
    const activeCard = useRef({id: -1, type: 1});

    // come back to this
    const updateIndex = (nextActiveCard) =>{
        // console.log(`Curr: ${nextActiveCard.type}\nLiked: ${activeCard.current.type}`);
        if (nextActiveCard.type !== activeCard.current.type){ // handle transition
            // console.log("true");
            setIsDiff(true);
        }
        activeCard.current = nextActiveCard;
        setLiked(activeCard.current.type);
        // console.log(activeCard.current); 
        
        // setIsDiff(false);
    }


    const resetIsDiff = () =>{
        setIsDiff(false);
    }


    const openMenu = () =>{
        setShown(true);
    }
    
    const closeMenu = () =>{
        setShown(false);
    }

    const chasePage = (route) =>{
        // console.log(route);
        setShown(false);
        router.push(route);
        
    }

    const setFav = () =>{
        setIsLoading(true);
        console.log("called");
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activeCard.current)
            
        }

        console.log("working", params.body);
        fetch(`http://18.118.102.93:8000/setFav`, params)
        .then(response => response.json())
        .then(data => {
            setIsLoading(false);
            activeCard.current.type = 1 - liked;
            setLiked((liked) => 1 - liked);
            
            setCheckFav(true);
            setIsDiff(true);
            // Use the state updater function to ensure the latest state
            // setIsLiked(prevIsLiked => 1 - prevIsLiked);
            // no need to use setLiked here, as it's based on isLiked

            // Handle the data from the API response
            console.log(data, liked); // This might still log the previous value
        })
        .catch(error => {
            // Handle errors
            console.error('API call error:', error);
        })
        .finally(() => setCheckFav(false));
    }
    
    return (
        // Page Wrapper
        <BackImg>
            
            <SideMenu toggleState={shown} updateState={closeMenu} followSlug={chasePage} isRoot={false}/>

            {/* menu button */}
            <View style={{flex: .3, marginTop: 20}}>
                <MenuButton handlePress={openMenu}/>
            </View>

            {/* Search bar*/}
            {/* Card Stack UI */}
            <View style={{ flex: 3.8 }}>
                <Players updateIndex={updateIndex} checkFav={checkFav} isDiff={isDiff} resetIsDiff={resetIsDiff}/>
            </View>



            {/* Fav and compare icon */}
            <View style={{ flex: .7, flexDirection: "row" }}>


                {/* Compare Icon */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    <Pressable onPress={() => router.push(`/Compare`)} style={({ pressed }) => [{ paddingRight: 15, width: 80, height: 80, alignItems: "center", borderRadius: 10 },
                    pressed && SHADOWS.large
                    ]}>
                        {({ pressed }) => {
                            return (
                                <Image source={(icons.statsCompIcon)} style={[{ width: 80, height: 80, resizeMode: "center", borderRadius: 10 },
                                pressed && { opacity: 0.60 }
                                ]} />
                            );
                        }}
                    </Pressable>
                </View>

                {/* favorite icon */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    {isLoading ? (
                        // Render the loading wheel when isLoading is true
                        <ActivityIndicator size="large" color={COLORS.lightGray} />
                    ) : (
                        // Render the icon when isLoading is false
                        <Pressable onPress={() => setFav()} style={({ pressed }) => [{ paddingLeft: 15, width: 80, height: 80, alignItems: "center", borderRadius: 10 },
                        pressed && SHADOWS.large
                        ]}>
                        {({ pressed }) => (
                            <Image source={(liked === 1) ? icons.favIcon_U : icons.favIcon_F} style={[
                            { width: 80, height: 80, resizeMode: "contain", borderRadius: 9 },
                            pressed && { opacity: 0.70 },
                            ]} />
                        )}
                        </Pressable>
                    )}
                </View>
            </View>
        </BackImg>
    )
};
export default PlayersPage;
