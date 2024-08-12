
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PushNotification from 'react-native-push-notification';
import MapScreen from './screens/MapScreen';
import SearchScreen from './screens/SearchScreen';
import Directions from './screens/Directions';
import LandingScreen from './screens/LandingScreen';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SearchScreen' >
        <Stack.Screen name="LandingScreen" component = {LandingScreen} options = {{headerShown:false}}/>
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Directions" component={Directions} options={{headerShown: false}}/>
        <Stack.Screen name="Map View" component={MapScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;