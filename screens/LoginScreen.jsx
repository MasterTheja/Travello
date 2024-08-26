import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import Input from '../components/Input';
import * as Keychain from 'react-native-keychain';
import PushNotification from 'react-native-push-notification';

export default function LoginScreen({navigation}) {
  const [userName, setUserName] = useState();
  const [userPassword, setUserPassword] = useState();
  const [credentials, setcredentials] = useState({});

  useEffect(() => {
    const gettingData = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          console.log('password:', credentials);
          setcredentials(credentials);
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.error('Error retrieving the token', error);
      }
    };

    gettingData();
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId:'country-channel',
      channelName:'Country Channel'
    })
  }

  const onChangeUserName = v => {
    console.log('value ===>', v);
    setUserName(v);
  };
  const onChangePassword = v => {
    setUserPassword(v);
  };
  const handleSubmit = () => {

    if(credentials.username == userName && credentials.password == userPassword){
      navigation.navigate('HomeScreen',{'userName':credentials.username})
    }else{
      console.log('error==>',credentials.username, '===>', userName,)
    }

  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 30,
      }}>
      <Image
        source={require('../assets/firebaseIcon.png')}
        style={{height: 120, width: 80}}
      />
      <Input
        inputStyle={{
          borderWidth: 1,
          borderColor: 'black',
          width: 250,
          marginTop: 30,
          borderRadius: 10,
        }}
        value={userName}
        secureTextEntry={false}
        onChangeText={v => onChangeUserName(v)}
        placeHolder={'User Name'}
      />
      <Input
        inputStyle={{
          borderWidth: 1,
          borderColor: 'black',
          width: 250,
          marginTop: 30,
          borderRadius: 10,
        }}
        value={userPassword}
        secureTextEntry={false}
        onChangeText={v => onChangePassword(v)}
        placeHolder={'PassWord'}
      />
      <Text style={{color: 'red', marginTop: 5}}>
        Please currect UseName and Password
      </Text>

      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={{
          elevation: 5,
          height: 50,
          width: 200,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'green',
          marginTop: 20,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', fontSize: 18}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
