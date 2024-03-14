import { MainTabNavType } from "../types/navigation.types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import TextComponent from "../components/Text.component";
import colors from "../constants/colors.constant";
import DashboardIcon from "../assets/vectors/dashboard.svg";
import dashboardFocusedIcon from "../assets/images/dashboard.png";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { Image } from "react-native";
import BookingScreen from "../screens/main/Bookings.screen";
import HomeStack from "./HomeStack.navigation";
import SettingsScreen from "../screens/main/Settings.screen";

const Tab = createBottomTabNavigator<MainTabNavType>();

const MainTabNav = () => {
    return (
        <Tab.Navigator
            backBehavior="initialRoute"
            initialRouteName="Home-Stack"
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: hp("1.5%"),
                },
                tabBarIconStyle: {
                    marginHorizontal: wp("7%"),
                },
                tabBarStyle: {
                    backgroundColor: colors.black,
                    height: hp("10%"),
                },
                tabBarLabelPosition: "below-icon",
            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => {
                        switch (focused) {
                            case true:
                                return <Image resizeMode="cover" width={wp("10%")} source={dashboardFocusedIcon} />;
                            default:
                                return <DashboardIcon width={hp("2%")} height={hp("2%")} />;
                        }
                    },
                    tabBarLabel: ({ focused, children }) => {
                        return (
                            <TextComponent type="plain" style={{ fontSize: hp("1.5%") }} color={colors.grey4}>
                                {}
                            </TextComponent>
                        );
                    },
                }}
                name="Home-Stack"
                component={HomeStack}
            />
            <Tab.Screen
                options={{
                    tabBarIconStyle: { backgroundColor: "transparent" },
                    tabBarIcon: ({ focused }) => {
                        switch (focused) {
                            case true:
                                return (
                                    <TextComponent
                                        fontFamily="Poppins_600SemiBold"
                                        style={{
                                            textShadowColor: colors.yellow,
                                            textShadowOffset: { width: 0, height: 2.4 },
                                            textShadowRadius: 5,
                                        }}
                                        fontSize={hp("2.3%")}
                                        center
                                        color={colors.yellow}
                                    >
                                        Bookings
                                    </TextComponent>
                                );
                            default:
                                return <Ionicons name="calendar-number" size={hp("2%")} color={colors.grey4} />;
                        }
                    },
                    tabBarLabel: ({ focused, children }) => {
                        return (
                            <TextComponent type="plain" style={{ fontSize: hp("1.5%") }} color={colors.grey4}>
                                {}
                            </TextComponent>
                        );
                    },
                }}
                name="Bookings"
                component={BookingScreen}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => {
                        switch (focused) {
                            case true:
                                return <FontAwesome6 name="user-gear" color={colors.yellow} size={hp("3%")} />;
                            default:
                                return <FontAwesome6 name="user-gear" color={colors.grey5} size={hp("2%")} />;
                        }
                    },
                    tabBarLabel: ({ focused, children }) => {
                        return (
                            <TextComponent type="plain" style={{ fontSize: hp("1.5%") }} color={colors.grey4}>
                                {}
                            </TextComponent>
                        );
                    },
                }}
                name="Settings"
                component={SettingsScreen}
            />
        </Tab.Navigator>
    );
};

export default MainTabNav;
