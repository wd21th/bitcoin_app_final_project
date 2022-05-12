import * as React from 'react';

import {SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity  } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Card } from 'react-native-paper';

import { ListItem, Avatar } from 'react-native-elements'

import { MaterialIcons } from '@expo/vector-icons'; 

const list = [
    {
      name: 'INNOSILICON A10 Pro ETH Miner',
      avatar_url: 'https://podolsk.rev-pro.ru/wp-content/uploads/2020/03/latvia.jpg',
      subtitle: '0.00000007245BTC',
      status: "playcircleo"
    },
    {
      name: 'INNOSILICON A11 ETH Miner',
      avatar_url: 'https://img-fotki.yandex.ru/get/114758/47375343.18/0_121882_ddc6e352_XL.jpg',
      subtitle: '0.000000045BTC',
      status: "pausecircleo"
    },
  ]


export default function(){
    return (
<View>
    

<Card>
    <View style={styles.itemWrapper}>
        
        {/* Left side */}
        
        <View style={styles.leftWrapper}>
        <AntDesign name="wallet" size={40} color="black" />
          <View style={styles.titlesWrapper}>
            <Text style={styles.largeTitle}>Wallet</Text>
          </View>
        </View>

 {/* Right side */}
        {/* <View style={styles.rightWrapper}>
        <AntDesign name="CodeSandbox" size={30} color="black" />
        </View> */}
      </View>
      
        <View style={styles.divider} />

</Card>



<Card>
    <View style={styles.itemWrapper}>
        
        {/* Left side */}
        
        <View style={styles.leftWrapper}>
          <Image source={{ uri: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" }} style={styles.image} />
          <View style={styles.titlesWrapper}>
            <Text style={styles.largeTitle}>0.075BTC</Text>
            
          </View>
        </View>

 {/* Right side */}
        <View style={styles.rightWrapper}>
     <Text>37000$</Text>
     <Text>10m ₸</Text>
        </View>
      </View>
      
        <View style={styles.divider} />

</Card>


    

</View>
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