import { ScrollView, View } from "react-native";
import Container, { InnerWrapper, KeyboardView, ScrollContainer } from "../../components/Containers.component";
import TextComponent from "../../components/Text.component";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../constants/colors.constant";
import { InputComponent } from "../../components/Input.component";
import CustButton from "../../components/Buttons.component";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainTabNavType } from "../../types/navigation.types";
import { CommonActions, RouteProp } from "@react-navigation/native";
import { Ref, useContext, useRef } from "react";
import { isValidEmail, isValidPhonenumber } from "../../helpers/validators.helper";
import { message } from "../../helpers/api.helper";
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../utilities/auth.utility";
import { UserDataType } from "../../types/profile.types";
import { updateProfileInfo } from "../../utilities/profile.utility";
import UserDataContext from "../../contexts/userdata.context";

interface props {
    navigation: NativeStackNavigationProp<MainTabNavType, "Settings">;
    route: RouteProp<MainTabNavType, "Settings">;
}

const SettingsScreen = ({ navigation, route }: props) => {
    const palceApi = useRef<GooglePlacesAutocompleteRef>();
    const userDataContext = useContext(UserDataContext);

    const formDetails = useRef<UserDataType>({
        ...(userDataContext?.userData as UserDataType),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: () => updateProfileInfo(formDetails.current),
        onSuccess(data, variables, context) {
            message("Updated profile information successfully", "success");
            userDataContext?.setuserData(data);
            navigation.goBack();
        },
    });

    const validate = () => {
        if (!isValidEmail(formDetails.current.email)) {
            message("Input a valid email address", "failure");
        } else if (!isValidPhonenumber(formDetails.current.phone)) {
            message("Input a valid phone number", "failure");
        } else if (formDetails.current.fullName.length < 1) {
            message("Input Your full name", "failure");
        } else if (!formDetails.current.businessName) {
            message("Enter your business name", "failure");
        } else if (!formDetails.current.location) {
            message("Enter your business address", "failure");
        } else {
            mutate();
        }
    };

    return (
        <Container>
            <InnerWrapper>
                <ScrollView keyboardShouldPersistTaps={"always"} style={{ marginTop: "20%", width: "100%", paddingHorizontal: "5%" }}>
                    <View>
                        <TextComponent type="h3">Update your information</TextComponent>
                    </View>

                    <View style={{ gap: 30, marginVertical: "10%" }}>
                        <InputComponent
                            style={{ color: colors.yellow }}
                            placeholder="Enter your full name "
                            defaultValue={userDataContext?.userData?.fullName}
                            onChange={(text) => (formDetails.current.fullName = text)}
                        />
                        <InputComponent
                            type="text"
                            style={{ color: colors.yellow }}
                            onChange={(text) => (formDetails.current.email = text)}
                            defaultValue={userDataContext?.userData?.email}
                            editable={false}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                        />
                        <InputComponent
                            type="phone"
                            defaultValue={userDataContext?.userData?.phone}
                            onChange={(phoneInfo) => (formDetails.current.phone = phoneInfo.number)}
                        />
                        <InputComponent
                            style={{ color: colors.yellow }}
                            placeholder="Enter your Business name "
                            defaultValue={userDataContext?.userData?.businessName}
                            onChange={(text) => (formDetails.current.businessName = text)}
                        />
                        <GooglePlacesAutocomplete
                            placeholder=""
                            ref={palceApi as Ref<GooglePlacesAutocompleteRef>}
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
                            textInputProps={{
                                defaultValue: userDataContext?.userData?.location?.name,
                                placeholder: userDataContext?.userData?.location?.name,
                                placeholderTextColor: colors.yellow,
                            }}
                            enablePoweredByContainer={false}
                            onFail={(error: Error) => console.error(error)}
                        />
                    </View>
                    <CustButton
                        onPress={validate}
                        width={wp("90%")}
                        style={{ marginTop: "10%", alignSelf: "center", marginBottom: hp("30%") }}
                        color={colors.yellow}
                    >
                        <TextComponent type="plain-bold" color={colors.black}>
                            {isPending ? "Loading..." : "Update"}
                        </TextComponent>
                    </CustButton>
                </ScrollView>
            </InnerWrapper>
        </Container>
    );
};

export default SettingsScreen;
