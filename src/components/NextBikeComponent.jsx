import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
  Modal,
  StatusBar
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
      // console.log("calling api");
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
    return <ActivityIndicator size="large" color={COLORS.loading} />;//keine ahnung coolere farbe?
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          Sorry, mate :c
          Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={[styles.title, { marginBottom: !show ? 35 : 0 }]} // TODO: at the bottom cut :c
          onPress={() => setShow(true)}
        >
          Nextbike Stationen:
        </Text>
      </View>
      {/* {show && ( */}
      <Modal
      animationType="fade"
      visible={show}
      style={styles.modal}
      statusBarTranslucent = {false}
      >
      <StatusBar
        animated={true}
        backgroundColor={COLORS.nextbike}
        barStyle="default"
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <View style={styles.titleContainer}>
        <Text
          style={styles.title}
        >
          Nextbike Stationen:
        </Text>
      </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 35 }}>
          {data.map((element, index) => (
            <Card key={index} style={styles.dataElement}>
              <Text style={styles.listTxt}>Standort: {element.name}</Text>
              <Text>Ausleihbare Bikes: {element.bikes_available_to_rent ? element.bikes_available_to_rent : 0}</Text>
            </Card>
          ))}
        </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              title="<--Tom"
              onPress={handlePrevious}
              disabled={offset === 0}
              color={COLORS.nextbike}
              />
              <Button
                title="Exit"
                onPress={() => setShow(false)}
                color="red"
                />
            <Button
              title="my-->"
              onPress={handleNext}
              disabled={offset >= maxEntries - limit}
              color={COLORS.nextbike}
              />
          </View>
              </Modal>
      {/* // )} */}
    </View>
  );
}

const COLORS = {
  nextbike: "#004999",
  loading: "#0f0f00"
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    // height: "100%",
    backgroundColor: "white",
  },
  container: {
    width: "100%",
    // height: "100%",
    // backgroundColor: "#004999",
    backgroundColor: COLORS.nextbike,
    borderRadius: 20,
    marginTop: 5,
    padding: 5,
  },
  titleContainer: {
    backgroundColor: COLORS.nextbike,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  dataElement: {
    marginTop: 5,
  },
  listTxt: {
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
