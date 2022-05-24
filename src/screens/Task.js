import { StyleSheet, Text, View, Alert, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import CustomButton from './utils/customButton'
import { setTasks } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Task({ navigation }) {

  const { tasks, taskID } = useSelector(state => state.taskReducer);
  const dispatch = useDispatch('');

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [done, setDone] = useState(false);
  const [color, setColor] = useState('white');

  useEffect(() => {

    getTask();

  }, [])

  const getTask = () => {

    const Task = tasks.find(task => task.ID === taskID)

    if (Task) {

      setTitle(Task.Title);
      setDesc(Task.Desc);
      setDone(Task.Done);
      setColor(Task.Color);

    }

    else {

    }

  }

  const setTask = () => {

    if (title.length == 0) {

      Alert.alert('Warning!', 'Please Write Your Task Title.');

    }

    else {

      try {

        var Task = {

          ID: taskID,
          Title: title,
          Desc: desc,
          Done: done,
          Color: color

        }

        const index = tasks.findIndex(task => task.ID === taskID);
        let newTasks = [];

        if (index > -1) {

          newTasks = [...tasks];
          newTasks[index] = Task;

        }

        else {

          newTasks = [...tasks, Task]

        }

        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))

          .then(() => {

            dispatch(setTasks(newTasks));
            Alert.alert('Success!', 'Task Saved Successfully.');
            navigation.goBack();

          })

          .catch(err => console.log(err))

      }

      catch (error) {

        console.log(error);

      }

    }

  }

  return (
    <View style={styles.body}>

      <TextInput

        value={title}
        style={styles.input}
        placeholder='Title'
        onChangeText={(value) => setTitle(value)}

      />

      <TextInput

        value={desc}
        style={styles.input}
        placeholder='Description'
        multiline
        onChangeText={(value) => setDesc(value)}

      />

      <View style={styles.color_bar}>

        <TouchableOpacity

          style={styles.color_white}
        >



        </TouchableOpacity>

        <TouchableOpacity
          style={styles.color_red}
        >

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.color_blue}
        >

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.color_green}
        >

        </TouchableOpacity>

      </View>

      <View style={styles.checkbox}>

        <CheckBox

          value={done}
          onValueChange={(newValue) => setDone(newValue)}

        />

        <Text style={styles.text}>

          is done

        </Text>

      </View>

      <CustomButton


        title='Save Task'
        color='#1eb900'
        style={{ width: '100%' }}
        onPressFunction={setTask}


      />

    </View>
  )
}

const styles = StyleSheet.create({

  body: {

    flex: 1,
    alignItems: 'center',
    padding: 10

  },

  input: {

    width: '100%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10

  },

  checkbox: {

    flexDirection: 'row',
    margin: 10,

  },

  text: {

    fontSize: 20,
    color: '#000000'

  },

  color_bar: {

    flexDirection: 'row',
    height: 50,
    // width:100,
    // width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#555555',
    marginVertical: 10,

  },

  color_white: {

    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,

  },

  color_red: {

    flex: 1,
    backgroundColor: '#d61a1a',
    justifyContent: 'center',
    alignItems: 'center',

  },

  color_blue: {

    flex: 1,
    backgroundColor: '#1070e6',
    justifyContent: 'center',
    alignItems: 'center',

  },

  color_green: {

    flex: 1,
    backgroundColor: '#10e634',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

  },

})