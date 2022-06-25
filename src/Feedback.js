import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class Feedback extends Component {
  fantasticButton() {
    Alert.alert('Thank your for feedback!', '', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  niceButton() {
    Alert.alert('Thank your for feedback!', '', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  sorryButton() {
    Alert.alert('Thank your for feedback!','', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  forgiveButton() {
    Alert.alert('Thank your for feedback!','', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}> Feedback time! </Text>
        
        <Text style={styles.text}> Select an emoji that represents your app experience </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.fantasticButton}>
            <Image
              source={require('./Images/fantastic.png')}
              style={styles.imageStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.niceButton}>
            <Image
              source={require('./Images/nice.png')}
              style={styles.imageStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.sorryButton}>
            <Image
              source={require('./Images/sorry.png')}
              style={styles.imageStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.forgiveButton}>
            <Image
              source={require('./Images/forgive.png')}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 130,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  imageStyle: {
    width: 85,
    height: 85,
    marginTop: 30,
  },
  headerText: {
    fontSize: 30,
    color: 'black',
    marginTop: 30,
  },
  button: {
    margin: 10,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 17, 
    color: 'black',
    marginTop: 30,
  },
});
