import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackType } from "../types/navigation.types";
import AuthStack from "./AuthStack.navigation";
import MainTabNav from "./MainTab.navigation";
import { useContext, useEffect } from "react";
import UserDataContext from "../contexts/userdata.context";
import { getCacheProfileData } from "../utilities/cache.utility";

const Stack = createNativeStackNavigator<RootStackType>();

export default function RootStack() {
    const userDataContext = useContext(UserDataContext);

    console.log("test=>", userDataContext?.userData);

    return (
        <Stack.Navigator initialRouteName={userDataContext?.userData ? "Main" : "Auth"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="Main" component={MainTabNav} />
        </Stack.Navigator>
    );
}
