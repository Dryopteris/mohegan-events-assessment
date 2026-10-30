import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LoadingIndicator } from '@/components/ui/loading-indicator';
import { Spacing } from '@/constants/theme';
import { getEventById } from '@/services/event-service';
import { EventItem } from '@/types/event';
import { formatFullDate, getTime } from '@/utils/dateTime';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function EventDetailScreen() {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [eventItem, setEventItem] = useState<EventItem | undefined>(undefined)
    const { id } = useLocalSearchParams();
    const eventId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : null;

    if (!eventId) {
        return (
            <ThemedView>
                <ThemedText>No Event Found</ThemedText>
            </ThemedView>
        )
    }

    const loadEvent = async () => {
        try {
            const eventItem = await getEventById(eventId)
            setEventItem(eventItem)
        } catch (error) {
            console.error('Failed to retrieve event data', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadEvent();
    })

    if (!eventItem) {
        return (
            <ThemedView style={styles.container}>
                {isLoading ? (
                    <ThemedView style={styles.loading}>
                        <LoadingIndicator />
                    </ThemedView>
                ) :
                    <ThemedText>Unable to retrieve data for this event.</ThemedText>
                }
            </ThemedView>
        )
    }

    const { artist, location, startDate } = eventItem;

    const handleLocationPress = () => {
        router.push({
            pathname: '/venue-detail',
            params: {
                location
            },
        });
    };

    const dateString = formatFullDate(startDate);
    const time = getTime(startDate);

    return (
        <ThemedView style={styles.container}>
            {isLoading ? (
                <ThemedView style={styles.loading}>
                    <LoadingIndicator />
                </ThemedView>
            ) :
                <>
                    <ThemedView style={styles.headerContainer} >
                        <ThemedText style={styles.title} type="title">{artist}</ThemedText>
                    </ThemedView>
                    {location &&
                        <ThemedText
                            style={styles.subtitle}
                            type="link"
                            onPress={handleLocationPress}>at {location}
                        </ThemedText>}
                    {startDate && <ThemedText style={styles.date}>{dateString}</ThemedText>}
                    {time && <ThemedText style={styles.date}>{time}</ThemedText>}
                </>
            }
        </ThemedView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Spacing.three,
        alignItems: 'center'
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: Spacing.six,

    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'

    },
    subtitle: {
        fontSize: 28,
        textAlign: 'center'
    },
    date: {
        fontSize: 20,
        paddingVertical: Spacing.two
    },
    loading: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
});