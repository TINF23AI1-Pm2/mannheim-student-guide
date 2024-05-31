import React, { useEffect, useState , useCallback} from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
  Modal,
  StatusBar,
  Linking,
  Alert,
} from "react-native";
import Card from "./Card";
import * as Location from "expo-location";

export default function ExampleComponent() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const limit = 6;

  const OpenNextbikeStation = ({ stationId, children }) => {
    const handlePress = useCallback(async () => {
      const extras = [
        { key: 'station_id', value: stationId }
      ];
      try {
        // Angenommen, 'de.nextbike.intent.action.OPEN_STATION' ist die Action, um eine Station zu öffnen.
        // await Linking.sendIntent('de.nextbike.intent.action.OPEN_STATION', extras);
        await Linking.sendIntent('de.nextbike');
      } catch (e) {
        Alert.alert('Fehler', e.message);
      }
    }, [stationId]);
  
    return <Button title={children} onPress={handlePress} />;
  };

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission to your mom luk not granted");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (location) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            // select=*%2C%20distance(geopunkt%2C%20GEOM'POINT(8.457751%2049.497225)')%20AS%20dist&where=bikes_available_to_rent%20IS%20NOT%20NULL&order_by=dist%20ASC&limit=3
            `https://mannheim.opendatasoft.com/api/explore/v2.1/catalog/datasets/free_bike_status/records?
          &select=*%2C%20distance(geopunkt%2C%20GEOM%27POINT(${location.longitude}%20${location.latitude})%27)%20AS%20dist&where=bikes_available_to_rent%20IS%20NOT%20NULL&order_by=dist%20ASC&limit=${limit}`
          );
          if (!response.ok) {
            throw new Error("RIP Response motherfcker");
          }
          const data = await response.json();
          setData(data?.results);
        } catch (error) {
          setError(error.message);
          return [];
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [location]);

  if (isLoading) {
    return <ActivityIndicator size="large" color={COLORS.loading} />; //keine ahnung coolere farbe?
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Sorry, mate :c Error: {error}</Text>
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
          Nearest Nextbikes:
        </Text>
      </View>
      <Modal
        animationType="fade"
        visible={show}
        style={styles.modal}
        statusBarTranslucent={false}
      >
        <StatusBar
          animated={true}
          backgroundColor={COLORS.nextbike}
          barStyle="default"
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Nearest Nextbikes:</Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 35 }}>
          {data.map((element, index) => (
            <Card key={index} style={styles.dataElement}>
              <Text style={styles.listTxt}>Standort: {element.name}</Text>
              <Text>
                Ausleihbare Bikes:{" "}
                {element.bikes_available_to_rent
                  ? element.bikes_available_to_rent
                  : 0}
              </Text>
            </Card>
          ))}
          <OpenNextbikeStation stationId="1234">
            Öffne Station 1234
          </OpenNextbikeStation>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button title="Exit" onPress={() => setShow(false)} color="red" />
        </View>
      </Modal>
      {/* // )} */}
    </View>
  );
}

const COLORS = {
  nextbike: "#004999",
  loading: "#0f0f00",
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    width: "100%",
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
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
