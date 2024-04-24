import { View, Text, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react";
import Card from "./Card";

export default function ExampleComponent() {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const callApi = async () => {
      const req = await fetch(
        "https://mannheim.opendatasoft.com/api/explore/v2.1/catalog/datasets/free_bike_status/records?limit=20"
      );
      const data = await req.json();
      return data?.results;
    };
    callApi().then((newData) => setData(newData));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}  onPress={() => setShow(!show)}>Nextbike Stationen:</Text>
      {}
      {
        show &&
      data?.map((element) => (
        <Card style={styles.dataElement}>
          <Text style={styles.text}>Standort: {element.name}</Text>
          <Text>Ausleihbare Bikes: {element.bikes_available_to_rent}</Text>
          {/* <Text>lon: {element.koordinaten.lon}</Text> */}
          {/* <Text>lat: {element.koordinaten.lat}</Text> */}
        </Card>
      ))}
      <Text>Example Component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "500px",
    backgroundColor: "#004999",
    borderRadius: 20,
    marginTop: 5,
    padding: 5,
  },
  dataElement: {
    marginTop: 5,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: 'bold'
  },
  text: {
    fontWeight: 'bold'
  }
});
