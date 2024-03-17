import { RenderOptions, render } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import UserDataContext from "../contexts/userdata.context";
import { useState } from "react";
import { UserDataType } from "../types/profile.types";
const queryClient = new QueryClient();
/** Wraps any component which will be rendered by RNTL render function in all the providers */
const AllProviders = ({ children }: any) => {
    const [userData, setuserData] = useState<UserDataType>();

    return (
        <RootSiblingParent>
            <NavigationContainer>
                <QueryClientProvider client={queryClient}>
                    <UserDataContext.Provider value={{ userData, setuserData }}>{children}</UserDataContext.Provider>
                </QueryClientProvider>
            </NavigationContainer>
        </RootSiblingParent>
    );
};

const customender = (ui: any, options?: RenderOptions) => render(ui, { wrapper: AllProviders, ...options });
export * from "@testing-library/react-native";
export { customender as render };
