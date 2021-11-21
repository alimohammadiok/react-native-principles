import React from 'react';
import { Text, View }  from 'react-native';

const Message = (props) => {
  return (
    <View style={{ padding: 50 }}>
      <Text style={{ fontSize:30 }}>Hello {props.name} 
      and my age is {props.age}
      </Text>
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