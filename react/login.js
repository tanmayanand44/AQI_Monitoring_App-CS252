import React from 'react';

import { Button,FlatList, ActivityIndicator, Text,Label,View,TouchableOpacity  } from 'react-native';
import {  StyleSheet, ListView, TextInput, Alert, Platform } from 'react-native';
// import base from "re-base";
import { SearchBar } from 'react-native-elements';
// import {FetchExample } from './Home.js'
export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state ={ loggedin:false,username:"",password:"",errors:{}}
  }

  loginsingup(val){
    if(val === 0){//signup
      console.log("signup",this.state.username,this.state.password,JSON.stringify({"username":this.state.username, "password":this.state.password}));
      fetch('http://172.24.241.88:3000/new', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authentication: '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
          },
          body : JSON.stringify({"username":this.state.username, "password":this.state.password})
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);

          // temp.push(obj);
          this.setState({
            // cities: temp,
          }, function(){
          });
        });
    }//login
    else{
     console.log("login",this.state.username,this.state.password);
   fetch('http://172.24.241.88:3000/login', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         // Authentication: '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
       },
       body : JSON.stringify({"username":this.state.username, "password":this.state.password})
     })
     .then((response) => response.json())
     .then((responseJson) => {
       console.log(responseJson);

       // temp.push(obj);
       this.setState({
         // cities: temp,
       }, function(){
       });
     });
     // this.render();
  }
}
  render(){
  return(
    <View>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text>Login</Text>

    <Text>Username</Text>
    <TextInput
                  onChangeText = {(username) => this.setState({username})}
                  placeholder="Enter username here"
                  // value={this.state.username}
    />

    <Text>Password</Text>
    <TextInput
                  onChangeText={(password)=>this.setState({password})}
                  placeholder="Enter password here"

                  // value={this.state.username}
    />
    <Button
        title="Login"
        color="#f194ff"
        onPress={this.loginsingup.bind(this,1)}
      />

    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text>Signup</Text>
    <Text>Username</Text>
    <TextInput
                  onChangeText = {(username) => this.setState({username})}
                  placeholder="Enter username here"
                  // value={this.state.username}
    />

    <Text>Password</Text>
    <TextInput
                  onChangeText={(password)=>this.setState({password})}
                  placeholder="Enter password here"

                  // value={this.state.username}
    />
    <Button
        title="Login"
        color="#f194ff"
        onPress={this.loginsingup.bind(this,0)}
      />
    </View>
  );
}
}
