import { MainTabNavType } from "../../types/navigation.types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import TextComponent from "../reusables/Text.component";
import colors from "../../constants/colors.context";
import HomeScreen from "../screens/main/Home.screen";
import DashboardIcon from "../../assets/vectors/dashboard.svg";
import dashboardFocusedIcon from "../../assets/images/dashboard.png";
import { Ionicons } from "@expo/vector-icons";
import SettingsIcon from "../../assets/vectors/settings.svg";
import { Image } from "react-native";
import BookingScreen from "../screens/main/Bookings.screen";
import NotificationScreen from "../screens/main/Notifications.screen";

const Tab = createBottomTabNavigator<MainTabNavType>();

const MainTabNav = () => {
    return (
        <Tab.Navigator
            backBehavior="initialRoute"
            initialRouteName="Home"
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
                name="Home"
                component={HomeScreen}
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
                                return <SettingsIcon color={colors.yellow} width={hp("3%")} height={hp("3%")} />;
                            default:
                                return <SettingsIcon color={colors.grey5} width={hp("2%")} height={hp("2%")} />;
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
                name="Notifications"
                component={NotificationScreen}
            />
        </Tab.Navigator>
    );
};

export default MainTabNav;
