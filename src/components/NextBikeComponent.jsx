import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Card from "./Card";

export default function ExampleComponent() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const maxEntries = 100;//hat glaub ich nur 100??
  const limit = 20;

  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await fetch(
          `https://mannheim.opendatasoft.com/api/explore/v2.1/catalog/datasets/free_bike_status/records?limit=${limit}&offset=${offset}`
        );
        if (!response.ok) {
          throw new Error("RIP Response motherfcker");
        }
        const jsonResponse = await response.json();
        return jsonResponse?.results;
      } catch (error) {
        setError(error.message);
        return [];
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    callApi().then((newData) => {
      setData(newData);
    });
  }, [offset]);

  const handleNext = () => {
    setOffset((prevOffset) => Math.min(prevOffset + limit, maxEntries - limit));
  };

  const handlePrevious = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#00ff00" />;//keine ahnung coolere farbe?
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={[styles.title, { marginBottom: !show ? 15 : 0 }]}
          onPress={() => setShow(!show)}
        >
          Nextbike Stationen:
        </Text>
      </View>
      {show && (
        <ScrollView contentContainerStyle={{ paddingBottom: 35 }}>
          {data.map((element, index) => (
            <Card key={index} style={styles.dataElement}>
              <Text style={styles.text}>Standort: {element.name}</Text>
              <Text>Ausleihbare Bikes: {element.bikes_available_to_rent ? element.bikes_available_to_rent : 0}</Text>
            </Card>
          ))}
          <View style={styles.buttonContainer}>
            <Button
              title="Backshots"
              onPress={handlePrevious}
              disabled={offset === 0}
            />
            <Button
              title="Frontkicks"
              onPress={handleNext}
              disabled={offset >= maxEntries - limit}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: "100%",
    backgroundColor: "#004999",
    borderRadius: 20,
    marginTop: 5,
    padding: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dataElement: {
    marginTop: 5,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  text: {
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 16,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
});
