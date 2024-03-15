import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
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
import { deleteAvailability, getAllBookedDates, getavailability } from "../../utilities/booking.utility";
import { useQuery } from "@tanstack/react-query";
import { capitalize1stLetterOfEachWord } from "../../helpers/text.helper";

const BookingScreen = () => {
    const [openBookingModal, setopenBookingModal] = useState<boolean>(false);
    const { data: bookedDates, refetch: refreshBookedDates } = useQuery({
        queryKey: ["get-all-booked-dates"],
        queryFn: () => getAllBookedDates(),
    });
    const activeDataIndex = useRef<number>(-1);

    const selectedDay = useRef(moment(new Date().getTime()).format("YYYY-MM-DD"));
    const {
        data: availabilityData,
        refetch: refetchAvailability,
        isLoading: isLoadingAvailability,
    } = useQuery({
        queryKey: ["get-currentDate-availabilities"],
        queryFn: () => getavailability(selectedDay.current),
    });

    const refreshFunc = () => {
        refreshBookedDates();
        refetchAvailability();
    };

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
                    }}
                    renderList={({ items }) => {
                        return (
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        titleColor={colors.yellow}
                                        refreshing={isLoadingAvailability}
                                        progressViewOffset={hp("2%")}
                                        onRefresh={refreshFunc}
                                        colors={[colors.yellow]}
                                        tintColor={colors.yellow}
                                        title={"Refreshing..."}
                                    />
                                }
                                data={availabilityData}
                                renderItem={({ item, index }: any) => (
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: colors.blue,
                                            padding: "5%",
                                            marginVertical: "5%",
                                            alignSelf: "center",
                                            width: "90%",
                                            flexDirection: "row",
                                            borderRadius: 16,
                                            justifyContent: "space-between",
                                        }}
                                        onPress={() => {
                                            activeDataIndex.current = index;
                                            setopenBookingModal(true);
                                        }}
                                    >
                                        <View>
                                            <TextComponent color={colors.white}>{capitalize1stLetterOfEachWord(item.name)}</TextComponent>
                                            <TextComponent fontSize={hp("1.8%")} color={colors.white} fontFamily="Poppins_300Light">
                                                {item.description}
                                            </TextComponent>
                                        </View>
                                        <CustButton
                                            onPress={() => deleteAvailability(selectedDay.current, index).then(() => refreshFunc())}
                                            type="close"
                                            style={{ alignSelf: "flex-end" }}
                                            color={colors.white}
                                            size={hp("2%")}
                                        />
                                    </TouchableOpacity>
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
                    // showClosingKnob
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
            <BookingModal
                isOpen={openBookingModal}
                date={selectedDay.current}
                availabilityData={availabilityData && availabilityData[activeDataIndex.current]}
                closeFunc={() => {
                    activeDataIndex.current = -1;
                    setopenBookingModal(false);
                    refreshFunc();
                }}
                index={activeDataIndex.current}
            />
        </Container>
    );
};

export default BookingScreen;
