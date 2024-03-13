import { FlatList, View } from "react-native";
import Container from "../../components/Containers.component";
import TextComponent from "../../components/Text.component";
import { Agenda } from "react-native-calendars";
import colors from "../../constants/colors.constant";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import moment from "moment";
import { useState } from "react";

const BookingScreen = () => {
    const [selectedDay, setselectedDay] = useState(moment(new Date().getTime()).format("YYYY-MM-DD"));
    const appointments = {
        "2024-03-11": [
            {
                name: "Hair Dressing Appointment",
                height: 50,
                day: "2024-03-11",
                description: "Discuss project requirements and timelines.",
            },
            {
                name: "Meeting with Client",
                height: 50,
                day: "2024-03-11",
                description: "Discuss project requirements and timelines.",
            },
        ],

        "2024-03-12": [
            {
                name: "Team Standup",
                height: 50,
                day: "2024-03-12",
                description: "Catch up with the team on project progress.",
            },

            {
                name: "Team Standup",
                height: 50,
                day: "2024-03-12",
                description: "Catch up with the team on project progress.",
            },
        ],

        "2024-03-13": [
            {
                name: "Team Standup",
                height: 50,
                day: "2024-03-13",
                description: "Catch up with the team on project progress.",
            },
        ],
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
                        setselectedDay(moment(timestamp).format("YYYY-MM-DD"));
                    }}
                    renderList={({ items }) => {
                        return (
                            <FlatList
                                data={items ? items[moment(selectedDay).format("YYYY-MM-DD")] : []}
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            backgroundColor: colors.yellow,
                                            padding: "5%",
                                            marginVertical: "5%",
                                            alignSelf: "center",
                                            width: "90%",
                                            borderRadius: 16,
                                        }}
                                    >
                                        <TextComponent color={colors.white}>{item.name}</TextComponent>
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
                    items={appointments}
                    showClosingKnob
                    style={{ width: wp("100%") }}
                />
            </View>
        </Container>
    );
};

export default BookingScreen;
