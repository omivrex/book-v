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
                    testID="calendar-container"
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
                                testID="rener-list"
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
                                    <RenderItem availabilityData={item} index={index} refreshFunc={refreshFunc} selectedDay={selectedDay.current} />
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
            </View>
            <AddButn selectedDay={selectedDay.current} activeDataIndex={activeDataIndex.current} refreshFunc={refreshFunc} />
        </Container>
    );
};

export const RenderItem = ({
    selectedDay,
    refreshFunc,
    index,
    availabilityData,
}: {
    selectedDay: string;
    refreshFunc: () => void;
    index: number;
    availabilityData: Availability;
}) => {
    const [openBookingModal, setopenBookingModal] = useState<boolean>(false);
    return (
        <>
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
                    setopenBookingModal(true);
                }}
                testID="render-item"
            >
                <View>
                    <TextComponent color={colors.white}>{capitalize1stLetterOfEachWord(availabilityData.name)}</TextComponent>
                    <TextComponent fontSize={hp("1.8%")} color={colors.white} fontFamily="Poppins_300Light">
                        {availabilityData.description}
                    </TextComponent>
                </View>
                <CustButton
                    onPress={() => deleteAvailability(selectedDay, index).then(() => refreshFunc())}
                    type="close"
                    style={{ alignSelf: "flex-end" }}
                    color={colors.white}
                    size={hp("2%")}
                    testID="close-button"
                />
            </TouchableOpacity>
            {openBookingModal && (
                <BookingModal
                    isOpen={true}
                    date={selectedDay}
                    availabilityData={availabilityData}
                    closeFunc={() => {
                        setopenBookingModal(false);
                        refreshFunc();
                    }}
                    testID="booking-modal"
                    index={index}
                />
            )}
        </>
    );
};

export const AddButn = ({ selectedDay, refreshFunc, activeDataIndex }: { selectedDay: string; refreshFunc: () => void; activeDataIndex: number }) => {
    const [openBookingModal, setopenBookingModal] = useState<boolean>(false);

    useEffect(() => {}, [activeDataIndex]);

    return (
        <>
            <CustButton
                color={colors.yellow}
                style={{ position: "absolute", alignSelf: "flex-end", top: hp("80%"), right: "5%", width: hp("7%"), height: hp("7%") }}
                type="rounded"
                testID="add-button"
                onPress={() => setopenBookingModal(true)}
            >
                <MaterialIcons name="add" size={hp("3.5%")} color={colors.black} />
            </CustButton>
            <View testID="booking-modal">
                <BookingModal
                    isOpen={openBookingModal}
                    date={selectedDay}
                    closeFunc={() => {
                        activeDataIndex = -1;
                        setopenBookingModal(false);
                        refreshFunc();
                    }}
                    index={-1}
                />
            </View>
        </>
    );
};

export default BookingScreen;
