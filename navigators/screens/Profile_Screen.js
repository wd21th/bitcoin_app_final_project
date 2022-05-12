import * as React from 'react';
import {SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import { doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { DataTable, Button } from 'react-native-paper';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
  } from 'react-native-paper';
//   import { Icon } from '@expo/vector-icons'; 

import { firestore, fs_auth } from "./../../firebase";


import { 
    signOut, 
    onAuthStateChanged,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword
      } from "firebase/auth";


export default function({navigation}){


    React.useEffect(() => {
        onAuthStateChanged(fs_auth, (user) => {
          if (user) {
            console.log("on auth");
            console.log(user.uid," ", user.email);
            getUserFromDb(user.uid, user.email);
          }
        });
      }, []);



      async function getUserFromDb(userId, email) {
        try {
          const docRef = doc(firestore, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              console.log(docSnap.data())
            // setUserName(docSnap.get("username"));
            // setUserId(userId);
            // setEmail(email);
          }
        } catch (e) {
          alert(e);
        }
      }



      async function log_out(){
            signOut(fs_auth)
              .then(() => {
                  console.log("OUT")
                // setUserId("");
                // setEmail("");
                // setUserName("Guest");
                navigation.navigate("Main_Screen")
              })
              .catch((error) => {
                alert(error.message);
              });
      }
    



      const myCustomShare = async() => {
        const shareOptions = {
          message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
          url: files.appLogo,
          // urls: [files.image1, files.image2]
        }
    
        try {
          const ShareResponse = await Share.open(shareOptions);
          console.log(JSON.stringify(ShareResponse));
        } catch(error) {
          console.log('Error => ', error);
        }
      };
    
    
    
    return(
        <SafeAreaView style={styles.container}>
      
        <View >
          <View style={styles.profileImage}>
            {/* {roleOf()} */}
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: '200', fontSize: 36 }]}>
            {/* {props.who} */}
            Dias
          </Text>
          <Text style={[styles.text, { color: '#AEB5BC', fontSize: 14 }]}>
            {/* {props.role} */}
            {/* User */}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>Role</Text>
            <Text style={[styles.text, styles.subText]}>User</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: '#DFD8C8',
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}>
            <Text style={[styles.text, { fontSize: 24 }]}>Email</Text>
            <Text style={[styles.text, styles.subText]}>
              {/* {props.phone_number} */}
              27780@iitu.edu.kz
            </Text>
          </View>
        </View>


        <TouchableOpacity onPress={
            log_out
        } style={{
          backgroundColor: 'lightblue',
          padding: 12,
          margin: 16,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          borderColor: 'rgba(0, 0, 0, 0.1)'
        }}>
          <Text>Log out</Text>
        </TouchableOpacity>

    </SafeAreaView>












        )
    }





    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#FFF',
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          fontFamily: 'HelveticaNeue',
          color: '#52575D',
        },
        image: {
          flex: 1,
          height: 300,
          width: 300,
        },
      
        subText: {
          fontSize: 12,
          color: '#AEB5BC',
          textTransform: 'uppercase',
          fontWeight: '500',
        },
        profileImage: {
          // width: '100%',
          // height: "100%",
        },
      
        add: {
          backgroundColor: '#41444B',
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 60,
          height: 60,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
        },
        infoContainer: {
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: 16,
        },
        statsContainer: {
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 32,
        },
        statsBox: {
          alignItems: 'center',
          flex: 1,
        },
      
        center: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      });
      