import React from "react";


import {

    Pressable,
    StyleSheet,
    Text,

  
  } from 'react-native';

const MashButton = (props) => {

    return(

        <Pressable

        onPress={props.onPressFunction}
        hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
        android_ripple={{ color: '#00f' }}
        style={({ pressed }) => [
          { backgroundColor: pressed ? '#d9b793' : props.color },
          styles.button]}
          {...props.style}

      >

        <Text style={styles.text}>

          {props.title}

        </Text>

      </Pressable>


    )

}


const styles = StyleSheet.create({


    text: {
        color: '#000000',
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    
    
      },

      button: {

        height: 50,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center'
    
    
      }, 

})

export default MashButton;