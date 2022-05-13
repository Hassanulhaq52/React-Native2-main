import React, {useState, useEffect} from 'react';
import{
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    Alert
  
  
  } from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import CustomButton from './utils/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage'
import SQLite from 'react-native-sqlite-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setAge } from '../redux/actions';
import PushNotification from "react-native-push-notification";

const db = SQLite.openDatabase(

{

  name: 'MainDB',
  location: 'default',

},

() => {},

error => { console.log(error)}

);

export default function Login({navigation}){

const {name, age} = useSelector(state => state.userReducer);
const dispatch = useDispatch();


// const [name, setName] = useState('');
// const [age, setAge] = useState('');

useEffect(() => {
  createTable();
  getdata();
    createChannels();

}, []);

const createTable = () => {

db.transaction((tx) => {

tx.executeSql(

"CREATE TABLE IS NOT EXISTS "
+ "Users "
+ "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER); "

)
  
})

}


const createChannels = () => {

PushNotification.createChannel(

{

channelId: 'test-channel',
channelName: 'Test-Channel'

}

)

}




const getdata = () =>{

try {

// AsyncStorage.getItem('UserData')

// .then ( value => {

//   if (value!= null)
//   {
//   navigation.navigate("Home");
//   }

// })


db.transaction((tx) => {

  tx.executeSql(

    "SELECT Name, Age FROM Users",
    [],

    (tx, results) => {

      var len = results.rows.length;

      if (len > 0) {

        navigation.navigate("Home");
   
      }

    }

  );

})


  
} 

catch (error) 

{
  
console.log (error)

}

}


const setData = async () => {

    if (name.length == 0 || age.length == 0) 

    {

Alert.alert('Warning!', 'Plz Write Your Data.')

    }

else

{

try {
  
dispatch(setName(name));
dispatch(setAge(age));

// var user = {

// Name: name,
// Age: age

// }

// await AsyncStorage.setItem('UserData', JSON.stringify(user));

await db.transaction(async (tx) => {

// await tx.executeSql(
  
//   "INSERT INTO Users (Name, Age) VALUES ('" + name + "', " + age + ") "
  
//   );

await tx.executeSql(
  
  "INSERT INTO Users (Name, Age) VALUES (?, ?) ",
  [name, age]
  
  );

  })

navigation.navigate('Home');

} 

catch (error) 

{

  console.log(error);

}

}

}

return(

    <View
    style = {styles.body}
    >

{/* <Image

style= {styles.logo}
source= {require('../../assets/redux.png')}

/> */}

<Text style = {styles.text}

>

Redux  

</Text>

<TextInput

style = {styles.input}
placeholder = 'Enter Your Name'
onChangeText={(value) => dispatch(setName(value))}

/>

<TextInput
           
           style = {styles.input}
           placeholder = 'Enter Your Age'
           onChangeText={(value) => dispatch(setAge(value))}
           />

<CustomButton
style = {styles.button}
title= 'Login'
color= '#1eb900'
onPressFunction= {setData}

/>
    </View>
)

}


  const styles= StyleSheet.create({

    body: {

      flex: 1,
    //   justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0080ff'

    },

    logo: {
        height: 160,
        width: 175,
        margin: 10,
        
    },

    text: {
        fontSize: 30,
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 100

    },

    input:{
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 15
    },

    button: {
  
      borderRadius: 5
    },

  });