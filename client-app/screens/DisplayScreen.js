import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, TextInput} from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
function DisplayScreen(){
    const { userList, loading, error } = useSelector((state) => state.user);
    const [editing, setEditing] = useState(false);
    const [newGifName, setNewGifName] = useState(userList.gifname); 
    const [imageSource, setImageSource] = useState(null)
    const handleSubmit = async () => {
        try {
           
            const response = await axios.patch(`http://192.168.1.128:3000/api/users/${userList.users}`, {
                gifname: newGifName
            });
          
            console.log(response.data); 
            userList.gifname = newGifName;

            
            setEditing(false); 
        } catch (error) {
            console.log(error); 
        }
    };
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  
    if (error) {
      return <Text>{error}</Text>;
    }

    const imageMap = {
        patrick: require('../assets/Patrick_Star.svg.png'),
        batman: require('../assets/batman.png'),
        spiderman: require('../assets/spiderman.jpg'),        
        spongebob: require('../assets/spongebob.jpg'),
        superman: require('../assets/superman.jpg'),
        default: require('../assets/images.png'), 
      };
      useEffect(() => {
        const lowerCaseGifName = newGifName.toLowerCase(); 
        setImageSource(imageMap[lowerCaseGifName] || imageMap.default);
      }, [newGifName]); 
    
    return (
      <View style={styles.container}>
        {userList && (
          <>
            <Text style={styles.title}>User Details</Text>
            <Text style={styles.info}>Username: {userList.users}</Text>
            {editing ? (
                <TextInput
                    style={styles.input}
                    onChangeText={setNewGifName} 
                    value={newGifName}
                    placeholder="Edit GIF Name"
                />
            ) : (
                <Text style={styles.info}>GIF Name: {newGifName}</Text>
            )}
  
            
            <Image
              source={imageSource}
              style={styles.image}
            />

             <TouchableOpacity onPress={() => setEditing(!editing)}>
                <Text style={styles.editButton}>{editing ? 'Cancel' : 'Edit GIF Name'}</Text>
            </TouchableOpacity>

           
            {editing && (
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
                  )}
          </>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    info: {
      fontSize: 18,
      marginVertical: 5,
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
      marginTop: 20,
    },
  });


export default DisplayScreen;
/* <View>
<TextInput
onChangeText={setUsername}
value={userName}
onSubmitEditing={}


/>
<TouchableOpacity >
    <Image source={require('../client-app/assets/images.png')}/>
    </TouchableOpacity>
{ editing && (
<TouchableOpacity>
    <Text>submit</Text>
</TouchableOpacity>)
}
</View> */