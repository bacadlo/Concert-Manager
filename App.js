import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState, useEffect, createContext, useContext} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';
import AddConcert from './src/AddConcert';
import DisplayConcert from './src/DisplayConcert';
import SearchConcert from './src/SearchConcert';
import Feedback from './src/Feedback';
import ExtraFeedback from './src/ExtraFeedback';
import Graph from './src/Graph';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

const App = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const signin = async () => {
    onGoogleButtonPress().then(() => {
      console.log('Signed in with Google!');
      const currentUsers = auth().currentUser
      
      console.log(currentUsers)
      setCurrentUser(currentUsers)
    });
  };

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  function onAuthStateChanged(user) {
    setUser(user);
    
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '973609987365-9pmjdpiugj5u0v67ck6isb4rmfjigrhe.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      });
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          backgroundColor: '#34ebe5',
          ...StyleSheet.absoluteFill,
        }}>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            color: 'black',
            marginVertical: 60,
            fontStyle: 'bold',
            fontStyle: 'italic',
          }}>
          Welcome to ConcertMatch!{' '}
        </Text>
        <Image source={require('./src/Images/home.jpg')} style={styles.image} />
        <GoogleSigninButton onPress={signin} style={styles.button} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <AuthContext.Provider value={(user, setUser)}>
        
        <Pressable
          style={styles.logoutButton}
          onPress={() => {
            signout();
          }}>
          <Text style={styles.logoutText}>Sign out</Text>
        </Pressable>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'grey',
            }}>
            <Tab.Screen
              name="Add"
              component={AddConcert}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="Search"
              component={SearchConcert}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="Map"
              component={Graph}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="Feedback"
              component={Feedback}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="ExtraFeedback"
              component={ExtraFeedback}
              options={{headerShown: false}}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
      <StatusBar barStyle={'auto'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {
    width: 400,
    height: 300,
  },
  button: {
    width: '90%',
    height: 50,
    fontSize: 15,
    marginVertical: 20,
  },
  logoutButton: {
    width: 100,
    height: 40,
    fontSize: 15,
    alignSelf: 'flex-end',
    padding: 5,
    backgroundColor: '#34ebe5',
    borderRadius: 5,
  },
  text: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
  },
  user: {
    fontSize: 15,
    color: 'grey',
  },
  logoutText: {
    fontSize: 22,
    color: 'black',
  },
});

export default App;
