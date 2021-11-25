import React, {useEffect, useState} from 'react';
import { ActivityIndicator, Button, FlatList, Text, View, TextInput }  from 'react-native';

export default App = () => {
  const [likeCounts, setLikeCounts] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [newMessage, setNewmessage] = useState('');

  const OnChangeHandler = (text)=> {
    setNewmessage(text)
  }

  const addNewMessage = () => {
    try {
      fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       content: newMessage
      })
});

getMessages();

    }
    catch(error) {
      console.log(error);
    }
  }

  const getMessages = async () => {
    try{
      const response = await fetch('http://localhost:3000/messages');
      const json = await response.json();
      console.log(json);
      setData(json);
    }
    catch (error){
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <View style={{ flex: 1, padding: 54 }}>
      <TextInput 
      placeholder= "Write your message here"
      onChangeText = {OnChangeHandler} />
      <Button 
      title="Add Message"
      onPress={() => addNewMessage()}/>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={{fontSize: 20}}>{item.id}, {item.content}</Text>
          )}
        />
    </View>
  );
  
};