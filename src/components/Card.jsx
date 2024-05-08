import { StyleSheet, View } from "react-native";

export default function Card({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    marginTop: 10,
  },
});
