import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const SearchConcert = ({navigation}) => {
  const [concertName, setConcertName] = useState('');
  const [loading, setLoading] = useState(true);
  const [resultArr, setResultArr] = useState([]);

  const fetchData = () => {
    firestore()
      .collection('concerts')
      .where('concertSeason', '==', concertName)
      .get()
      .then(querySnapshot => {
        const results = [];
        console.log('Total concerts: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          results.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
          
          setResultArr(results);
          console.log(results)
          setLoading(false);
        });
      });
  };

  const renderItem = ({item}) =>{
    return (
      <TouchableOpacity
        onPress={() => {
         
          navigation.navigate('Map', {
            concertLat: item.concertLatitude,
            concertLong: item.concertLongitude,
            concertName: item.concertName,
          });
        }}>
        <View style={styles.itemsStyle}>
          <Text>Concert Name: {item.concertName}</Text>
          <Text>Concert Name: {item.concertLocation}</Text>
          <Text>Concert Name: {item.concertSeason}</Text>
          <Text>Concert Name: {item.concertDate}</Text>
          <Image style={styles.poster} source={{uri: item.concertPoster}} />
        </View>
      </TouchableOpacity>
    );   
 
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.root}>
      <Text style={styles.textStyle}>Search for upcoming concerts!</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setConcertName}
        value={concertName}
        placeholder="Enter season"
      />
      <Pressable style={styles.searchBtn} onPress={fetchData}>
        <Text style={styles.textStyle}>Search Concert</Text>
      </Pressable>
      <FlatList
        data={resultArr}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SearchConcert;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  headText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    color: 'black',
  },
  searchBtn: {
    width: 200,
    height: 40,
    borderRadius: 5,
    fontSize: 10,
    alignSelf: 'center',
    padding: 5,
    backgroundColor: '#34ebe5',
  },
  itemsStyle: {
    height: 130,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  textInput: {
    marginVertical: 2,
    width: '80%',
    borderWidth: 1,
    borderColor: '#34ebe5',
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
  },
  poster:{
    width: 50, 
    height: 50
  }
});

/*


            */