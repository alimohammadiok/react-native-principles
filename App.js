import React, {useEffect, useState} from 'react';
import { ActivityIndicator, Button, FlatList, Text, View }  from 'react-native';

export default App = () => {
  const [likeCounts, setLikeCounts] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
