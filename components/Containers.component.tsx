import { StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Platform, ViewStyle, StyleProp } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors.constant";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { RefreshControl } from "react-native";

const Container = ({ children, style }: { style?: StyleProp<ViewStyle>; children: React.ReactNode }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            width: wp("100%"),
            height: hp("100%"),
            backgroundColor: colors.black,
            ...(style as object),
        },
    });

    return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};
export default Container;

export const KeyboardView = ({ children, style }: { style?: StyleProp<ViewStyle>; children: React.ReactNode }) => {
    const styles = StyleSheet.create({
        wrapper: {
            width: "100%",
            height: "100%",
            alignItems: "center",
            ...(style as object),
        },
    });

    return (
        <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>{children}</>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export const ScrollContainer = ({
    children,
    style,
    refresh,
    onRefresh,
    keyboardShouldPersistTaps,
}: {
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    refresh?: boolean;
    keyboardShouldPersistTaps?: "always" | "never" | "handled";
    onRefresh?: () => void;
}) => {
    const styles = StyleSheet.create({
        wraper: {
            width: "100%",
            overflow: "scroll",
            ...(style as object),
        },
    });

    return (
        <ScrollView
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            refreshControl={refresh ? <RefreshControl refreshing={refresh} progressViewOffset={hp("2%")} onRefresh={onRefresh} /> : undefined}
            style={styles.wraper}
        >
            {children}
        </ScrollView>
    );
};

export const InnerWrapper = ({ children, style }: { style?: StyleProp<ViewStyle>; children: React.ReactNode }) => {
    const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            width: "100%",
            height: hp("100%"),
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between",
            ...(style as object),
        },
    });

    return <View style={styles.wrapper}>{children}</View>;
};
