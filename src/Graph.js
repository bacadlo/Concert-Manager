import {StyleSheet, Text, View, Pressable, } from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import { useState } from 'react/cjs/react.production.min';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const Graph = ({ navigation, route}) => {
  const {concertLat, concertLong, concertName} = route.params;
   const lat = Number(concertLat);
   const long = Number(concertLong);
  /*const [region, setRegion] = useState({
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });*/


  
 
  console.log('====================================');
  console.log(concertLat, concertLong);
  console.log('====================================');
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{concertName} Concert Location</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
       >
        <Marker
          coordinate={{
            latitude: lat,
            longitude: long,
          }}
        />
      </MapView>
      <Pressable
        style={styles.backBtn}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.btnTxt}>Back</Text>
      </Pressable>
    </View>
  );
};

export default Graph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    height: 550,
    width: 400,
  },
  nameText: {
    fontSize: 25,
    fontStyle: 'italic',
    color:'black',
  },
  backBtn: {
    width: 100,
    height: 40,
    fontSize: 15,
    alignSelf: 'center',
    padding: 5,
    backgroundColor: '#34ebe5',
    borderRadius: 5,
  },
  btnTxt:{
    fontSize:15,
    textAlign: 'center'
  }
});
