import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import {
    useFonts,
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootStack from "./navigation/RootStack.navigation";
import UserDataContext from "./contexts/userdata.context";
import { useEffect, useState } from "react";
import { UserDataType } from "./types/profile.types";
import { getCacheProfileData } from "./utilities/cache.utility";

const queryClient = new QueryClient();

export default function App() {
    let [fontsLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_100Thin_Italic,
        Poppins_200ExtraLight,
        Poppins_200ExtraLight_Italic,
        Poppins_300Light,
        Poppins_300Light_Italic,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_500Medium,
        Poppins_500Medium_Italic,
        Poppins_600SemiBold,
        Poppins_600SemiBold_Italic,
        Poppins_700Bold,
        Poppins_700Bold_Italic,
        Poppins_800ExtraBold,
        Poppins_800ExtraBold_Italic,
        Poppins_900Black,
        Poppins_900Black_Italic,
    });

    const [userData, setuserData] = useState<UserDataType>();

    useEffect(() => {
        getCacheProfileData().then((data) => data && setuserData(data));
    }, []);

    if (fontsLoaded) {
        return (
            <RootSiblingParent>
                <NavigationContainer>
                    <QueryClientProvider client={queryClient}>
                        <UserDataContext.Provider value={{ userData, setuserData }}>
                            <RootStack />
                            <StatusBar style="light" translucent={true} />
                        </UserDataContext.Provider>
                    </QueryClientProvider>
                </NavigationContainer>
            </RootSiblingParent>
        );
    }
}
