import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import useEventsInMannheim from "./useEventsInMannheim";
import EventDisplay from "./EventDisplay";

/**
 * This widget displays events in the region of mannheim
 * @returns {Component}
 */
export default function EventsInMannheim() {
  const { events, loading } = useEventsInMannheim();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      {events?.map((event) => (
        <EventDisplay event={event} key={`EVENT_KEY_${event.id}`} />
      ))}
    </ScrollView>
  );
}
