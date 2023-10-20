// layout will go here
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync()

// prob not the "correct" way to change status bar but it works... only if you commetn it out then back in after starting expo
const Layout = () => {

  const [fontsLoaded, error] = useFonts({
    robReg: require("../assets/fonts/Roboto-Regular.ttf"),
    robBlack : require("../assets/fonts/Roboto-Black.ttf"),
    robBold : require("../assets/fonts/Roboto-Bold.ttf"),
    robReg :require("../assets/fonts/Roboto-Regular.ttf"),
    robItalReg : require("../assets/fonts/Roboto-Italic.ttf"),
    robMedium : require("../assets/fonts/Roboto-Medium.ttf"),
    robItalMedium : require("../assets/fonts/Roboto-MediumItalic.ttf"),
    robLight : require("../assets/fonts/Roboto-Light.ttf"),
    robItalLight : require("../assets/fonts/Roboto-LightItalic.ttf"),
    robThin : require("../assets/fonts/Roboto-Thin.ttf"),
    robITalThin: require("../assets/fonts/Roboto-ThinItalic.ttf")
  });

  const onLayoutRootView = useCallback(async ()=>{
    if(fontsLoaded){
        console.log(fontsLoaded);
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded, error]);

    if((!fontsLoaded) || (error)){
      // console.log("RAAAAAAH")
      return null;
    } 


  return (
    <Stack onLayout={onLayoutRootView}
      screenOptions={{
        headerShown: false,
        headerTitle: (props) => <StatusBar style="light" />,
      }}
    />
  );
};
export default Layout;
