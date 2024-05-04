import { Text, View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";
import Card from "../Card";
import useEventsInMannheim from "./useEventsInMannheim";

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
    <Card>
      {events?.map((event) => (
        <View key={`EVENT_KEY_${event.id}`}>
          <Text style={styles.subHeading}>{event.name}</Text>
          <Text>{event.description}</Text>
          <Text>{event.date}</Text>
          <Text>{event.time}</Text>
          <Text>{event.place}</Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  subHeading: {
    fontWeight: "bold",
  },
});
