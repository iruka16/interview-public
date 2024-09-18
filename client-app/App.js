import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DisplayScreen from './screens/DisplayScreen';



export default function App() {
const Stack = createNativeStackNavigator()

  return (
    <Provider store={store}>

      <NavigationContainer>
        <Stack.Navigator initialRouteName='start'>
          <Stack.Screen name='start'   component={LoginScreen} />
          <Stack.Screen name='display' component={DisplayScreen}/>

        </Stack.Navigator>

      </NavigationContainer>
    
    </Provider>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
