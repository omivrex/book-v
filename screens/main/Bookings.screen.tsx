import { FlatList, RefreshControl, View } from "react-native";
import Container from "../../components/Containers.component";
import TextComponent from "../../components/Text.component";
import { Agenda, AgendaEntry, AgendaSchedule } from "react-native-calendars";
import colors from "../../constants/colors.constant";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import moment from "moment";
import { memo, useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Availability, Availabilities } from "../../types/booking.types";
import CustButton from "../../components/Buttons.component";
import BookingModal from "../../modals/booking.modal";
import { getAllBookedDates, getavailability } from "../../utilities/booking.utility";
import { useQuery } from "@tanstack/react-query";
import { capitalize1stLetterOfEachWord } from "../../helpers/text.helper";

const BookingScreen = () => {
    const [openBookingModal, setopenBookingModal] = useState<boolean>(false);
    const { data: bookedDates } = useQuery({
        queryKey: ["get-all-booked-dates"],
        queryFn: () => getAllBookedDates(),
    });

    const selectedDay = useRef(moment(new Date().getTime()).format("YYYY-MM-DD"));
    const {
        data,
        refetch: refetchAvailability,
        isLoading: isLoadingAvailability,
    } = useQuery({
        queryKey: ["get-currentDate-availabilities"],
        queryFn: () => getavailability(selectedDay.current),
    });

    return (
        <Container>
            <View>
                <Agenda
                    theme={{
                        agendaDayTextColor: colors.red,
                        agendaDayNumColor: colors.red,
                        agendaTodayColor: colors.blue,
                        agendaKnobColor: colors.white,
                        selectedDayBackgroundColor: colors.grey7,
                        selectedDayTextColor: colors.yellow,
                        textSectionTitleColor: colors.white,
                        calendarBackground: colors.black,
                        textDayFontFamily: "Poppins_300Light",
                        textDayFontSize: hp("2%"),
                        textDayFontWeight: "300",
                    }}
                    onDayPress={({ timestamp }) => {
                        selectedDay.current = moment(timestamp).format("YYYY-MM-DD");
                        refetchAvailability();
                        console.log("c", selectedDay.current);
                    }}
                    renderList={({ items }) => {
                        return (
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        titleColor={colors.yellow}
                                        refreshing={isLoadingAvailability}
                                        progressViewOffset={hp("2%")}
                                        onRefresh={refetchAvailability}
                                        colors={[colors.yellow]}
                                        tintColor={colors.yellow}
                                        title={"Refreshing..."}
                                    />
                                }
                                data={data}
                                renderItem={({ item }: any) => (
                                    <View
                                        style={{
                                            backgroundColor: colors.blue,
                                            padding: "5%",
                                            marginVertical: "5%",
                                            alignSelf: "center",
                                            width: "90%",
                                            borderRadius: 16,
                                        }}
                                    >
                                        <TextComponent color={colors.white}>{capitalize1stLetterOfEachWord(item.name)}</TextComponent>
                                        <TextComponent fontSize={hp("1.8%")} color={colors.white} fontFamily="Poppins_300Light">
                                            {item.description}
                                        </TextComponent>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                style={{
                                    backgroundColor: colors.black,
                                    height: hp("60%"),
                                }}
                            />
                        );
                    }}
                    showOnlySelectedDayItems
                    items={bookedDates}
                    showClosingKnob
                    style={{ width: wp("100%") }}
                />
                <CustButton
                    color={colors.yellow}
                    style={{ position: "absolute", alignSelf: "flex-end", top: hp("70%"), right: "5%", width: hp("7%"), height: hp("7%") }}
                    type="rounded"
                    onPress={() => setopenBookingModal(true)}
                >
                    <MaterialIcons name="add" size={hp("3.5%")} color={colors.black} />
                </CustButton>
            </View>
            <BookingModal isOpen={openBookingModal} date={selectedDay.current} closeFunc={() => setopenBookingModal(false)} />
        </Container>
    );
};

export default BookingScreen;
