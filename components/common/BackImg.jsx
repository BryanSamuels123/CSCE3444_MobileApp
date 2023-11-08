import { View, ImageBackground } from "react-native";
import { images } from "../../constants";

const BackImg = ({children}) =>{ // how to create a custom component

    return(
    <View style={{flex: 1}}>
        <ImageBackground source={images.mainBackground} resizeMode="cover" style={{flex: 1, width: '100%', height: "100%"}}>
            {children}
        </ImageBackground>
    </View>
    )
};
export default BackImg;
