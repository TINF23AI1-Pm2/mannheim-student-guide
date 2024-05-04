import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

export default function ExampleComponent() {
  const [data, setData] = useState();

  useEffect(() => {
    const callApi = async () => {
      const req = await fetch(
        "https://mannheim.opendatasoft.com/api/explore/v2.1/catalog/datasets/standorte_hts_gesamt/records?limit=20"
      );
      const data = await req.json();
      return data?.results;
    };
    callApi().then((newData) => setData(newData));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hundekottütenspender</Text>
      {data?.map((element) => (
        <View style={styles.dataElement} key={`HUNDEKOTTÜTENSPENDER_KEY_${element.standort}`}>
          <Text style={styles.text}>Standort: {element.standort}</Text>
          <Text>Koordinaten:</Text>
          <Text>lon: {element.koordinaten.lon}</Text>
          <Text>lat: {element.koordinaten.lat}</Text>
        </View>
      ))}
      <Text>Example Component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    marginTop: 5,
    padding: 5,
  },
  dataElement: {
    marginTop: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  text: {
    fontWeight: 'bold'
  }
});
