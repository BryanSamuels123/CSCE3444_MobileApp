const COLORS = {
    light: "#F5F6F4",
    dark: "#1F1F1F",
    darkSecond: "#121212",
    blue: "#247BA0",
    red: "#E84855",
    orange: "#FAC748",
    lightBlue: "#0099ff",
    lightGray: "#D9D9D9",
    backGround_purple: "#4D5AB0",
    gold: "#FDCD51",
    white: "#FFFFFF",
    pastelPurpleLow: "#A3A9CE80",  // color with alpha value (opacity: 50%),
    pastelPurpleHigh: "#A3A9CEFF", // color with alpha value (opacity: 90%)
    linkBlue: "#0377FC"
};

const FONTS = { //not all fonts are defined from the package only these ones, you can add them here and require them in _layout.js if needed
    black: "robBlack",
    bold: "robBold",
    regular: "robReg",
    italicRegular: "robItalReg",
    medium: "robMedium",
    italicMedium: "robItalMedium",
    light: "robLight",
    italicLight: "robItalLight",
    thin: "robThin",
    italicThin: "robITalThin"

};

const DIMS = { //dimensions and sizes; can be changed as needed.
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
};

const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
      },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 9
    },
    large: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    }
};

export { COLORS, FONTS, SHADOWS, DIMS };