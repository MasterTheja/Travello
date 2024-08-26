
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PushNotification from 'react-native-push-notification';
import MapScreen from './screens/MapScreen';
import SearchScreen from './screens/SearchScreen';
import Directions from './screens/Directions';
import LoginScreen from './screens/LoginScreen';
import * as Keychain from 'react-native-keychain';
import Homescreen from './screens/Homescreen';

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
      const setUp = async () => {
        try {
          const username = 'theja';
          const password = '12345';
          await Keychain.setGenericPassword(username, password);
          console.log('Token stored successfully');
        } catch (error) {
          console.error('Error storing the token', error);
        }
      };
  
      setUp();
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen' >
        <Stack.Screen name="LoginScreen" component = {LoginScreen} options = {{headerShown:false}}/>
        <Stack.Screen name= "HomeScreen" component = {Homescreen} options = {{headerShown:false}}/>
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Directions" component={Directions} options={{headerShown: false}}/>
        <Stack.Screen name="Map View" component={MapScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;