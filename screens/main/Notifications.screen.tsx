import { FlatList, TouchableOpacity, View, StyleSheet, RefreshControl } from "react-native";
import Container from "../../components/Containers.component";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TextComponent from "../../components/Text.component";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../constants/colors.constant";
import { HomeStackType } from "../../types/navigation.types";
import { MaterialIcons } from "@expo/vector-icons";
import CustButton from "../../components/Buttons.component";
import { getNotifications } from "../../utilities/notification.utility";
import { useQuery } from "@tanstack/react-query";
import { capitalize1stLetterOfEachWord } from "../../helpers/text.helper";
import moment from "moment";

interface props {
    navigation: NativeStackNavigationProp<HomeStackType, "Notifications">;
}

const NotificationScreen = ({ navigation }: props) => {
    const {
        data: notifications,
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["get-notifications"],
        queryFn: () => getNotifications(),
    });

    return (
        <Container>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%", paddingRight: "10%" }}>
                        <CustButton onPress={navigation.goBack} color="#FFF" type="back" />
                        <TextComponent type="h2">Notification</TextComponent>
                    </View>
                </View>

                <View>
                    <FlatList
                        data={notifications}
                        refreshControl={
                            <RefreshControl
                                titleColor={colors.yellow}
                                refreshing={isLoading}
                                progressViewOffset={hp("2%")}
                                onRefresh={refetch}
                                colors={[colors.yellow]}
                                tintColor={colors.yellow}
                                title={"Refreshing..."}
                            />
                        }
                        style={{ width: wp("100%"), paddingBottom: hp("3%"), height: hp("75%"), overflow: "visible" }}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <MaterialIcons name="schedule" size={hp("4.5%")} color={colors.grey4} />
                                <View style={{ gap: 5, flex: 1 }}>
                                    <TextComponent color={colors.yellow}>{capitalize1stLetterOfEachWord(item.type)}</TextComponent>
                                    <TextComponent fontSize={11} type="plain-light">
                                        {item.message}
                                    </TextComponent>
                                </View>
                                <View>
                                    <TextComponent color="#616161" fontSize={10}>
                                        {moment(item.time).fromNow(true)}
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
