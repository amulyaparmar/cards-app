import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Button, Text, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';

import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

import SvgQRCode from 'react-native-qrcode-svg';
import { AuthUserContext } from '../navigation/AuthUserProvider';


export default function SettingsScreen({ navigation, route }) {

    const { userData, setUserData } = route.params;
    const [name, setName] = useState("Amulya Parmar");
    /*nst [email, setEmail] = useState("parmar.amulya@gmail.com");
    const [phone, setPhone] = useState("5862588588");
    const [website, setWebsite] = useState("https://amulya.co");
   
  const [userData, setUserData] = useState({
    "name": { "symbol": "FN", "value": "Amulya Parmar", "enabled": true },
    "email": { "symbol": "EMAIL", "value": "parmar.amulya@gmail.com", "enabled": true },
    "phone": { "symbol": "TEL", "value": "5862588588", "enabled": false },
    "website": { "symbol": "URL;type=pref", "value": "http://amulya.co", "enabled": true },
    "linkedin": { "value": "https://linkedin.com/in/amulyaparmar", "enabled": false },
    "calendly": { "symbol": "FBURL", "value": "https://calendly.com/amulyaparmar/30min", "enabled": true },
    "facebook": { "value": "https://facebook.com/amulyaco", "enabled": true },
    "questions": { "value": ["Meet at TreeHacks", 'Are you interested in joining my team?', 'Would you be interested in joining my newsletter'], "enabled": true }
  });
   */


  return (
    <ScrollView style={styles.container}>

          

          <TextInput style={styles.inputFieldContainer} defaultValue={userData.name.value} onChangeText={text => {

              let tempUserData = userData;
              tempUserData.name.value = text;
              return setUserData({ ...tempUserData })

          }} />

          <TextInput style={styles.inputFieldContainer} defaultValue={userData.name.value} onChangeText={text => {

              let tempUserData = userData;
              tempUserData.name.value = text;
              return setUserData({ ...tempUserData })

          }} />

          {/*<TextInput style={styles.inputFieldContainer} defaultValue={email} onChangeText={text => {

              let tempUserData = userData;
              tempUserData.email.value = text;
              return setUserData({ ...tempUserData })

          }} />
          <TextInput style={styles.inputFieldContainer} defaultValue={phone} onChangeText={text => {

              let tempUserData = userData;
              tempUserData.phone.value = text;
              return setUserData({ ...tempUserData })

          }} />
          <TextInput style={styles.inputFieldContainer} defaultValue={website} onChangeText={text => {

              let tempUserData = userData;
              tempUserData.website.value = text;
              return setUserData({ ...tempUserData })

          }} />*/}
          

      <TouchableOpacity
        activeOpacity={0.8}
              onPress={() => navigation.navigate('Home')}
        style={styles.addMoreButtonContainer}
      >
        <Text style={styles.addMoreButtonText}>+ Save Info</Text>
      </TouchableOpacity>

    </ScrollView>
     
  );
}



const styles = StyleSheet.create({
  container: {
        flex: 1,
        padding:15
  },

  btnNormal: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
  },
  btnPress: {
    borderColor: 'orange',
    borderWidth: 1,
    height: 30,
    width: 100,
  },


  MainContainer:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

  QrCodeContainer:
  {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000',
    width: '80%',
    padding: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },


  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#FF7800",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginLeft: 12,
    marginRight: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },

  addMoreButtonContainer: {
    borderColor: '#000',

    elevation: 8,
      backgroundColor: "#FF7800",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,

  },
  addMoreButtonText: {
    fontSize: 18,
    color: "#635959",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },

  inputFieldContainer: {
    height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 20, marginRight: 20, marginBottom: 10, borderRadius: 8,
    paddingLeft: 8, paddingRight: 8
  },

  ContactButton:
  {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000',
    height: 40,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,

    margin: 5

  },

  // amayne@gmail.com  // andrew@openai.com
  // how the internet happpened  // elon musk biography // palmer lucky
  ContactButtonActive:
  {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000',
    height: 40,

    backgroundColor: "black",
    color: "#fff",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,

    margin: 5
  },

  ContactTextActive:
  {
    color: "#fff",
  },

  ContactText:
  {
    color: "#000",
  },

  contactButtonContainerActive: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000',
  },

  contactButtonContainerDisabled: {
  },

  contactButtonContainerText: {
  },

});
