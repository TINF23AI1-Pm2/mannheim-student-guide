import { StyleSheet, View, Text, ScrollView } from "react-native";
import ExampleComponent from "../components/ExampleComponent";

export default function Startpage() {
  return (
    <ScrollView style={styles.container}>
      <ExampleComponent />
      {/* Lis the next components here... */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AAA",
    padding: 10,
    paddingTop: 40,
    borderRadius: 5,
  },
});
