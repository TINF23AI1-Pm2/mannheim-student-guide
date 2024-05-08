import { StyleSheet, ScrollView } from "react-native";
import ExampleComponent from "../components/ExampleComponent";

export default function Startpage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
