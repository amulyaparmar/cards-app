import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Button, Text, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';

import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

import SvgQRCode from 'react-native-qrcode-svg';
import { AuthUserContext } from '../navigation/AuthUserProvider';



export default function HomeScreen({ navigation }) {
  const { user, setUser } = useContext(AuthUserContext);


  useStatusBar('dark-content');
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  const [name, setName] = useState("Amulya Parmar");
  const [email, setEmail] = useState("parmar.amulya@gmail.com");
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

      return setVcf("http://cardz.me/amulya")

    }


    const prefix = `
BEGIN:VCARD
VERSION:4.0
PRODID:-//cardz
`;

    const middle = Object.entries(userData).map(([k, v]) => {
      // console.log(k, v);

      if (v && v.enabled && v.symbol) {
        return `${v.symbol}:${v.value}` + "\n"
      }
      else {
        return ``;
      }
    }).join('');


    let active = Object.entries(userData).filter(([k, v]) => {
      return v.enabled;
    })

    console.log("currently active: ", active, "|| length: ", active.length);
    if (active.length === 1) {

      if (active[0][0] === "email") {
        return setVcf('mailto:' + active[0][1].value);
      }



      console.log("one item: ", active[0][1].value);
      // setVcf(active[0].value);
      return;
    }

    const suffix = `END:VCARD
`
    // console.log(prefix + middle + suffix);
    return setVcf(prefix + middle + suffix);
  }



  useEffect(() => {
    buildQrCode();
  }, [userData, liveShare])

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

        <Text style={liveShare ? styles.ContactTextActive : styles.ContactText}>{liveShare ? "Live Sharing (https://cardz.me/)" : "Offline Sharing (.VCF)"}</Text>
      </TouchableHighlight>

      {liveShare && < View >
        {userData.questions.value.map((question, idx) => {
          return (
            <TextInput key={idx} style={styles.inputFieldContainer} defaultValue={question}
            // onChangeText={text => setName(text)} 
            />
          )
        })}
        <TextInput style={styles.inputFieldContainer} placeholder={"new question"}
        // onChangeText={text => setName(text)} 
        />
        <Button title={"+ Add New Question"} />
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


          <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ProfileSettings', { userData: userData, setUserData: setUserData })}
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