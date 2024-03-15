import { Modal, View } from "react-native";
import { Availability } from "../types/booking.types";
import colors from "../constants/colors.constant";
import CustButton from "../components/Buttons.component";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import TextComponent from "../components/Text.component";
import moment from "moment";
import { InputComponent } from "../components/Input.component";
import { BlurView } from "expo-blur";
import { useEffect, useRef } from "react";
import { message } from "../helpers/api.helper";
import { createAvailability, updateAvailability } from "../utilities/booking.utility";
import { useMutation } from "@tanstack/react-query";

interface props {
    closeFunc: () => void;
    isOpen: boolean;
    availabilityData?: Availability;
    date?: string;
    index?: number;
}

const BookingModal = ({ closeFunc, isOpen, availabilityData, date, index }: props) => {
    const formData = useRef<Availability>({
        name: availabilityData?.name || "",
        height: 50,
        day: date || moment().format("YYYY-MM-DD"),
        from: availabilityData?.from || new Date().getTime(),
        to: availabilityData?.to || new Date().getTime(),
        description: availabilityData?.description || "",
    });

    useEffect(() => {}, [availabilityData]);

    const { mutate, isPending } = useMutation({
        mutationFn: () =>
            index
                ? updateAvailability(date || moment().format("YYYY-MM-DD"), formData.current, index)
                : createAvailability(date || moment().format("YYYY-MM-DD"), formData.current),
        onSuccess(data, variables, context) {
            closeFunc();
            index ? message("Successfully updated availability", "success") : message("Successfully created a new availability", "success");
        },
    });

    return (
        <Modal visible={isOpen} transparent animationType="fade">
            <BlurView intensity={20} tint="dark" style={{ justifyContent: "center", height: hp("100%"), width: wp("100%"), alignItems: "center" }}>
                <View
                    style={{
                        backgroundColor: colors.grey7,
                        width: wp("85%"),
                        height: hp("60%"),
                        borderRadius: 16,
                        padding: "3%",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ alignItems: "center", width: "100%", flexDirection: "row" }}>
                        <TextComponent center style={{ position: "absolute", width: "100%" }} fontSize={hp("2.5%")} fontFamily="Poppins_300Light">
                            {moment(date).format("MMMM DD, YYYY") || moment().format("MMMM DD, YYYY")}
                        </TextComponent>
                        <CustButton color={colors.white} style={{ alignSelf: "flex-start" }} onPress={closeFunc} type="back" />
                    </View>
                    <View style={{ marginTop: "2%", gap: 10 }}>
                        <View>
                            <TextComponent fontSize={hp("1.8%")} fontFamily="Poppins_400Regular">
                                From:
                            </TextComponent>
                            <InputComponent
                                mode="time"
                                onChange={(time) => {
                                    if (time) formData.current.from = time?.getTime();
                                }}
                                defaultValue={availabilityData?.from}
                                type="date"
                            />
                        </View>
                        <View>
                            <TextComponent fontSize={hp("1.8%")} fontFamily="Poppins_400Regular">
                                To:
                            </TextComponent>
                            <InputComponent
                                mode="time"
                                onChange={(time) => {
                                    if (time) formData.current.to = time?.getTime();
                                }}
                                defaultValue={availabilityData?.to}
                                type="date"
                            />
                        </View>
                        <View>
                            <TextComponent fontSize={hp("1.8%")} fontFamily="Poppins_400Regular">
                                Notes:
                            </TextComponent>
                            <InputComponent
                                wrapperStyle={{ borderColor: colors.grey3, backgroundColor: "transparent" }}
                                onChange={(text) => (formData.current.name = text)}
                                placeholder="What is this time for?"
                                defaultValue={availabilityData?.name}
                            />
                        </View>
                        <InputComponent
                            wrapperStyle={{ borderColor: colors.grey3, backgroundColor: "transparent" }}
                            multiLine
                            onChange={(text) => (formData.current.description = text)}
                            maxLength={100}
                            defaultValue={availabilityData?.description}
                            placeholder="Description"
                        />
                    </View>
                    <CustButton
                        onPress={() => (formData.current.name.trim().length ? mutate() : message("Input a valid name", "failure"))}
                        width={"90%"}
                        style={{ alignSelf: "center" }}
                        color={colors.yellow}
                    >
                        <TextComponent type="plain-bold" color={colors.black}>
                            {isPending ? "Loading..." : "Save"}
                        </TextComponent>
                    </CustButton>
                </View>
            </BlurView>
        </Modal>
    );
};

export default BookingModal;
