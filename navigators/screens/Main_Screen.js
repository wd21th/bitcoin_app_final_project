import * as React from 'react';
import 'react-native-gesture-handler'
import {useRef, useMemo, useState, useEffect} from 'react';
import { Text, View,SafeAreaView, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'; 
import { DataTable, Button } from 'react-native-paper';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import { Input } from 'react-native-elements';

import ModalPoup from './components/Modal';


import { doc, setDoc, getDoc, addDoc } from "firebase/firestore";

import { firestore, fs_auth } from "./../../firebase";



import { 
    signOut, 
    onAuthStateChanged,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword
      } from "firebase/auth";



     


export default function({navigation}){







    const [visible, setVisible] = React.useState(false);
    const [buy_bitcoin, set_buy_bitcoin] = React.useState(false);



    const [authorization, set_authorization] = React.useState("register");
    const [email, set_email] = React.useState("27780@iitu.edu.kz");
    const [password, set_password] = React.useState("123456");
    const [confirm_password, set_confirm_password] = React.useState("123456");


    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
  
    const [user, set_user] = React.useState();

    React.useEffect(() => {
        onAuthStateChanged(fs_auth, (user) => {
          if (user) {
            console.log("Main Page");
            console.log(user.uid," ", user.email);
            console.log(user);
            set_user({
                uid: user.uid,
                email: user.email
            })
            // getUserFromDb(user.uid, user.email);
          }else set_user()
        });
      }, []);



    const register = () =>{
        if (password !== confirm_password) {
            // setErrorMessage("Passwords don't match.");
            return;
        }
        createUserWithEmailAndPassword(fs_auth, email, password)
            .then((user_credential) => {
                /* username into db*/
                const uid = user_credential.user.uid;
                add_user_to_db(uid);
                setVisible(false)
                signInUser();
            })
            .catch((error) => {
                // setErrorMessage(error.message);
                console.log(error)
            });
        }


        async function add_user_to_db(userId) {
            await setDoc(doc(firestore, "users", userId), {
                email, password, age: ""
            });
        }

        async function signInUser() {
            signInWithEmailAndPassword(fs_auth, email, password)
                .then((userCredential) => {
                    // console.log(userCredential);
                    try {
                        navigation.navigate("Profile");
                    } catch (error) {
                        console.log(error)
                    }
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
          }



async function buy() {
    console.log("HERE")
    try {
        
        onAuthStateChanged(fs_auth, (user) => {
            if (user) {
                console.log("cool")
                set_buy_bitcoin(true)
              // getUserFromDb(user.uid, user.email);
            }else {
                set_user()
                setVisible(true) 
            }
          }); 

    } catch (error) {
        console.log(error)
    }
  
}



    return(


<>

        <View style={styles.container}>
    <Card>
    <View style={styles.itemWrapper}>
        
        {/* Left side */}
        
        <View style={styles.leftWrapper}>
          <Image source={{ uri: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" }} style={styles.image} />
          <View style={styles.titlesWrapper}>
            <Text style={styles.largeTitle}>Bitcoin</Text>
            
          </View>
        </View>

 {/* Right side */}
        <View style={styles.rightWrapper}>
     <MaterialIcons name="show-chart" size={30} color="black" />
        </View>
      </View>
      
        <View style={styles.divider} />

</Card>


<Card>
<View style={{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
}}>
      <Text style={styles.paragraph}>
        Pool Effective HR (30m avg)
      </Text>
      {
        //<Image style={styles.logo} source={require('../assets/snack-icon.png')} />
        }
        <Text style={{
          fontSize: 40
        }}>
        12.98EH/s
      </Text>
        
    </View>
</Card>





<Card>
<View style={{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
}}>
      <Text style={styles.paragraph}>
        Active Workers
      </Text>
      {
        //<Image style={styles.logo} source={require('../assets/snack-icon.png')} />
        }
        <Text style={{
          fontSize: 40
        }}>
        199 165
      </Text>
        
    </View>
</Card>





<Card>
<View style={{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
}}>
      <Text style={{
          fontSize: 30
        }}>
        Hashrate
      </Text>
    


     <DataTable>
      <DataTable.Header>
        <DataTable.Title>5 min</DataTable.Title>
        <DataTable.Title numeric>1 hour</DataTable.Title>
        <DataTable.Title numeric>1 day</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>0.8</DataTable.Cell>
        <DataTable.Cell numeric>159</DataTable.Cell>
        <DataTable.Cell numeric>6.0</DataTable.Cell>
      </DataTable.Row>
    </DataTable>



   <Button style={{marginTop: 20}} mode="contained" onPress={buy}>
    Buy
  </Button>

  <ModalPoup visible={visible}>


<View>

<View style={styles.header}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20
            }}>X</Text>
          </TouchableOpacity>
        </View>

<View style={{
    display:'flex',
    flexDirection: 'row',
}}>

<TouchableOpacity onPress={()=> set_authorization('register')} style={
    authorization === "register" ? styles.active_tab : {
        width: '50%',
        height: 25,
        display: 'flex',
        justifyContent:'center'

    }
}>
<View>
<Text style={{textAlign:'center', color: 'black',}}>Register</Text>
</View>
  
</TouchableOpacity>



<TouchableOpacity onPress={()=> set_authorization('login')} style={
    authorization=== "login"  ? styles.active_tab : {
        width: '50%',
        height: 25,
        display: 'flex',
        justifyContent:'center',
    }
}>

<View >
<Text style={{textAlign:'center', color: 'black' }}>Login</Text>
</View>


</TouchableOpacity>








    
</View>



{
authorization == 'register' ?
<SafeAreaView>
<Input
  placeholder='email'
  leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
/>
<Input
  placeholder='password'
  leftIcon={{ type: 'font-awesome', name: 'lock' }}
/>
<Input
  placeholder='confirm password'
  leftIcon={{ type: 'font-awesome', name: 'lock' }}
/>

<Button style={{marginTop: 20}} mode="contained" onPress={register}>
    Register
  </Button>

</SafeAreaView>
:
<SafeAreaView>
<Input
  placeholder='email'
  leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
/>
<Input
  placeholder='password'
  leftIcon={{ type: 'font-awesome', name: 'lock' }}
/>
<Button style={{marginTop: 20}} mode="contained" onPress={signInUser}>
    Login
  </Button>
</SafeAreaView>
}







</View>
  









      </ModalPoup>
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  



        
    </View>
</Card>
      </View>
      </>
        )
    }




const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ecf0f1',
      borderStartColor: 'red',
    },
    itemWrapper: {
      paddingHorizontal: 16,
      marginTop: 30,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center',
    },
    leftWrapper: {
      flexDirection: "row",
      alignItems: 'center',
    },
    active_tab: {
        width: '50%',
        height: 25,
        display: 'flex',
        justifyContent:'center',
        borderRadius: 15,
        backgroundColor: "gray",
        marginBottom:10
    },
    image: {
      height: 48,
      width: 48,
    },
    titlesWrapper: {
      marginLeft: 8,
    },
    largeTitle: {
      fontSize: 24,
      fontWeight: "bold",
    },
    title: {
      fontSize: 18,
    },
    subtitle: {
      marginTop: 4,
      fontSize: 14,
      color: "#A9ABB1",
    },
    rightWrapper: {
      alignItems: 'flex-end',
    },
  
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#A9ABB1',
      marginHorizontal: 16,
      marginTop: 16,
    },

    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
      },
      header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        // justifyContent: 'center',
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },


      bottomSheet: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },

  })