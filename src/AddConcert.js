import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  SafeAreaView,

} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

const AddConcert = () => {
  const [concertName, setConcertName] = useState('');
  const [concertLocation, setConcertLocation] = useState('');
  const [concertSeason, setConcertSeason] = useState('');
  const [concertDate, setConcertDate] = useState('');
  const [concertLongitude, setConcertLongitude] = useState('');
  const [concertLatitude, setConcertLatitude] = useState('');
  const [concertPoster, setConcertPoster] = useState('');
  
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const navigation = useNavigation();

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false ,
      saveToPhotos: true,
      maxHeight: 256,
      maxWidth: 256,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else if (response.assets[0].fileSize > 2097152 ){
        Alert.alert(
          'File too large.',
          [{text:'OK'}]
        )
      } else {
        const source = {uri: response.assets[0].uri};
        console.log(response);
        console.log(source);
        console.log(response.assets[0].uri)
        setConcertPoster(source);
        setImage(source);
      }
    });

  };
  const uploadImage = async () => {
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    console.log(filename)
    const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri;

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(filename).putFile(uploadUri);

    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      ) 
      storage().ref(filename).getDownloadURL()
      .then((downloadUrl)=>{
        console.log(downloadUrl)
        setImageUrl(downloadUrl)
      })
    
    });

    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    setUploading(false);

    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );

    setImage(null);
  };

  const newConcert = async () => {
    console.log('====================================');
    console.log(concertName);
    console.log('====================================');
    firestore()
      .collection('concerts')
      .doc(concertName)
      .set({
        concertDate: concertDate,
        concertLocation: concertLocation,
        concertName: concertName,
        concertSeason: concertSeason,
        concertLatitude: concertLatitude,
        concertLongitude: concertLongitude,
        concertPoster: imageUrl,
      })
      .then(() => {
        console.log('concert added!');
        Alert.alert('Concert added')
      });
      /*
    const reference = storage().ref(concerts);
    const pathToFile = image;
    reference.putFile(pathToFile);
    */
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Add new concert</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setConcertName}
        value={concertName}
        placeholder="Concert Name"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setConcertLocation}
        value={concertLocation}
        placeholder="Concert Location"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setConcertLatitude}
        value={concertLatitude}
        placeholder="Concert Latitude"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setConcertLongitude}
        value={concertLongitude}
        placeholder="Concert Longitude"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setConcertSeason}
        value={concertSeason}
        placeholder="Concert Season"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setConcertDate}
        value={concertDate}
        placeholder="Concert Date"
      />
      <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Select Poster</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image source={{uri: image.uri}} style={styles.imageBox} />
        ) : null}
        {uploading ? (
          <View style={styles.progressBarContainer}>
            <Text>Uploading file</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
        )}
      </View>
      <Pressable style={styles.addButton} onPress={newConcert}>
        <Text style={styles.text}>Add Concert</Text>
      </Pressable>
    </View>
  );
};

export default AddConcert;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  textInput: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#34ebe5',
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
  },
  imageBox: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
  selectButton: {
    borderRadius: 5,
    width: 200,
    height: 40,
    backgroundColor: '#34ebe5',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 1,
    fontSize: 10,
  },

  uploadButton: {
    borderRadius: 5,
    width: 200,
    height: 40,
    backgroundColor: '#34ebe5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    fontSize: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  addButton: {
    width: 200,
    height: 40,
    borderRadius: 5,
    fontSize: 10,
    alignSelf: 'center',
    padding: 5,
    backgroundColor: '#34ebe5',
    marginTop: 5, 
  },
});
