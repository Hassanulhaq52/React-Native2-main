import React, { useState, useEffect } from 'react';

import CustomButton from './utils/customButton';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert


} from 'react-native';

import GlobalStyle from './utils/GlobalStyle'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setAge, increaseAge, getCities } from '../redux/actions';
import PushNotification from "react-native-push-notification";
import { color } from 'react-native-reanimated';




const db = SQLite.openDatabase(

  {

    name: 'MainDB',
    location: 'default',

  },

  () => { },

  error => { console.log(error) }

);

export default function Home({ navigation, route }) {

  const {name, age, cities} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // const [name, setName] = useState('');
  // const [age, setAge] = useState('');

  useEffect(() => {

    getdata();
    dispatch(getCities());

  }, []);


  const getdata = () => {

    try {

      // AsyncStorage.getItem('UserData')

      // .then ( value => {

      //   if (value != null)

      //   {

      //   let user = JSON.parse(value);
      //   setName(user.Name);
      //   setAge(user.Age);

      //   }

      // })


      db.transaction((tx) => {

        tx.executeSql(

          "SELECT Name, Age FROM Users",
          [],

          (tx, results) => {

            var len = results.rows.length;

            if (len > 0) {

            var userName = results.rows.item(0). Name;
            var userAge = results.rows.item(0). Age;
            dispatch(setName(userName));
            dispatch(setAge(userAge));

            }

          }

        );

      })



      
    }

    catch (error) {

      console.log(error)

    }

  }


  const updateData = async () => {

    if (name.length == 0) {

      Alert.alert('Warning!', 'Plz Write Your Data.')

    }

    else {

      try {

        // var user = {

        //   Name: name

        // }

        // await AsyncStorage.mergeItem('UserData', JSON.stringify(user));

        db.transaction((tx) => {

          tx.executeSql(
          
          "UPDATE Users SET Name = ? "
          [name],
          () => { Alert.alert('Success!', 'Your Data has been Updated.'); },
          error => { console.log(error) }
          
          )
            
          })
          

        

      }

      catch (error) {

        console.log(error);

      }

    }

  }

  const removeData = async () => {

    try {

      // await AsyncStorage.clear();

      db.transaction((tx) => {

        tx.executeSql(
        
        "DELETE FROM Users ",
        [],
        () => {  navigation.navigate('Login'); },
        error => { console.log(error) }
        
        )
          
        })

     


    }

    catch (error) {

      console.log(error);

    }

  }


const handleNotification = (item, index) => {

// PushNotification.cancelAllLocalNotifications();
// PushNotification.cancelLocalNotification({id:3})


PushNotification.localNotification({

  channelId: 'test-channel',
  title: 'You Clicked On ' + item.name,
  message: item.city,
  bigText: item.city + ' is one of the most beautiful cities where ' + item.name + ' resident',
  color: 'red',
  id: index


});


PushNotification.localNotificationSchedule({

  channelId: 'test-channel',
  title: 'Alarm',
  message: 'You Clicked On ' + item.name + ' 10 Seconds Ago',
  date: new Date(Date.now() + 10 * 1000),
  allowWhileIdle: true,

})

}


  return (
    <View style={styles.body}>
      <Text style={
        // GlobalStyle.CustomFont,
        styles.text1
      }
      >
        Welcome {name}

      </Text>

<CustomButton 

style= {styles.cb}
title = 'Open Camera'
color = '#0080ff'
onPressFunction = {() => {navigation.navigate('Camera') }}

/>


<FlatList 

data = {cities}
renderItem = {({ item, index }) => ( 


<TouchableOpacity

onPress = {() => { 

  handleNotification(item, index);
navigation.navigate('Map',{
  city: item.city,
  lat: item.lat,
  lng: item.lng
});

}}

>
<View style= {styles.item}> 

<Text style= {styles.title}> {item.name} </Text>
<Text style= {styles.subtitle} > {item.city} </Text>

</View>

</TouchableOpacity>

)}

keyExtractor = {(item, index) => index.toString()}

/>

      {/* <Text style={
        // GlobalStyle.CustomFont,
        styles.text1
      }
      >
        Your age is {age}

      </Text>


      <TextInput

        style={styles.input}
        placeholder='Enter Your Name'
        value={name}
        onChangeText={(value) =>  dispatch(setName(value))}

      />



      <CustomButton

        style={styles.button1}
        title='Update'
        color='#46bdf0'
        onPressFunction={updateData}

      />



      <CustomButton

        style={styles.button2}
        title='Remove'
        color='#13f2c6'
        onPressFunction={removeData}

      />

<CustomButton

style={styles.button2}
title='Increase Age'
color='#46bdf0'
onPressFunction = { () => {dispatch(increaseAge())} }

/> */}

    </View>
  )
}


const styles = StyleSheet.create({

  body: {
    flex: 1,
    alignItems: 'center'
  },

  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 5,

  },

  text1: {
    fontSize: 70,
    // fontWeight: 'bold',
    margin: 10,
    fontFamily: 'SquarePeg-Regular',

  },

  button1: {
    fontFamily: 'Tapestry-Regular',
    fontSize: 35,
    padding: 10,
    marginBottom: 15,
    border: 1,
    borderRadius: 5
  },

  button2: {
    fontFamily: 'Tapestry-Regular',
    fontSize: 35,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    
  },

  

  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 50,
    marginBottom: 20
  },

  item: {

    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 5,
    margin: 7,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center'

  },

title: {

  fontSize: 40,
  margin: 5,
  // fontWeight: 'bold',
  fontFamily:'WaterBrush-Regular'
},

subtitle: {

  fontSize: 30,
  margin: 10,
  color: '#999999',
  fontFamily: 'SquarePeg-Regular',
},

})    