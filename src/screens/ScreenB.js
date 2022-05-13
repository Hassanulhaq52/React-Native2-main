// import React from 'react';


// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import{
//   StyleSheet,
//   Text,
//   View,
//   Pressable,


// } from 'react-native';

// export default function ScreenB({navigation, route}){

//   const {ItemName, ItemId} = route.params;

//     const  onPressHandler = () =>{
//     navigation.navigate('Screen_A', {Message: 'Message from B'});
//     // navigation.goBack();
//     // navigation.setParams({ItemId: 14});
//     }
//     return(
//       <View style = {styles.body}>
//         <Text style = {styles.text1}> Screen B</Text>
//         <Pressable 
//         onPress={onPressHandler} 
//         style = {({ pressed}) => ({backgroundColor: pressed? '#0a79a8': '#5edaff'})}>
        
//           <Text 
//           style= {
//           styles.button
//           }>
//             Go Back to Screen A
            
//             </Text>

//         </Pressable>
        

//         <Text style = {styles.text}> {ItemName}</Text>
//         <Text style = {styles.text}> ID: {ItemId}</Text>
//       </View>
//     )
//   }

//   const styles= StyleSheet.create({

//     body:{
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center'
//     },
  
//   text:{
//     fontSize: 35,
//     fontWeight: 'bold',
//     margin: 10,
    
//   },

//   text1:{
//     fontSize: 70,
//     // fontWeight: 'bold',
//     margin: 10,
//     fontFamily: 'SquarePeg-Regular',
    
//   },

//   button:{
//     fontFamily: 'Tapestry-Regular',
//     fontSize: 35,
//     padding: 10
//   }
  
//   }) 