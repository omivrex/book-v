import { View, Image } from "react-native";
import Container from "../../reusables/Containers.component";
import TextComponent from "../../reusables/Text.component";
import colors from "../../../constants/colors.context";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { MainTabNavType } from "../../../types/navigation.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import DefaultProfileImage from "../../../assets/images/user-icon.jpg";

const incomeChartConfig = {
    backgroundGradientFrom: colors.black,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.black,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};
const ratingChartConfig = {
    backgroundGradientFrom: colors.black,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.black,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};
const acceptanceChartConfig = {
    backgroundGradientFrom: colors.black,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.black,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};

const incomeData = {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [
        {
            data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
            color: (opacity = 1) => colors.yellow, // optional
            strokeWidth: 2, // optional
        },
    ],
};
const ratingData = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
        {
            data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
            color: (opacity = 1) => colors.grey4, // optional
            strokeWidth: 2, // optional
        },
    ],
};
const acceptanceRate = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
        {
            data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
            color: (opacity = 1) => colors.green, // optional
            strokeWidth: 2, // optional
        },
    ],
};

interface props {
    navigation: NativeStackNavigationProp<MainTabNavType, "Home">;
    route: RouteProp<MainTabNavType, "Home">;
}

const HomeScreen = ({ navigation }: props) => {
    return (
        <Container>
            <View style={{ marginTop: "15%", width: "100%", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: "5%" }}>
                <View>
                    <TextComponent type="h2" color={colors.yellow}>
                        Hi, Noni
                    </TextComponent>
                    <TextComponent fontSize={hp("1.7%")}>Lagos</TextComponent>
                </View>
                <View style={{ alignSelf: "flex-end", width: hp("4.7%"), gap: 5 }}>
                    <Image style={{ width: hp("4.5%"), height: hp("4.5%"), borderRadius: 100 }} source={DefaultProfileImage} />
                </View>
            </View>
            <View style={{ marginTop: "10%", width: "100%", paddingHorizontal: "5%" }}>
                <TextComponent type="plain-bold" fontSize={hp("1.7%")}>
                    Total Income
                </TextComponent>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <TextComponent type="h2">₦45,000</TextComponent>
                    <TextComponent type="plain-bold" color={colors.grey3}>
                        Today
                    </TextComponent>
                </View>
            </View>
            <View style={{ height: hp("35%"), width: "100%", alignItems: "center", justifyContent: "center" }}>
                <LineChart data={incomeData} width={wp("90%")} height={hp("30%")} style={{ position: "absolute" }} bezier chartConfig={incomeChartConfig} />
                <LineChart
                    data={acceptanceRate}
                    width={wp("90%")}
                    height={hp("30%")}
                    style={{ position: "absolute" }}
                    bezier
                    chartConfig={acceptanceChartConfig}
                    withHorizontalLabels={false}
                />
                <LineChart
                    data={ratingData}
                    width={wp("90%")}
                    height={hp("30%")}
                    style={{ position: "absolute" }}
                    bezier
                    chartConfig={ratingChartConfig}
                    withHorizontalLabels={false}
                />
            </View>
            <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", marginTop: "5%" }}>
                <View>
                    <TextComponent fontSize={hp("1.5%")}>
                        {" "}
                        <Entypo name="dot-single" size={hp("1.5%")} color={colors.yellow} /> Income
                    </TextComponent>
                    <TextComponent type="h3">{"   "}₦155,000</TextComponent>
                </View>
                <View>
                    <TextComponent fontSize={hp("1.5%")}>
                        {" "}
                        <Entypo name="dot-single" size={hp("1.5%")} color={colors.green} /> Average Bookings
                    </TextComponent>
                    <TextComponent type="h3">{"   "}65%</TextComponent>
                </View>
                <View>
                    <TextComponent fontSize={hp("1.5%")}>
                        {" "}
                        <Entypo name="dot-single" size={hp("1.5%")} color={colors.grey2} /> Ratings
                    </TextComponent>
                    <TextComponent type="h3">
                        {"   "}
                        4.3
                    </TextComponent>
                </View>
            </View>
            <View
                style={{
                    width: "85%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderColor: colors.grey3,
                    borderTopWidth: 1,
                    marginTop: "3%",
                    paddingTop: "5%",
                }}
            >
                <View>
                    <TextComponent type="plain-bold">
                        <FontAwesome6 name="business-time" size={hp("2%")} color={colors.yellow} /> Appointments
                    </TextComponent>
                    <TextComponent type="plain-light">{"      "}305</TextComponent>
                </View>
                <View>
                    <TextComponent type="plain-bold">
                        <Ionicons name="timer" size={hp("2%")} color={colors.yellow} /> Available Slots
                    </TextComponent>
                    <TextComponent type="plain-light">{"      "}35 km</TextComponent>
                </View>
            </View>
        </Container>
    );
};

export default HomeScreen;
