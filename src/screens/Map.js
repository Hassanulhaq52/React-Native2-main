import React from 'react';
import MapView from 'react-native-maps';
import {
    View,
    StyleSheet,
    Text,
    
} from 'react-native';


export default function Map({route}) {

const {city, lat, lng} = route.params;

return(

<View style= {styles.body}>

<Text style={
        // GlobalStyle.CustomFont,
        styles.text1
      }
      >
       {city}

      </Text>


      <MapView

      style= {styles.map}

    initialRegion={{
      // latitude: {lat},
      // longitude: {lng},
      latitude: 38.889069444444,
      longitude: -77.034502777778,
      latitudeDelta: 0.0746,
      longitudeDelta: 0.0564,
     

    }}
  />

  


</View>

);

}


const styles = StyleSheet.create({

body: {

flex: 1,
alignItems: 'center'    

},


text1: {
    fontSize: 40,
    fontFamily: 'SquarePeg-Regular',
    fontWeight: 'bold',
    margin: 5,

  },

  map:{
    width: "100%",
    height: "100%"
  }

});