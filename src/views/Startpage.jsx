import { StyleSheet, View, Text, ScrollView } from "react-native";
import ExampleComponent from "../components/ExampleComponent";

export default function Startpage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExampleComponent />
      {/* Lis the next components here... */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#AAA",
    padding: 10,
  },
});
