import { StyleSheet, View, Text, ScrollView } from "react-native";
import ExampleComponent from "../components/ExampleComponent";
import EventsInMannheim from "../components/EventsInMannheim";

export default function Startpage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <EventsInMannheim />
      <ExampleComponent />
      {/* List the next components here... */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#AAA",
    padding: 10,
  },
});
