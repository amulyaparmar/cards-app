import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Button, Text, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';

import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

import SvgQRCode from 'react-native-qrcode-svg';
import { AuthUserContext } from '../navigation/AuthUserProvider';


export default function SettingsScreen() {
  const { user, setUser } = useContext(AuthUserContext);


  useStatusBar('dark-content');
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

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

  const [liveShare, setLiveShare] = useState(false);



  const [vcf, setVcf] = useState(`
BEGIN:VCARD
VERSION:4.0
PRODID:-//cardz
EMAIL:${user.email}
END:VCARD
`
  );

  function buildQrCode() {

    if (liveShare) {

      return setVcf("https://cardz.me/amulya")

    }

    const prefix = `
BEGIN:VCARD
VERSION:4.0
PRODID:-//cardz
`;

    const middle = Object.entries(userData).map(([k, v]) => {
      console.log(k, v);

      if (v && v.enabled && v.symbol) {
        return `${v.symbol}:${v.value}` + "\n"
      }
      else {
        return ``;
      }
    }).join('');


    const suffix = `END:VCARD
`
    console.log(prefix + middle + suffix);
    return setVcf(prefix + middle + suffix);
  }


  useEffect(() => {
    buildQrCode();
  }, [userData])

  function ContactQrCode() {
    return <View style={styles.QrCodeContainer}><SvgQRCode size={250} value={vcf} /></View>;
  }

  return (
    <ScrollView style={styles.container}>

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

      <TouchableHighlight style={liveShare ? styles.ContactButtonActive : styles.ContactButton} onPress={() => setLiveShare(old => {
        setLiveShare(!old);
      })}>

        <Text style={liveShare ? styles.ContactTextActive : styles.ContactText}>{liveShare ? "Live Sharing (https://superconnector.link/)" : "Offline Sharing (.VCF)"}</Text>
      </TouchableHighlight>


      {liveShare && < View >
        {Object.entries(userData).map(([k, v]) => {
          return (
            <TextInput key={idx} style={styles.inputFieldContainer} defaultValue={k}
            // onChangeText={text => setName(text)} 
            />
          )
        })}

        <Button title={"Save Button"} />
      </View>
      }

      <Text style={{ color: "white" }}>PLG TYG!!!</Text>

      <View style={{ height: 80 }} >
        <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>

          {Object.entries(userData).map(([k, v]) => {
            return (
              <TouchableHighlight key={k}
                activeOpacity={0.8}
                onPress={e => {
                  let tempData = userData;
                  tempData[k]["enabled"] = !tempData[k]["enabled"];
                  console.log(tempData[k]);

                  setUserData({ ...tempData });

                }}
                style={userData[k].enabled ? styles.ContactButtonActive : styles.ContactButton}
              >
                <Text style={userData[k].enabled ? styles.ContactTextActive : styles.ContactText}>{k}</Text>
              </TouchableHighlight>
            )
          })
          }



        </ScrollView>
      </View>

      <TextInput style={styles.inputFieldContainer} defaultValue={name} onChangeText={text => setName(text)} />
      <TextInput style={styles.inputFieldContainer} defaultValue={email} onChangeText={text => setEmail(text)} />
      <TextInput style={styles.inputFieldContainer} defaultValue={phone} onChangeText={text => setPhone(text)} />
      <TextInput style={styles.inputFieldContainer} defaultValue={website} onChangeText={text => setWebsite(text)} />


      <TouchableOpacity
        activeOpacity={0.8}
        // onPress={onPress}
        style={styles.addMoreButtonContainer}
      >
        <Text style={styles.addMoreButtonText}>+ Add more Info</Text>
      </TouchableOpacity>


      {/* <AppButton title="Save Settings" size="sm" backgroundColor="#000" /> */}
      <TouchableOpacity
        activeOpacity={0.8}
        // onPress={onPress}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>Save Info</Text>
      </TouchableOpacity>


      <Button title="Sign Out" onPress={handleSignOut} />
    </ScrollView >
  );
}

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={styles.appButtonContainer}
  >
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    backgroundColor: "#F0F0F0",
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
