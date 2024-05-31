import { Linking, Alert, Button, View } from 'react-native';

const OpenNextbikeStation = ({ stationId, children }) => {
  const handlePress = useCallback(async () => {
    const extras = [
      { key: 'station_id', value: stationId }
    ];
    try {
      // Angenommen, 'de.nextbike.intent.action.OPEN_STATION' ist die Action, um eine Station zu öffnen.
      await Linking.sendIntent('de.nextbike.intent.action.OPEN_STATION', extras);
    } catch (e) {
      Alert.alert('Fehler', e.message);
    }
  }, [stationId]);

  return <Button title={children} onPress={handlePress} />;
};

export default function AndroidIntend() {
  return (
      <OpenNextbikeStation stationId="1234">
        Öffne Station 1234
      </OpenNextbikeStation>
  );
}