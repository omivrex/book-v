import { FlatList, TouchableOpacity, View, StyleSheet } from "react-native";
import Container from "../../components/Containers.component";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TextComponent from "../../components/Text.component";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../constants/colors.context";
import { MainTabNavType } from "../../types/navigation.types";
import { MaterialIcons } from "@expo/vector-icons";

interface props {
    navigation: NativeStackNavigationProp<MainTabNavType, "Notifications">;
}

const NotificationScreen = ({ navigation }: props) => {
    return (
        <Container>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingRight: "10%" }}>
                        <TextComponent type="h2">Notification</TextComponent>
                    </View>
                </View>

                <View>
                    <FlatList
                        data={[1, 2, 3, 5, 6, 7, 8, 9]}
                        style={{ width: wp("100%"), paddingBottom: hp("3%"), height: hp("75%"), overflow: "visible" }}
                        renderItem={() => (
                            <View style={styles.itemContainer}>
                                <MaterialIcons name="schedule" size={hp("4.5%")} color={colors.grey4} />
                                <View style={{ gap: 5, flex: 1 }}>
                                    <TextComponent color={colors.yellow}>Apointment</TextComponent>
                                    <TextComponent fontSize={11} type="plain-light">
                                        Its time for your apointment with Jenny
                                    </TextComponent>
                                </View>
                                <View>
                                    <TextComponent color="#616161" fontSize={10}>
                                        67mins
                                    </TextComponent>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: wp("100%"),
        height: hp("100%"),
        position: "absolute",
        paddingHorizontal: "5%",
    },

    header: {
        zIndex: 10,
        backgroundColor: colors.black,
        height: hp("15%"),
        width: wp("100%"),
        justifyContent: "flex-end",
        paddingBottom: "5%",
        gap: 20,
    },

    backButn: {
        width: hp("2%"),
        height: hp("4%"),
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp("5%"),
    },

    itemContainer: {
        flexDirection: "row",
        height: hp("10%"),
        marginVertical: "2.5%",
        gap: 15,
        paddingHorizontal: "7%",
        width: "90%",
        backgroundColor: colors.grey7,
        alignItems: "center",
        borderRadius: 20,
    },
});

export default NotificationScreen;
