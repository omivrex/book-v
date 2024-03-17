import { ScrollView, View } from "react-native";
import Container, { InnerWrapper, KeyboardView, ScrollContainer } from "../../components/Containers.component";
import TextComponent from "../../components/Text.component";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../constants/colors.constant";
import { InputComponent } from "../../components/Input.component";
import CustButton from "../../components/Buttons.component";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackType } from "../../types/navigation.types";
import { CommonActions, RouteProp } from "@react-navigation/native";
import { Ref, useContext, useRef } from "react";
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import { useMutation } from "@tanstack/react-query";
import { SignupDataType } from "../../types/auth.types";
import { createAccount, validateSignupInputs } from "../../utilities/auth.utility";
import { getCacheProfileData } from "../../utilities/cache.utility";
import UserDataContext from "../../contexts/userdata.context";

interface props {
    navigation: NativeStackNavigationProp<AuthStackType, "Signup">;
}

const SignupScreen = ({ navigation }: props) => {
    const userDataContext = useContext(UserDataContext);
    const formDetails = useRef<SignupDataType>({
        fullName: "",
        phone: "",
        location: null,
        email: "",
        password: "",
        businessName: "",
        accountType: "VENDOR",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: () => createAccount(formDetails.current),
        onSuccess(data, variables, context) {
            getCacheProfileData()
                .then((data) => data && userDataContext?.setuserData(data))
                .then(() =>
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "Main" }],
                        })
                    )
                );
        },
    });

    return (
        <Container>
            <InnerWrapper>
                <View style={{ width: "100%" }}>
                    <CustButton
                        testID="back-button"
                        onPress={navigation.goBack}
                        style={{ alignSelf: "flex-start", marginBottom: 0 }}
                        color={colors.white}
                        type="back"
                    />
                </View>
                <ScrollView keyboardShouldPersistTaps={"always"} style={{ marginTop: "10%", width: "100%", paddingHorizontal: "5%" }}>
                    <View>
                        <TextComponent type="h2">Lets get more information</TextComponent>
                    </View>

                    <View style={{ gap: 30, marginVertical: "10%" }}>
                        <InputComponent
                            style={{ color: colors.yellow }}
                            placeholder="Enter your full name"
                            onChange={(text) => (formDetails.current.fullName = text)}
                        />
                        <InputComponent
                            type="text"
                            style={{ color: colors.yellow }}
                            onChange={(text) => (formDetails.current.email = text)}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                        />
                        <InputComponent
                            type="phone"
                            placeholder="Enter your phone number"
                            onChange={(phoneInfo) => (formDetails.current.phone = phoneInfo.number)}
                        />
                        <InputComponent
                            type="hidden"
                            style={{ color: colors.yellow }}
                            onChange={(text) => (formDetails.current.password = text)}
                            placeholder="Provide a password"
                        />
                        <InputComponent
                            style={{ color: colors.yellow }}
                            placeholder="Enter your Businessname name "
                            onChange={(text) => (formDetails.current.businessName = text)}
                        />
                        <GooglePlacesAutocomplete
                            placeholder="Enter your business location"
                            textInputProps={{ placeholder: "Enter your business location", placeholderTextColor: colors.grey4 }}
                            query={{
                                key: process.env.EXPO_PUBLIC_PLACES_API_KEY,
                                language: "en",
                                // components: "country:ng",
                            }}
                            styles={{
                                container: { width: wp("90%") },
                                listView: { backgroundColor: colors.black, height: hp("30%"), width: "100%" },
                                row: { paddingVertical: hp("2%") },
                                description: {
                                    fontSize: hp("1.5%"),
                                    paddingHorizontal: wp("5%"),
                                    color: colors.white,
                                    fontFamily: "Poppins_500Medium",
                                    // zIndex: 20,
                                },
                                textInputContainer: {
                                    width: "100%",
                                    overflow: "visible",
                                    height: hp("7%"),
                                    borderColor: colors.yellow,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                },
                                textInput: {
                                    color: colors.yellow,
                                    paddingHorizontal: wp("5%"),
                                    width: "100%",
                                    height: "100%",
                                    fontSize: hp("2%"),
                                    fontFamily: "Poppins_300Light",
                                    borderRadius: 10,
                                },
                            }}
                            suppressDefaultStyles
                            fetchDetails
                            onPress={(data: GooglePlaceData, details: GooglePlaceDetail | null = null) => {
                                formDetails.current.location = {
                                    long: (details as GooglePlaceDetail).geometry.location.lng,
                                    lat: (details as GooglePlaceDetail).geometry.location.lat,
                                    name: data.structured_formatting.main_text,
                                } as any;
                            }}
                            enablePoweredByContainer={false}
                            onFail={(error: Error) => console.error(error)}
                        />
                    </View>
                    <CustButton
                        onPress={() => validateSignupInputs(formDetails.current) && mutate()}
                        width={wp("90%")}
                        style={{ marginTop: "10%", alignSelf: "center", marginBottom: hp("30%") }}
                        color={colors.yellow}
                        testID="signup-button"
                    >
                        <TextComponent type="plain-bold" color={colors.black}>
                            {isPending ? "Loading..." : "Signup"}
                        </TextComponent>
                    </CustButton>
                </ScrollView>
            </InnerWrapper>
        </Container>
    );
};

export default SignupScreen;
