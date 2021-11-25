import React, {useEffect, useState} from 'react';
import {
  Button,
  Text,
  View,
  FlatList,
  TextInput
} from 'react-native';

const App = props => {
  const [likeCounts, setLikeCounts] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const onChangeHandler = val => {
    setNewMessage(val);
  };

  const getMessages = async () => {
    try {
      const response = await fetch('http://localhost:3000/messages');
      const json = await response.json();
      setMessages(json);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewMessage = async () => {
    try {
      await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          likeCounts: '0',
        }),
      });
      getMessages();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <View style={{padding: 50}}>
      <TextInput
        style={{borderBottomWidth: 2, fontSize: 20}}
        placeholder="Message"
        onChangeText={onChangeHandler}
      />
      <Button title="Submit" onPress={() => addNewMessage()} />
      <FlatList
        data={messages}
        renderItem={({item}) => (
          <Text style={{fontSize: 20}}>
            {item.id}, {item.content}
          </Text>
        )}
      />
    </View>
  );
};

export default App;
