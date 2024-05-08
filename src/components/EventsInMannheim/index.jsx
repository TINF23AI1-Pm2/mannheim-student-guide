import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import Card from "../Card";
import useEventsInMannheim from "./useEventsInMannheim";
import EventDisplay from "./EventDisplay";

/**
 * This widget displays events in the region of mannheim
 * @returns {Component}
 */
export default function EventsInMannheim() {
  const { events, loading } = useEventsInMannheim();

  if (loading) {
    return (
      <Card>
        <ActivityIndicator />
      </Card>
    );
  }

  return (
    <ScrollView>
      {events?.map((event) => (
        <EventDisplay event={event} key={`EVENT_KEY_${event.id}`} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subHeading: {
    fontWeight: "bold",
  },
});
