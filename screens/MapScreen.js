// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //
import * as React from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useState} from 'react';

const MapScreen = ({route, navigation}) => {
  //   const [coords, setCoords] = React.useState({
  //     startingPoints: {
  //       latitude: 17.366,
  //       longitude: 78.476,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     },
  //     endPoints: {
  //       latitude: 15.834536,
  //       longitude: 78.029366,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     },
  //   });

  const [coords, setCoords] = useState();
  const [destination, setDestination] = useState();
  const [distance, setDistance] = useState();
  React.useEffect(() => {
    const {coords, destination} = route.params;
    setCoords(coords);
    setDestination(destination);
    moveToLocation(coords);
    moveToLocation(destination);
  });

  const mapRef = React.useRef();

  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const moveToLocation = async (latitude, longitude) => {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      2000,
    );
  };

  //   const ApiKey = 'AIzaSyD59fFQRuICNvhlyx1RfuM3kiBWRJgchFM';
  const ApiKey = 'AIzaSyAAdnoL9ZLaHUAZQ0z1QDjgQWXJCkFlCuE';

  const distanceGetting = () => {
    return (
      <>
        <View style={styles.searchContainer}>
          <Text
            style={{
              fontWeight: 800,
              fontSize: 20,
            }}>{`Distance: ${distance.toFixed(2)} km`}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#6c42f5',
              width: '60%',
              height: '40%',
              marginTop: 10,
              borderRadius: 5,
              elevation: 5
            }}>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 15,
                color: 'white',
              }}>
              Enter Details Again
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {coords && <Marker coordinate={coords} />}
        {destination && <Marker coordinate={destination} />}
        <MapViewDirections
          origin={coords}
          destination={destination}
          apikey={ApiKey}
          strokeWidth={5}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onReady={result => {
            console.log(`Distance: ${result.distance} km`);
            console.log(`Duration: ${result.duration} min.`);
            setTimeout(() => {
              setDistance(result.distance);
            }, 2000);
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 300,
                left: 30,
                top: 100,
              },
            });
          }}
        />
      </MapView>
      {distance && distanceGetting()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  searchContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderRadius: 10,
    height: 100,
    marginHorizontal: 40,
    marginTop: 5,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  searchDestinationContainer: {
    zIndex: 1,
    flex: 0.5,
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export default MapScreen;
