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
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';

export default function LandingScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          width: '60%',
          top: 72,
          left: 24,
          fontWeight: 800,
          fontSize: 34,
          color: '#FFFFFF',
        }}>
        Soo
      </Text>
      <Text
        style={{
          width: '60%',
          top: 72,
          left: 24,
          fontWeight: 800,
          fontSize: 34,
          color: '#FFFFFF',
        }}>
        and Carrots
      </Text>
      <LinearGradient
        colors={['#16171800', '#161718']}
        style={{positn: 'absolute', top: '50%', flex: 0.5}}>
        <TouchableOpacity
          styles={{height: 20, width: 100, backgroundColor: 'red'}}>
          <Text style={styles.buttonText}>Sign in with Facebook</Text>
        </TouchableOpacity>
      </LinearGradient>
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
