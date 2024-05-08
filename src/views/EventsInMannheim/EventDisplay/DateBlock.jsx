import { View, Text, StyleSheet } from "react-native";
import { getMonthDisplay, parseToDate } from "../helper";

/**
 * Displays a given date as an block
 * @param {Object} props
 * @param {String} props.date
 * @returns {Component}
 */
export default function DateBlock(props) {
  const { date: dateString } = props;
  const date = parseToDate(dateString);

  return (
    <View style={styles.container}>
      <Text style={styles.month}>{getMonthDisplay(date)}</Text>
      <Text style={styles.day}>{date.getDate()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#93c5fd",
  },
  month: {
    color: "#1e3a8a",
    fontSize: 20,
  },
  day: {
    color: "#1e3a8a",
    fontSize: 30,
  },
});
