import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../constants/colors.constant";
import Container, { InnerWrapper, ScrollContainer } from "../../components/Containers.component";
import TextComponent from "../../components/Text.component";
import { InputComponent } from "../../components/Input.component";
import CustButton from "../../components/Buttons.component";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AuthStackType } from "../../types/navigation.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../utilities/auth.utility";
import { message } from "../../helpers/api.helper";
import { CommonActions } from "@react-navigation/native";
import { getCacheProfileData } from "../../utilities/cache.utility";
import UserDataContext from "../../contexts/userdata.context";

interface props {
    navigation: NativeStackNavigationProp<AuthStackType, "Signup">;
}

const LoginScreen = ({ navigation }: props) => {
    const userDataContext = useContext(UserDataContext);
    const formDetails = useRef({
        email: "",
        password: "",
    });
    const { isPending, mutate } = useMutation({
        mutationFn: () => login(formDetails.current.email, formDetails.current.password),
        onError: (err: any) => message(err.message, "failure"),
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
            <View style={styles.header}>
                <TextComponent type="h1">
                    Book
                    <TextComponent type="h1" color={colors.yellow}>
                        -V
                    </TextComponent>
                </TextComponent>
            </View>

            <InnerWrapper style={{ paddingHorizontal: "5%", alignItems: "flex-start", paddingBottom: "2%" }}>
                <View>
                    <TextComponent fontFamily="Poppins_600SemiBold" type="h3" color={colors.yellow}>
                        Welcome !
                    </TextComponent>
                    <TextComponent type="plain-light" fontSize={hp("1.8%")}>
                        Lets get you started as a Book
                        <TextComponent type="plain-light" fontSize={hp("1.8%")} color={colors.yellow}>
                            -V
                        </TextComponent>{" "}
                    </TextComponent>
                </View>
                <ScrollContainer>
                    <View style={{ gap: 40, marginTop: "15%" }}>
                        <TextComponent>
                            Login to Book<TextComponent color={colors.yellow}>-V</TextComponent>
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
                            By signing in you agree to Book-V
                        </TextComponent>
                        <TextComponent type="plain-light" style={{ fontSize: hp("1.5%") }} center>
                            Terms & Conditions Privacy Policy & Associated Risks
                        </TextComponent>
                    </View>
                </ScrollContainer>
                <CustButton onPress={() => formDetails.current.email && formDetails.current.password && mutate()} color={colors.yellow}>
                    <TextComponent type="plain-bold" color={colors.black}>
                        {isPending ? "Loading..." : "Sign In"}
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
