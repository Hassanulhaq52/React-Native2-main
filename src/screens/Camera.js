import React from 'react';

import {
    View,
    StyleSheet,
    Text,
    
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import CustomButton from './utils/customButton'
import {setTasks} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux'


export default function Camera({navigation, route}) {


const [ { cameraRef }, { takePicture} ] = useCamera(null);
const { tasks } = useSelector(state => state.taskReducer);
const dispatch = useDispatch('');


const captureHandle = async () => {

try {

    const data = await takePicture();
    const filePath = data.uri;
    updateTask(route.params.id, filePath);
   
} 

catch (error) {

    console.log(error);

}

}

const updateTask = (id, path) => {

    const index = tasks.findIndex(task => task.ID === id);

    if (index > -1) {

        let newTasks = [...tasks];
        newTasks[index].Image = path;
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
    
        .then(() => {
    
          dispatch(setTasks(newTasks));
          Alert.alert('Success!', 'Task Image is Saved.');
          navigation.navigate('Task');
          
          })
          
          .catch(err => console.log(err));
    
      }

}


return(

<View style= {styles.body}>


<RNCamera

ref = {cameraRef}
type = {RNCamera.Constants.Type.back}
style = {styles.preview}

>

<CustomButton

title = 'Capture'
color = '#1eb900'
onPressFunction = {() => captureHandle()}

>


    
</CustomButton>

</RNCamera>

     
  


</View>

);

}


const styles = StyleSheet.create({

body: {

flex: 1,
alignItems: 'center'    

},


preview: {

flex : 1,
alignItems: 'center',
justifyContent: 'flex-end'

}



});