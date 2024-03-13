import { StyleSheet, Text, StyleProp, TextStyle } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../constants/colors.constant";

interface propType {
    children?: any;
    type?: "h1" | "h2" | "h3" | "plain-bold" | "plain-light" | "plain";
    style?: StyleProp<TextStyle>;
    color?: string;
    fontSize?: number;
    fontFamily?:
        | "Poppins_100Thin"
        | "Poppins_100Thin_Italic"
        | "Poppins_200ExtraLight"
        | "Poppins_200ExtraLight_Italic"
        | "Poppins_300Light"
        | "Poppins_300Light_Italic"
        | "Poppins_400Regular"
        | "Poppins_400Regular_Italic"
        | "Poppins_500Medium"
        | "Poppins_500Medium_Italic"
        | "Poppins_600SemiBold"
        | "Poppins_600SemiBold_Italic"
        | "Poppins_700Bold"
        | "Poppins_700Bold_Italic"
        | "Poppins_800ExtraBold"
        | "Poppins_800ExtraBold_Italic"
        | "Poppins_900Black"
        | "Poppins_900Black_Italic";
    center?: boolean;
}

const TextComponent = ({ type, children, style, color, center, fontFamily, fontSize }: propType) => {
    const styles = StyleSheet.create({
        h1: {
            fontSize: fontSize || hp("5%"),
            fontStyle: "normal",
            fontFamily: fontFamily || "Poppins_600SemiBold",
            color: color || colors.white,
            textAlign: center ? "center" : "left",
            flexWrap: "wrap",
            ...(style as object),
        },

        h2: {
            fontSize: fontSize || hp("3.7%"),
            fontStyle: "normal",
            fontWeight: "bold",
            fontFamily: fontFamily || "Poppins_600SemiBold",
            color: color || colors.white,
            textAlign: center ? "center" : "left",
            flexWrap: "wrap",
            ...(style as object),
        },

        h3: {
            fontSize: fontSize || hp("2.5%"),
            fontStyle: "normal",
            fontFamily: fontFamily || "Poppins_400Regular",
            color: color || colors.white,
            textAlign: center ? "center" : "left",
            flexWrap: "wrap",
            ...(style as object),
        },

        plainBold: {
            fontSize: fontSize || hp("2%"),
            fontStyle: "normal",
            fontFamily: fontFamily || "Poppins_600SemiBold",
            color: color || colors.white,
            textAlign: center ? "center" : "left",
            flexWrap: "wrap",
            ...(style as object),
        },

        plainLight: {
            fontSize: fontSize || hp("2%"),
            fontStyle: "normal",
            fontFamily: fontFamily || "Poppins_200ExtraLight",
            color: color || colors.white,
            textAlign: center ? "center" : "left",
            flexWrap: "wrap",
            ...(style as object),
        },

        plain: {
            fontSize: fontSize || hp("2%"),
            fontStyle: "normal",
            fontFamily: fontFamily || "Poppins_600SemiBold",
            color: color || colors.white,
            textAlign: center ? "center" : "left",
            flexWrap: "wrap",
            ...(style as object),
        },
    });

    switch (type) {
        case "h1":
            return <Text style={styles.h1}>{children}</Text>;
        case "h2":
            return <Text style={styles.h2}>{children}</Text>;
        case "h3":
            return <Text style={styles.h3}>{children}</Text>;
        case "plain-bold":
            return <Text style={styles.plainBold}>{children}</Text>;
        case "plain-light":
            return <Text style={styles.plainLight}>{children}</Text>;
        default:
            return <Text style={styles.plain}>{children}</Text>;
    }
};
export default TextComponent;
