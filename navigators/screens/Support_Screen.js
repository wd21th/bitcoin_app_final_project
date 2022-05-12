import * as React from 'react';
import { useState, useEffect, useCallback } from 'react'
import { StyleSheet, TextInput, View, Button } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { doc, setDoc, getDoc, addDoc, collection, onSnapshot } from "firebase/firestore";

import { firestore, fs_auth } from "./../../firebase";

const chats_col = collection(firestore, "chats")

export default function(){


    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])


    useEffect(() => {
        readUser()
        const unsub = onSnapshot(chats_col, (querySnapshot) => {
           const messagesFirestore =  querySnapshot.docChanges().filter(({ type }) => type === 'added').map( ({doc}) => {
                const message = doc.data()
                //createdAt is firebase.firestore.Timestamp instance
                //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                return { ...message}
                // return { ...message, createdAt: message.createdAt.toDate() }
            }


            )
            // .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            
            appendMessages(messagesFirestore)
            // console.log("Current data: ", doc.data());
        });
        
        return () => unsub()
    }, [])


    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function readUser() {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }
  async function handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    async function handleSend(messages) {
        const writes = messages.map((m) =>{
            
        //    .add(m) 
        addDoc( chats_col, m)
        
        })
        await Promise.all(writes)
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
                <Button onPress={handlePress} title="Enter the chat" />
            </View>
        )
    }
    return <GiftedChat messages={messages} user={user} onSend={handleSend} />


    return (
<>

</>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})