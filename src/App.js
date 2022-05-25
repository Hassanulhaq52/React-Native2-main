import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ToDo from './screens/ToDo';
import Done from './screens/Done';
import Task from './screens/Task';
import Splash from './screens/Splash';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Map from './screens/Map';
import Camera from './screens/Camera'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import {
  StyleSheet,
  Text,
  View,
  Pressable,

} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

function HomeTabs() {

  return(

<Tab.Navigator

screenOptions={

  ({route}) => ({

tabBarIcon: ({ focused, size ,color }) => {
let iconName;

if (route.name === 'To-Do') {

  iconName = 'clipboard-list';
  size = focused ? 25 : 20;

} 

else if (route.name === 'Done') {

  iconName = 'clipboard-check';
  size = focused ? 25 : 20;

} 

return( 

<FontAwesome5  

name= {iconName}
size = {size}
color = {color}

/>

)

}

  })

}

defaultScreenOptions = {{

tabBarActiveTintColor : '#0080ff',
tabBarInactiveTintColor : '#777777',
tabBarLabel : { fontSize : 15, fontWeight: 'bold' }


}}

>

<Tab.Screen name= {'To-Do'} component= {ToDo} />
<Tab.Screen name= {'Done'} component= {Done} />

</Tab.Navigator>

  );
  
}

const RootStack = createStackNavigator();

function App() {

  return (

    <Provider store= {Store}>

      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName='Splash'
          screenOptions={{

            headerTitleAlign: 'center',

            headerStyle: {
              backgroundColor: '#279be8'
            },
            headerTintColor: '#ffffff',

            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',

            },

          }}

        >
          <RootStack.Screen
            name='Splash'
            component={Splash}

            options={{

              headerShown: false

            }}

          />

          <RootStack.Screen
            name='My Tasks'
            component={HomeTabs}

          />

          
           <RootStack.Screen
            name='Task'
            component={Task}

          />

<RootStack.Screen
            name='Camera'
            component={Camera}

          />


        </RootStack.Navigator>

      </NavigationContainer>

    </Provider>

  )
}

export default App;