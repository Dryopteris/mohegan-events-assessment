import { FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { EventCard } from '@/components/ui/event-card';
import { LoadingIndicator } from '@/components/ui/loading-indicator';
import { Picker } from '@/components/ui/picker';
import { Spacing } from '@/constants/theme';
import { getEventDataResponse } from '@/services/event-service';
import { EventItem } from '@/types/event';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [events, setEvents] = useState<EventItem[]>([])
  const [venueFilter, setVenueFilter] = useState<string | undefined>()
  const [typeFilter, setTypeFilter] = useState<string | undefined>()
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>()

  const loadEvents = async () => {
    try {
      const data = await getEventDataResponse();
      setEvents(data.events)
    } catch (error) {
      console.error('Failed to load events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadEvents();
  }, [])

  const clearFilters = () => {
    setVenueFilter(undefined);
    setTypeFilter(undefined);
    setCategoryFilter(undefined);
  }

  const allVenues: string[] = getKeysBy(events, 'mohegansun:venue/');
  const allTypes: string[] = getKeysBy(events, 'mohegansun:event/entertaintment/');;
  const allCategories: string[] = getKeysBy(events, 'mohegansun:promotions/');;

  const filteredEvents = events.filter(eventItem => {
    const matchesVenue = !venueFilter
      || eventItem.cqTags
        .some(tag => tag.key.startsWith('mohegansun:venue/')
          && tag.value === venueFilter)

    const matchesType = !typeFilter
      || eventItem.cqTags
        .some(tag => tag.key.startsWith('mohegansun:event/entertaintment/')
          && tag.value === typeFilter)

    const matchesCategory = !categoryFilter
      || eventItem.cqTags
        .some(tag => tag.key.startsWith('mohegansun:promotions/')
          && tag.value === categoryFilter)

    return matchesVenue && matchesType && matchesCategory
  })

  const eventsCount = filteredEvents.filter(eventItem => eventItem.displayType === 'Event').length
  const promosCount = filteredEvents.filter(eventItem => eventItem.displayType === 'Promo').length

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {isLoading ? (
          <ThemedView style={styles.loading}>
            <LoadingIndicator />
          </ThemedView>
        ) :
          <>
            <ThemedView style={styles.logoContainer}>
              <Image source={require('@/assets/images/mohegan-sun-logo.png')} />
            </ThemedView>

            <ThemedView style={styles.content}>
              <ThemedText style={styles.title}>
                Schedule of events
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                at Mohegan Sun
              </ThemedText>

              <ThemedView style={styles.filterContainer} >
                <Collapsible title={`${eventsCount} Events and ${promosCount} Promos`}>
                  <ThemedView style={styles.filters} >
                    <Picker defaultValue={"All Venues"} currentValue={venueFilter} choices={allVenues} onSelect={setVenueFilter} />
                    <Picker defaultValue="All Types" currentValue={typeFilter} choices={allTypes} onSelect={setTypeFilter} />
                    <Picker defaultValue="All Categories" currentValue={categoryFilter} choices={allCategories} onSelect={setCategoryFilter} />
                  </ThemedView>
                </Collapsible>
              </ThemedView>

              <FlatList
                style={[styles.listView]}
                data={filteredEvents}
                ListEmptyComponent={() => {
                  return (
                    <ThemedView style={styles.emptyList}>
                      <ThemedText style={styles.emptyListText} type='subtitle'>No events found. Try adjusting the filters.</ThemedText>
                      <Pressable style={styles.clearFilters} onPress={clearFilters}><ThemedText>Clear Filters</ThemedText></Pressable>
                    </ThemedView>
                  )
                }}
                renderItem={({ item }) => {
                  return <EventCard item={item} />
                }}
                ItemSeparatorComponent={() => {
                  return <ThemedView style={{ height: 8 }} />
                }}
              />
            </ThemedView>
          </>
        }
      </SafeAreaView>
    </ThemedView>
  )
}

function getKeysBy(events: EventItem[], identifier: string): string[] {
  const venues = events.flatMap(event =>
    event.cqTags
      .filter(tag => tag.key.startsWith(identifier))
      .map(tag => tag.value)
  );

  return Array.from(new Set(venues));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8a4488',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.three,
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 28,
    paddingVertical: Spacing.three
  },
  subtitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 18
  },
  filterContainer: {
    borderRadius: 15,
    width: '100%',
    zIndex: 1000,
    overflow: 'visible',
    elevation: 10,
    marginVertical: Spacing.two
  },
  filters: {
    width: '100%',
    backgroundColor: '#372343',
    gap: Spacing.three,
    zIndex: 1000,
    overflow: 'visible',
    elevation: 10
  },
  listView: {
    flex: 1,
    width: '100%'
  },
  emptyList: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyListText: {
    textAlign: 'center'
  },
  clearFilters: {
    borderWidth: 2,
    borderColor: '#f187ef',
    borderRadius: 20,
    marginTop: Spacing.three,
    paddingHorizontal: Spacing.four
  },
  loading: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
