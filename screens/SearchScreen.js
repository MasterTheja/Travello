import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GMAPS_KEY} from '@env'

export default function SearchScreen({navigation}) {
  const [coords, setCoords] = useState();
  const [destination, setDestination] = useState();
const [warning, setWarning] = useState();

  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const onPressAddress = details => {
    setCoords({
      latitude: details?.geometry?.location.lat,
      longitude: details?.geometry?.location.lng,
    });
    // moveToLocation(
    //   details?.geometry?.location.lat,
    //   details?.geometry?.location.lng,
    // );
  };

  const onPressDestinationAddress = details => {
    setDestination({
      latitude: details?.geometry?.location.lat,
      longitude: details?.geometry?.location.lng,
    });
    // moveToLocation(
    //   details?.geometry?.location.lat,
    //   details?.geometry?.location.lng,
    // );
  };
  // const ApiKey = 'AIzaSyAAdnoL9ZLaHUAZQ0z1QDjgQWXJCkFlCuE';
  // const ApiKey = GMAPS_KEY;
  console.log('ApiKey==>',GMAPS_KEY)
  const navToMap = () => {
    if(!coords ){
        setWarning('Please Enter the Source Location ')
    }else if(!destination){
        setWarning('Please Enter the Destination Location ')
    }else{
        setWarning('')
        setCoords('')
        setDestination('')
        navigation.navigate('Map View',{
            'coords':coords,
            'destination':destination
        })
    }
  }
  return (
    <View style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps='always'
        nestedScrollEnabled={true}
        style={styles.searchContainer}>
        <Text style={{fontWeight: 800, fontSize: 20, marginBottom: 10}}>
          Enter Locations
        </Text>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Source"
            fetchDetails={true}
            onPress={(data, details = null) => {
              onPressAddress(details);
            }}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no Source results found')}
            query={{
              key: GMAPS_KEY,
              language: 'en',
            }}
          />
        </View>
        <View style={{margin: 5}} />
        <View>
          <GooglePlacesAutocomplete
            placeholder="Destination"
            fetchDetails={true}
            onPress={(data, details = null) => {
              onPressDestinationAddress(details);
            }}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no Destination results found')}
            query={{
              key: GMAPS_KEY,
              language: 'en',
            }}
          />
        </View>
        <TouchableOpacity
        onPress={()=> navToMap()}
          style={{
            borderRadius: 7,
            marginTop: 15,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: 150,
            height: 40,
            // borderColor: 'black',
            backgroundColor: '#6c42f5',
            // borderWidth: 0.5,
            elevation:5,
          
          }}>
          <Text style={{color: 'white',fontSize:15,fontWeight:500,paddingHorizontal:5}}>Get the Distance</Text>
        </TouchableOpacity>
        {
            warning && <Text style={{color:'red',fontSize:20,textAlign:'center',marginTop:10}}>{warning}</Text>
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    zIndex: 1,
    flex: 0.5,
    marginHorizontal: 10,
    marginVertical: 5,
    // backgroundColor: 'red',
    paddingTop: '30%',
  },
  searchDestinationContainer: {
    zIndex: 1,
    flex: 0.5,
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
