import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../../constants/colors.context";
import Container, { InnerWrapper, ScrollContainer } from "../../reusables/Containers.component";
import TextComponent from "../../reusables/Text.component";
import { InputComponent } from "../../reusables/Input.component";
import CustButton from "../../reusables/Buttons.component";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AuthStackType } from "../../../types/navigation.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface props {
    navigation: NativeStackNavigationProp<AuthStackType, "Signup">;
}

const LoginScreen = ({ navigation }: props) => {
    const formDetails = useRef({
        email: "",
        password: "",
    });

    return (
        <Container>
            <View style={styles.header}>
                <TextComponent type="h1">
                    Tev
                    <TextComponent type="h1" color={colors.yellow}>
                        cab
                    </TextComponent>
                </TextComponent>
            </View>

            <InnerWrapper style={{ paddingHorizontal: "5%", alignItems: "flex-start", paddingBottom: "2%" }}>
                <View>
                    <TextComponent fontFamily="Poppins_600SemiBold" type="h3" color={colors.yellow}>
                        Welcome !
                    </TextComponent>
                    <TextComponent type="plain-light" fontSize={hp("1.8%")}>
                        Lets get you started as a Tev
                        <TextComponent type="plain-light" fontSize={hp("1.8%")} color={colors.yellow}>
                            cab
                        </TextComponent>{" "}
                        driver.
                    </TextComponent>
                </View>
                <ScrollContainer>
                    <View style={{ gap: 40, marginTop: "15%" }}>
                        <TextComponent>
                            Login to Tev<TextComponent color={colors.yellow}>cab</TextComponent>
                        </TextComponent>
                        <InputComponent
                            type="text"
                            onChange={(text) => (formDetails.current.email = text)}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                        />
                        <InputComponent type="hidden" onChange={(text) => (formDetails.current.password = text)} placeholder="Provide a password" />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <TextComponent style={{ fontSize: hp("1.5%"), textAlign: "right", marginTop: "2%" }}>
                            Don't have an account?{" "}
                            <TextComponent color={colors.yellow} fontSize={hp("1.5%")}>
                                Signup
                            </TextComponent>
                        </TextComponent>
                    </TouchableOpacity>
                    <View style={{ gap: 5, marginTop: "15%" }}>
                        <View style={{ width: "80%", height: hp("0.1%"), backgroundColor: colors.yellow, alignSelf: "center", marginBottom: "5%" }} />
                        <TextComponent style={{ fontSize: hp("1.5%") }} center>
                            By signing in you agree to Tevcab
                        </TextComponent>
                        <TextComponent type="plain-light" style={{ fontSize: hp("1.5%") }} center>
                            Terms & Conditions Privacy Policy & Associated Risks
                        </TextComponent>
                    </View>
                </ScrollContainer>
                <CustButton onPress={() => null} color={colors.yellow}>
                    <TextComponent type="plain-bold" color={colors.black}>
                        {true ? "Loading..." : "Sign In"}
                    </TextComponent>
                </CustButton>
            </InnerWrapper>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: "15%",
        justifyContent: "flex-end",
        paddingHorizontal: "5%",
        marginBottom: "5%",
    },
});

export default LoginScreen;
