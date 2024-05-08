import { View, Text, StyleSheet, Image } from "react-native";
import DateBlock from "./DateBlock";

/**
 * Display an event
 * @param {Object} props
 * @param {Object} props.event
 * @param {number} props.event.id
 * @param {String} props.event.name
 * @param {String} props.event.description
 * @param {String} props.event.date
 * @param {String} props.event.time
 * @param {String} props.event.place
 * @param {String} props.event.imageLink
 * @returns
 */
export default function EventDisplay(props) {
  const { event } = props;

  return (
    <View style={[styles.card, styles.shadow]}>
      {event.imageLink ? (
        <Image style={styles.img} source={{ uri: event.imageLink }} />
      ) : (
        <View style={styles.img}></View>
      )}
      <View style={styles.innerContainer}>
        <View style={{ width: "20%" }}>
          <DateBlock date={event.date} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textRow}>
            <Text style={styles.subheading}>{event.name}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.text}>{event.time}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.text}>{event.place.replace("\n", " ")}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  subheading: {
    fontWeight: "bold",
    flexWrap: "wrap",
    color: "#1e3a8a",
    flexShrink: 1,
  },
  text: {
    flexWrap: "wrap",
    color: "#1e3a8a",
    flexShrink: 1,
  },
  img: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    height: 200,
  },
  textContainer: {
    width: "80%",
  },
  innerContainer: {
    gap: 10,
    display: "flex",
    flexDirection: "row",
    padding: 30,
  },
  textRow: {
    flexDirection: "row",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
});
