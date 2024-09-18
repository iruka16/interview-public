import { View,TextInput, TouchableOpacity, Text , Image, StyleSheet, ActivityIndicator} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "../store";
import { LoginUser } from "../store";
import { useNavigation } from "@react-navigation/native";
import DisplayScreen from "./DisplayScreen";

function LoginScreen(){
 const [userName, setUserName] = useState('')
 const [editing, setEditing] = useState(false)
 const {userList, loading, error} = useSelector((state) => state.user)
 const dispatch = useDispatch()
 const navigation = useNavigation()

 const userLogin = () => {
    if (userName.trim()) {
      dispatch(LoginUser(userName));
      setUserName(''); 
    }
  };

  useEffect(() => {
    if (!loading && userList && Object.keys(userList).length > 0) {
      navigation.navigate('display', { user: userList }); 
    }
  }, [userList, loading]);

    return(
        <View style= {styles.body}>
            <TextInput
            style ={styles.input}
            onChangeText={setUserName}
            value={userName}
           onSubmitEditing={userLogin}
           placeholder="USERNAME"
            
            
            />
             <TouchableOpacity onPress={userLogin} style={styles.button}>
        <Text style={styles.text1}>Log In</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#fff" />}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
    

    )
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'white'
    },
    input:{
        borderwidth: 4,
        borderColor: 'white',
        color:'black'
        
    },
    button: {
        backgroundColor: "#1E90FF",
        padding: 10,
        borderRadius: 5,
      },
      text1: {
        color: "black",
        fontSize: 20,
      },
      error: {
        color: "red",
        marginTop: 10,
      },
})

export default LoginScreen;