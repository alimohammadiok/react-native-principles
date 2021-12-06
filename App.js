import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  View,
  TextInput,
} from 'react-native';

export default App = () => {
  const [likeCounts, setLikeCounts] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [newMessage, setNewmessage] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateMessageId, setUpdateMessageId] = useState(0);
  const OnChangeHandler = text => {
    setNewmessage(text);
  };

  const deleteMessage = (id) => {
    try {
      fetch('http://localhost:3000/messages/' + id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      getMessages();
    } catch (error) {
      console.log(error);
    }
  };
  const confirmUpdate = () => {
    try {
      fetch('http://localhost:3000/messages/' + updateMessageId, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
        }),
      });

      getMessages();
      setIsUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMessage = item => {
    setIsUpdate(true);
    setNewmessage(item.content);
    setUpdateMessageId(item.id);
  };

  const addNewMessage = () => {
    try {
      fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
        }),
      });

      getMessages();
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await fetch('http://localhost:3000/messages');
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <View style={{flex: 1, padding: 54}}>
      <TextInput
        placeholder="Write your message here"
        onChangeText={OnChangeHandler}
        value={newMessage}
      />
      <Button
        title={!isUpdate ? 'Add Message' : 'Update Message'}
        onPress={!isUpdate ? () => addNewMessage() : () => confirmUpdate()}
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Text style={{fontSize: 20}}>
              {item.id}, {item.content}
            </Text>
            <View style={{borderBottomWidth: 2, flexDirection: 'row'}}>
            <Button title="Update" onPress={() => updateMessage(item)} />
            <Button title="Delete" onPress={() => deleteMessage(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};
