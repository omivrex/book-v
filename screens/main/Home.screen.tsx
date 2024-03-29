import { View, Image, TouchableOpacity } from "react-native";
import Container from "../../components/Containers.component";
import TextComponent from "../../components/Text.component";
import colors from "../../constants/colors.constant";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import { HomeStackType } from "../../types/navigation.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useContext } from "react";
import UserDataContext from "../../contexts/userdata.context";
import { capitalize1stLetterOfEachWord, truncateString } from "../../helpers/text.helper";
import moment from "moment";

const data = [
    {
        name: "",
        days: 5,
        color: colors.yellow,
        legendFontColor: colors.grey4,
        legendFontSize: hp("1.7%"),
    },
    {
        name: "",
        days: 30,
        color: "green",
        legendFontColor: colors.grey4,
        legendFontSize: hp("1.7%"),
    },
];
const chartConfig = {
    backgroundGradientFrom: colors.green,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.green,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    barPercentage: 0.5,
};

interface props {
    navigation: NativeStackNavigationProp<HomeStackType, "Home">;
    route: RouteProp<HomeStackType, "Home">;
}

const HomeScreen = ({ navigation }: props) => {
    const userDataContext = useContext(UserDataContext);

    return (
        <Container>
            <View style={{ marginTop: "10%", width: "100%", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: "5%" }}>
                <View>
                    <TextComponent type="h2" color={colors.yellow}>
                        Hi, {capitalize1stLetterOfEachWord(userDataContext?.userData?.fullName)}
                    </TextComponent>
                    <TextComponent type="plain-bold" fontSize={hp("2%")}>
                        {userDataContext?.userData?.businessName}
                    </TextComponent>
                    <TextComponent fontSize={hp("1.7%")}>{truncateString(userDataContext?.userData?.location?.name, 25)}</TextComponent>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Notifications")} style={{ alignSelf: "flex-end", width: hp("4.7%"), gap: 5 }}>
                    <Ionicons name="notifications" color={colors.yellow} size={hp("3%")} />
                </TouchableOpacity>
            </View>

            <View style={{ justifyContent: "space-between", flex: 1, paddingHorizontal: "5%", marginTop: "5%", width: "100%" }}>
                <View style={{ height: hp("35%"), width: "100%", justifyContent: "center", marginTop: "2.5%" }}>
                    <TextComponent type="plain-bold" fontSize={hp("2.5%")} color={colors.grey3}>
                        {moment().format("MMMM")}
                    </TextComponent>
                    <PieChart
                        data={data}
                        width={wp("100%")}
                        height={hp("35%")}
                        chartConfig={chartConfig}
                        accessor={"days"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[62.5, 0]}
                        hasLegend={false}
                        absolute
                    />
                </View>
                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", marginTop: "15%" }}>
                    <View>
                        <TextComponent fontSize={hp("1.5%")}>Booked days</TextComponent>
                        <TextComponent color={colors.yellow} type="h3">
                            05
                        </TextComponent>
                    </View>
                    <View>
                        <TextComponent fontSize={hp("1.5%")}>Free Days</TextComponent>
                        <TextComponent color={colors.green} type="h3">
                            25
                        </TextComponent>
                    </View>
                </View>
            </View>
            <View
                style={{
                    width: "90%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderColor: colors.grey3,
                    borderTopWidth: 1,
                    paddingTop: "5%",
                }}
            >
                <View>
                    <TextComponent type="plain-bold">
                        <FontAwesome6 name="business-time" size={hp("2%")} color={colors.yellow} /> Upcomming
                    </TextComponent>
                    <TextComponent type="plain-light" center>
                        305
                    </TextComponent>
                </View>
                <View>
                    <TextComponent type="plain-bold">
                        <Ionicons name="timer" size={hp("2%")} color={colors.yellow} /> Past Sessions
                    </TextComponent>
                    <TextComponent type="plain-light" center>
                        35
                    </TextComponent>
                </View>
            </View>
        </Container>
    );
};

export default HomeScreen;
