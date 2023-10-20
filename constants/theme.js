const COLORS = {
    light: "#F5F6F4",
    dark: "#1F1F1F",
    darkSecond: "#121212",
    blue: "#247BA0",
    red: "#E84855",
    orange: "#E28065",
    lightBlue: "#0099ff",
    lightGray: "#D9D9D9",
    backGround_purple: "4D5AB0",
    gold: "FDCD51",
    white: "FFFFFF"
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
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9
    }
};

export { COLORS, FONTS, SHADOWS, DIMS };