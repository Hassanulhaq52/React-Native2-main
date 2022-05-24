import React, {useState, useEffect} from 'react';

import{
    StyleSheet,
    Text,
    View,
    Image
  
  } from 'react-native';

import PushNotification from "react-native-push-notification";


export default function Splash({navigation}){


useEffect(() => {

    createChannels();

    setTimeout(() => {
      
    navigation.replace('My Tasks');

    }, 2000);

}, []);



const createChannels = () => {

PushNotification.createChannel(

{

channelId: 'task-channel',
channelName: 'Task Channel'

}

)

}


return(

    <View
    style = {styles.body}
    >

<Image 

style = {styles.logo}
source = { require ('../../assets/checklist1.png') }

/>

<Text style = {styles.text}

>

Hassan To-Do List

</Text>

    </View>
)

}


  const styles= StyleSheet.create({

    body: {

      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0080ff'

    },

    logo: {
        height: 180,
        width: 180,
        margin: 10,
        
    },

    text: {
        fontSize: 40,
        color: '#ffffff',
        // fontWeight: 'bold',
        fontFamily: 'Tapestry-Regular',

    },


  });