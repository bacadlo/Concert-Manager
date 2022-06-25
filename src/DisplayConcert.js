import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, {useState, useEffect, createContext, useContext} from 'react';
import db from '../firebase/firebase-config'
import {collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';




const styles = StyleSheet.create({})