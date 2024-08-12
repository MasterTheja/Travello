import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, SafeAreaView, Dimensions, ScrollView} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
// import {getCurrentLocation} from './helper/helperFunction';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_PLACES_API_KEY = 'AIzaSyAAdnoL9ZLaHUAZQ0z1QDjgQWXJCkFlCuE';


const Directions = () => {
  const mapRef = useRef();
  const [coord, setCoord] = useState({
    
              latitude: 17.366,
              longitude: 78.476,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
  });

  const [destination, setDestination] = useState();

  const onPressStartingAddress = details => {
    setCoord({
      latitude: details?.geometry?.location.lat,
      longitude: details?.geometry?.location.lng,
    });
    // moveToLocation(
    //   details?.geometry?.location.lat,
    //   details?.geometry?.location.lng,
    // );
  };

  const onPressAddress = details => {
    setDestination({
      latitude: details?.geometry?.location.lat,
      longitude: details?.geometry?.location.lng,
    });
    moveToLocation(
      details?.geometry?.location.lat,
      details?.geometry?.location.lng,
    );
  };

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

//   const getLiveLocation = async () => {
//     const {latitude, longitude} = await getCurrentLocation();
//     setCoord({
//       latitude: latitude,
//       longitude: longitude,
//       latitudeDelta: LATITUDE_DELTA,
//       longitudeDelta: LONGITUDE_DELTA,
//     });
//   };

//   useEffect(() => {
//     getLiveLocation();
//   }, []);



  return (
    <SafeAreaView style={styles.container}>
    <ScrollView keyboardShouldPersistTaps='handled' nestedScrollEnabled={true} style={styles.searchContainer} >

      <View style={styles.searchStartingContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              onPressStartingAddress(details);
            }}
            query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en',
            }}
            />
      </View>
      <View style={styles.searchDestinationContainer}>
        <GooglePlacesAutocomplete
          placeholder="Destination"
          fetchDetails={true}
          onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
            onPressAddress(details);
        }}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'en',
        }}
        />
      </View>
      </ScrollView>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={coord}>
        {coord !== undefined && (
          <Marker coordinate={coord}/>
        )}
        {destination !== undefined && (
          <Marker coordinate={destination}/>
        )}
        {coord != undefined && destination != undefined ? (
          <MapViewDirections
            origin={coord}
            destination={destination}
            apikey={GOOGLE_PLACES_API_KEY}
            strokeColor="hotpink"
            strokeWidth={4}
            onReady={(result) => {
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
        ) : null}
      </MapView>
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
    zIndex: 1,
    //flex: 0.5,
    // marginBottom: 10,
    // marginTop: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  searchStartingContainer: {
    zIndex: 1,
    //flex: 0.5,
    // marginBottom: 10,
    // marginTop: 10,
    // borderWidth: 0.5,
    // borderCurve: 5,
    // borderColor: 'black',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  searchDestinationContainer: {
    zIndex: 1,
    //flex: 0.5,
    //padding: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    //marginTop: 10,
  },
});

export default Directions;