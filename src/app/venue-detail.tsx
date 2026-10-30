import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function VenueDetailScreen() {
    const { location } = useLocalSearchParams();
    const locationName = typeof location === 'string' ? location : Array.isArray(location) ? location[0] : null;

    if (!locationName) {
        return (
            <ThemedView>
                <ThemedText>No Venue Found</ThemedText>
            </ThemedView>
        )
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerContainer} >
                <ThemedText type="subtitle">{locationName}</ThemedText>
            </ThemedView>
            {location &&<ThemedText type="subtitle">This is a stub for the {location} details screen. Check back later for upcoming events and specials!</ThemedText>}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Spacing.three,
    },
    headerContainer: {
        alignSelf: 'center',
        paddingVertical: Spacing.six,
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,

    },
    subtitle: {
        fontSize: 16,
    },
});