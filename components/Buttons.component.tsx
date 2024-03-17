import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { DimensionValue, GestureResponderEvent, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

interface propType {
    children?: ReactNode;
    type?: "close" | "default" | "rounded" | "rounded-rect" | "back" | "forward";
    style?: StyleProp<ViewStyle>;
    color: string;
    size?: number;
    width?: DimensionValue;
    testID?: string;
    onPress?: (e: GestureResponderEvent) => void;
}

const CustButton = ({ children, type, style, onPress, color, width, size, testID }: propType) => {
    const styles = StyleSheet.create({
        backButn: {
            marginTop: "10%",
            marginBottom: "5%",
            alignSelf: "center",
            marginLeft: "3%",
            ...(style as object),
        },

        closeButn: {
            ...(style as object),
        },

        rounded: {
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            width: 70,
            height: 70,
            backgroundColor: color,
            borderRadius: 100,
            ...(style as object),
        },

        roundedRect: {
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: width ? width : hp(20),
            height: hp(5),
            gap: hp("1%"),
            backgroundColor: color,
            borderRadius: 50,
            ...(style as object),
        },

        default: {
            width: width ? width : "100%",
            paddingVertical: hp(1),
            flexDirection: "row",
            gap: 5,
            justifyContent: "center",
            backgroundColor: color,
            alignItems: "center",
            borderRadius: 10,
            ...(style as object),
        },
    });

    switch (type) {
        case "forward":
            return (
                <TouchableOpacity testID={testID} onPress={onPress}>
                    <AntDesign name="right" size={size || hp(6)} color={color} />
                </TouchableOpacity>
            );
        case "back":
            return (
                <TouchableOpacity testID={testID} onPress={onPress}>
                    <Ionicons name="chevron-back" style={styles.backButn} size={size || hp(4)} color={color} />
                </TouchableOpacity>
            );
        case "close":
            return (
                <TouchableOpacity testID={testID} onPress={onPress}>
                    <Ionicons name="close" style={styles.closeButn} size={size || hp(6)} color={color} />
                </TouchableOpacity>
            );
        case "rounded":
            return (
                <TouchableOpacity testID={testID} onPress={onPress} style={styles.rounded}>
                    {children}
                </TouchableOpacity>
            );
        case "rounded-rect":
            return (
                <TouchableOpacity testID={testID} onPress={onPress} style={styles.roundedRect}>
                    {children}
                </TouchableOpacity>
            );
        default:
            return (
                <TouchableOpacity testID={testID} onPress={onPress} style={styles.default}>
                    {children}
                </TouchableOpacity>
            );
    }
};

export default CustButton;
