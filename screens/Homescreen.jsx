import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View, BackHandler, Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';

const Homescreen = ({route}) => {
  var [user, setUser] = useState();
  const countries = [
    {
      name: 'United States',
      code: 'US',
      cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
    },
    {
      name: 'Canada',
      code: 'CA',
      cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
    },
    {
      name: 'United Kingdom',
      code: 'GB',
      cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Edinburgh'],
    },
    {
      name: 'Australia',
      code: 'AU',
      cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    },
    {
      name: 'India',
      code: 'IN',
      cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
    },
    {
      name: 'Germany',
      code: 'DE',
      cities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne'],
    },
    {
      name: 'France',
      code: 'FR',
      cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
    },
    {
      name: 'Japan',
      code: 'JP',
      cities: ['Tokyo', 'Osaka', 'Yokohama', 'Nagoya', 'Sapporo'],
    },
    {
      name: 'Brazil',
      code: 'BR',
      cities: [
        'São Paulo',
        'Rio de Janeiro',
        'Brasília',
        'Salvador',
        'Fortaleza',
      ],
    },
    {
      name: 'South Africa',
      code: 'ZA',
      cities: [
        'Johannesburg',
        'Cape Town',
        'Durban',
        'Pretoria',
        'Port Elizabeth',
      ],
    },
  ];

  useEffect(() => {
    const {userName} = route.params;
    setUser(userName);
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleNotifications = (item, index) => {

    PushNotification.cancelAllLocalNotifications();

    PushNotification.localNotification({
      channelId: 'country-channel',
      title: 'You clicked on ' + item.name,
      message: item.cities[0],
      bigText: item.cities[0] +'is the one biggest cities in the'+ item.name,
      id:index
    });

    PushNotification.localNotificationSchedule({
        channelId: 'country-channel',
        message: 'You clicked on ' + item.name + '20 seconds ago',
        title:'Alarm',
        date: new Date(Date.now() + 10*1000),
        allowWhileIdle:true,
    })
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 25, fontWeight: '800'}}>{user}</Text>
      <FlatList
        data={countries}
        contentContainerStyle={{paddingVertical: 20}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          console.log('item===>', item);
          return (
            <TouchableOpacity
              onPress={() => handleNotifications(item,index)}
              style={{
                borderRadius: 5,
                elevation: 5,
                height: 80,
                marginTop: 20,
                width: 350,
                backgroundColor: '#f5faf9',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
                {item.name}
              </Text>
              <Text style={{fontSize: 15, fontWeight: '400'}}>
                {item.cities[0]}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      {/* } */}
    </View>
  );
};
export default Homescreen;
