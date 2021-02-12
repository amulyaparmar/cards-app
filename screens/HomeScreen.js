import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet, Button, Text, TextInput, Input } from 'react-native';

import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

import SvgQRCode from 'react-native-qrcode-svg';
import { AuthUserContext } from '../navigation/AuthUserProvider';


export default function HomeScreen() {
  const { user, setUser } = useContext(AuthUserContext);


  useStatusBar('dark-content');
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  const name = "Amulya Parmar";
  const email = "parmar.amulya@gmail.com";
  const phone = "5862588588";
  const website = "https://amulya.co";


  function ContactQrCode() {
    return <SvgQRCode size={250} value={`
BEGIN:VCARD
VERSION:4.0
PRODID:-//cardz
FN:${name}
EMAIL:${email}
ORG:LeaseMagnets
TEL:${phone}
URL;type=pref:${website}
ADR:;39135 Zofia Avenue;123;Sterling Heights;MI;48313;United States
URL:https://www.linkedin.com/in/amulyaparmar/
URL:https://www.facebook.com/amulyaco/
END:VCARD
`} />;
  }

  return (
    <View style={styles.container}>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: "10%",
          marginBottom: "10%"
        }}>
        <ContactQrCode />
      </View>

      <Text style={{ color: "white" }}>PLG TYG!!!</Text>

      <View style={{ height: 80 }} >
        <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
          <Button title='Phone' />
          <Button title='Email' />
          <Button title='Website' />
          <Button title='Calendly' />
          <Button title='LinkedIn' />
          <Button title='Button 6' />
        </ScrollView>
      </View>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 20, marginRight: 20, marginBottom: 10 }} value={email} />
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 20, marginRight: 20, marginBottom: 10 }} value={phone} />
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 20, marginRight: 20, marginBottom: 10 }} value={website} />

      <Button title='Save Settings' />


      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
