import React, { useContext } from 'react';
import { View, StyleSheet, Button, Text, TextInput, Input } from 'react-native';

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


  function ContactQrCode() {
    return <SvgQRCode size={250} value={`
BEGIN:VCARD
VERSION:2.1
N:Amulya Parmar
TEL;HOME;VOICE:5862588588
TEL;WORK;VOICE:666-666-6666
EMAIL:${user.email}
URL:https://www.example.com
END:VCARD`} />;
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

      <Text>Praise the Lord TYG!!!
      
      </Text>

      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} value={user.email} />


      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
