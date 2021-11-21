import React, {useState} from 'react';
import { Button, Text, View }  from 'react-native';

const Message = (props) => {
  const [likeCounts, setLikeCounts] = useState(0);
  return (
    <View style={{ padding: 50 }}>
      <Text style={{ fontSize:30 }}>Hello {props.name}&nbsp; 
        and my age is {props.age}. This is {likeCounts} times liked.
      </Text>
      <Button title="Like" onPress={() => setLikeCounts(likeCounts+1)}/>
    </View>
      );
}

const AllMessages = () => {
  return (
    <View>
      <Message name="React Native" age={5}/>
      <Message name="Java" age={15}/>
      <Message name="Python" age={10}/>
    </View>
  )
}
export default AllMessages;