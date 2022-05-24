import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { state } from 'react-native-push-notification/component'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setTaskID, setTasks} from '../redux/actions';
import { FlatList } from 'react-native-gesture-handler'
import { Checkbox } from 'react-native-paper'
import CheckBox from '@react-native-community/checkbox'

export default function ToDo({navigation}) {

const { tasks } = useSelector(state => state.taskReducer);
const dispatch = useDispatch('');

useEffect(() => {

getTasks();

}, [])

const getTasks = () => {

AsyncStorage.getItem('Tasks')
.then (tasks => {

const parsedTasks = JSON.parse(tasks);
if (parsedTasks && typeof parsedTasks === 'object' ) {

  dispatch(setTasks(parsedTasks));
  
} 

})

.catch(err => console.log(err));

}

const deleteTask = (id) => {

const filteredTasks = tasks.filter(task => task.ID !== id);
AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))

.then(() => {

dispatch(setTasks(filteredTasks));
Alert.alert('Success!', 'Task removed Successfully.')

})

.catch(err => console.log(err))

}


const checkTask = (id, newValue) => {

  const index = tasks.findIndex(task => task.ID === id);

  if(index > -1) {

    let newTasks = [...tasks];
    newTasks[index].Done = newValue;
    AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))

    .then(() => {

      dispatch(setTasks(newTasks));
      Alert.alert('Success!', 'Task State is Changed.')
      
      })
      
      .catch(err => console.log(err));

  }

}


  return (
    <View style = {styles.body}>

<FlatList

data={tasks.filter (task => task.Done === false)}
renderItem = {({item}) => (

<TouchableOpacity

style = {styles.item}

onPress = {() => {

dispatch(setTaskID(item.ID));
navigation.navigate('Task');

}}

>

<View style = {styles.item_row}>

<CheckBox 

value = {item.Done}
onValueChange = {(newValue) => {checkTask(item.ID, newValue)}}

/>

<View style = {styles.item_body}> 

<Text 

style = {styles.title}
numberOfLines = {1}

>

{item.Title}

</Text>

<Text 

style = {styles.subtitle}
numberOfLines = {1}

>

{item.Desc}

</Text>

</View>

<TouchableOpacity

style = {styles.delete}
onPress = {() => { deleteTask(item.ID) }}

>

<FontAwesome5

name={'trash'}
size = {30}
color = {'#ff3636'}

/>

</TouchableOpacity>

</View>

</TouchableOpacity>

)}

keyExtractor = {( item, index) =>index.toString()}

/>

<TouchableOpacity

style = {styles.button}
onPress = {() => {

dispatch (setTaskID (tasks.length + 1));
navigation.navigate('Task');

}}

>

<FontAwesome5
    
name = {'plus'}
size = {20}
color = {'#ffffff'}

    />



</TouchableOpacity>
        
      {/* <Text>ToDo</Text> */}

    </View>
  )
}

const styles = StyleSheet.create({

body: {
    flex:1 
},

button: {

width: 60,
height: 60,
borderRadius: 30,
backgroundColor: '#0080ff',
justifyContent: 'center',
alignItems: 'center',
position: 'absolute',
bottom: 10,
right: 10,
elevation: 5

},

item: {

marginHorizontal: 10,
marginVertical: 7,
paddingHorizontal: 10,
backgroundColor: '#ffffff',
justifyContent: 'center',
borderRadius: 10,
elevation: 5

},

title: {

color: '#000000',
fontSize: 40,
margin: 5,
fontFamily: 'Tapestry-Regular'


},

subtitle: {

  color: '#999999',
  fontSize: 35,
  margin: 5,
  fontFamily: 'SquarePeg-Regular'
  
  },

  item_row: {

flexDirection: 'row',
alignItems: 'center'

  },

  item_body: {

flex: 1

  },

  delete: {

height: 50,
width:50,
justifyContent: 'center',
alignItems: 'center'

  }

})