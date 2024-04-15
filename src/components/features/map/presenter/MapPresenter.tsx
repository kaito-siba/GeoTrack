import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Coords } from "../types";

export type MapPresenterProps = {
  isError: boolean;
  currentCoords: Coords | null;
  coordsHistory: Coords[];
};

const MapPresenter: React.FC<MapPresenterProps> = (props) => {
  const { isError, currentCoords, coordsHistory } = props;

  return (
    <View style={styles.container}>
      {currentCoords === null ? (
        <Text>Loading...</Text>
      ) : isError ? (
        <Text>Error...</Text>
      ) : (
        <>
          <MapView
            style={styles.map}
            region={{
              ...currentCoords,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={currentCoords}
              title="You are here"
              description="This is your current location"
            />
            <Polyline
              coordinates={coordsHistory}
              strokeColor="#000"
              strokeWidth={2}
            />
          </MapView>
        </>
      )}
    </View>
  );
};
export default MapPresenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
