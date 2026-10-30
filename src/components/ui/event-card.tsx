import { EventItem } from "@/types/event";
import { toDayAndDate } from "@/utils/dateTime";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function EventCard({ item }: { item: EventItem }) {
    const { day, shortDate, time } = toDayAndDate(item.startDate)
    
    const handleButtonPress = () => {
        router.push({
            pathname: '/event-detail',
            params: {
                id: item.id
            },
        });
    };

    const handleLocationPress = () => {
        router.push({
            pathname: '/venue-detail',
            params: {
                location: item.location
            },
        });
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <DateContainer day={day} shortDate={shortDate} displayType={item.displayType} />
                <Text style={styles.displayType}>{item.displayType}</Text>
            </View>
            <View style={styles.eventDetails}>
                <Text style={styles.eventName}>{item.title}</Text>
                <View style={styles.placeTime}>
                    <Text style={styles.time}>{time}</Text>
                    {item.location && <Text style={styles.time}> at </Text>}
                    {item.location && <Text style={styles.place} onPress={handleLocationPress}>{item.location}</Text>}
                </View>
            </View>
            <Pressable onPress={handleButtonPress} style={styles.button}>
                <Text style={styles.buttonText}>Learn More</Text>
            </Pressable>
        </View>
    )
}

function DateContainer({ day, shortDate, displayType }: { day: string, shortDate: string, displayType: string }) {

    const backgroundColor = displayType == 'Promo' ? '#263a65' : '#372343'
    return (
        <View style={[styles.dateContainer, { backgroundColor }]}>
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.dateText}>{shortDate}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
        width: '100%',
    },
    cardHeader: {
        flexDirection: 'row',
        width: '100%'
    },
    dateContainer: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    dayText: {
        color: '#FFFFFF',
        fontSize: 12,
        lineHeight: 12
    },
    dateText: {
        color: '#FFFFFF',
        fontSize: 18,
        lineHeight: 20
    },
    displayType: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
        fontSize: 18
    },
    eventDetails: {
        paddingLeft: 12,
        paddingRight: 8,
    },
    eventName: {
        color: '#000000',
        fontSize: 20,
        paddingTop: 4,
        paddingBottom: 8
    },
    placeTime: {
        flexDirection: 'row',
        paddingBottom: 12
    },
    time: {
        fontSize: 16,
        textTransform: 'lowercase'
    },
    place: {
        fontSize: 16,
        color: '#8a4488',
    },
    button: {
        backgroundColor: '#8a4488',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 12,
        borderRadius: 24,
    },
    buttonText: {
        textTransform: 'uppercase',
        fontSize: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        color: '#FFFFFF'
    }
})