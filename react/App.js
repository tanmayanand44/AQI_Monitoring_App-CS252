import React from 'react';

import { Button,FlatList, ActivityIndicator, Text, View,TouchableOpacity  } from 'react-native';
import {  StyleSheet, ListView, TextInput, Alert, Platform } from 'react-native';
// import base from "re-base";
import { SearchBar } from 'react-native-elements';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ loggedin:false,username:"",password:"",errors:{},isLoading: true,text: '',search:'',location: null,locationdata:null,latitude:0,longitude:0,aqi:null,city:null,cities: []}
    this.arrayholder = [] ;
    // this.
    this.dataSource=[];
    this.superdata=[];
    // this.findCoordinates();
  }
  loginsingup(val){
    if(val === 0){//signup
      console.log("signup",this.state.username,this.state.password,JSON.stringify({"username":this.state.username, "password":this.state.password}));
      fetch('http://172.27.27.87:3000/new', {
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
          if(responseJson.created!=1){
            Alert.alert("Username taken or server error");
          }
          else{
            Alert.alert("Signup success. Please login");
          }
          // temp.push(obj);
          this.setState({
            // cities: temp,
          }, function(){
          });
        });
    }//login
    else{
     console.log("login",this.state.username,this.state.password);
   fetch('http://172.27.27.87:3000/login', {
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
       if(responseJson.authenticated===1){
         console.log("yes");
         // this.state.loggedin=true;
         this.setState({
           loggedin : true,
         }, function(){
         });
       }
       else{
         Alert.alert("Invalid username/password");
       }
       // temp.push(obj);

     });
     // this.render();
  }
}




  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        // console.log(position["coords"]["latitude"]);
        // const location = JSON.stringify(position);
        this.state.latitude=position["coords"]["latitude"];
        this.state.longitude=position["coords"]["longitude"];

        // this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    // this.isLoading=false;
    // if(this.state.location){
    // console.log(this.state.location);
    // console.log(this.state.location[1]);
    // }
    if(this.state.latitude){
    fetch(`http://api.waqi.info/feed/geo:${this.state.latitude};${this.state.longitude}/?token=6bb4237574756ba29f05cea553bd22576596c11e`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authentication: '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
        }
        // data: {
        //   // secondParam: 'yourOtherValue',
        // },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson["data"]);
        var obj={};
        obj["city_name"]=responseJson["data"]["city"]["name"];
        obj["aqi"]=responseJson["data"]["aqi"];
        obj["latitude"]=responseJson["data"]["city"]["geo"][0];
        obj["longitude"]=responseJson["data"]["city"]["geo"][1];
        this.state.cities.push(obj);
        // console.log(this.state.cities);
        this.setState({
          // isLoading: false,
          locationdata: responseJson,
          city: responseJson["data"]["city"]["name"],
          aqi: responseJson["data"]["aqi"]
        }, function(){
          // this.arrayholder=responseJson['records'];
        });
      });
      }
      fetch(`https://gist.githubusercontent.com/dastagirkhan/00a6f6e32425e0944241/raw/33ca4e2b19695b2b93f490848314268ed5519894/gistfile1.json`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authentication: '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
          }
          // data: {
          //   // secondParam: 'yourOtherValue',
          // },
        })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson);
          this.superdata=responseJson;
        });

  };
  // findcurlocationData = () => {
  //   console.log(this.state.location);
  //   // fetch('http://api.waqi.info/feed/geo:${this.state.location,latitude};${this.state.location.longitude}/?token=6bb4237574756ba29f05cea553bd22576596c11e', {
  //   fetch('http://api.waqi.info/feed/geo:0;0/?token=6bb4237574756ba29f05cea553bd22576596c11e', {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         // Authentication: '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
  //       }
  //       // data: {
  //       //   // secondParam: 'yourOtherValue',
  //       // },
  //     })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log(responseJson)
  //       this.setState({
  //         isLoading: false,
  //         locationdata: responseJson,
  //       }, function(){
  //         // this.arrayholder=responseJson['records'];
  //       });
  //     });
  // };
  SearchFilterFunction(text) {
  //passing the inserted text in textinput
    const newData = this.superdata.filter(function(item) {
      // console.log(item.city);
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      // const itemtype=item.pollutant_id;
      // const pm= "PM2.5";
      // console.log(itemtype,pm,itemtype.indexOf(pm));
      return (itemData.indexOf(textData) > -1);

  });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search:text,
      });
  }
  // componentDidMount(){
  //   return fetch('https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd0000013f616473a0e64816428b1c6085f3844f&format=xml&offset=0&limit=1000', {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         // Authentication: '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
  //       }
  //       // data: {
  //       //   // secondParam: 'yourOtherValue',
  //       // },
  //     })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log(responseJson['records'])
  //       this.setState({
  //         isLoading: false,
  //         dataSource: responseJson['records'],
  //       }, function(){
  //         this.arrayholder=responseJson['records'];
  //       });
  //       this.SearchFilterFunction("");
  //     })
  //     .catch((error) =>{
  //       console.error(error);
  //     });
  // }

  search = text => {
      // console.log(text);
    }
    clear = () => {
     this.search.clear();
   }

 ListViewItemnewCoordinateSeparator = () => {
  //Item sparator view
  return (
    <View
      style={{
        height: 0.3,
        width: '90%',
        backgroundColor: '#080808',
      }}
    />
  );
};
newCoordinates(item){
  // console.log('hetyet');
  //
  // console.log(item);
  fetch(`http://api.waqi.info/feed/geo:${item.lat};${item.lon}/?token=6bb4237574756ba29f05cea553bd22576596c11e`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authentication: '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
      }
      // data: {
      //   // secondParam: 'yourOtherValue',
      // },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson["data"]);
      var obj={};
      obj["city_name"]=responseJson["data"]["city"]["name"];
      obj["aqi"]=responseJson["data"]["aqi"];
      obj["latitude"]=responseJson["data"]["city"]["geo"][0];
      obj["longitude"]=responseJson["data"]["city"]["geo"][1];
      var temp=this.state.cities;
      temp.push(obj);
      console.log(this.state.cities);
      this.setState({
        // isLoading: false,
        // locationdata: responseJson,
        cities: temp,
        // aqi: responseJson["data"]["aqi"]
      }, function(){
        // this.arrayholder=responseJson['records'];
      });
      // console.log(this.state.cities);
      // this.setState({
      //   // isLoading: false,
      //   locationdata: responseJson,
      //   city: responseJson["data"]["city"]["name"],
      //   aqi: responseJson["data"]["aqi"]
      // }, function(){
      //   // this.arrayholder=responseJson['records'];
      // });
    });
    this.render();
};
// function check(age) {
//   return age >= 18;
// }
remove(e,city_name){                   //complex: https://stackoverflow.com/questions/38292105/react-js-how-does-this-function-work-to-delete-json-data
  // console.log(e);
  // console.log(city_name);
  var index = this.state.cities.findIndex(e=>e.city_name==city_name);
    //copy array
    var newAray = this.state.cities.slice();
    //delete element by index
    newAray.splice(index, 1);
    this.setState({cities: newAray});
      // this.setState({listdata: newAray});
}
logout(e){
  this.setState({loggedin:false});
}
savelist(e){
  // this.setState({loggedin:false});
  var send=[];
  for(let i=0;i<this.state.cities.length;i++){
    send.push({"lat":this.state.cities[i].latitude,"lon":this.state.cities[i].longitude});
  }
  console.log(send);
  fetch('http://172.27.27.87:3000/addlist', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authentication: '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
      },
      body : JSON.stringify({"username":this.state.username, "citynames":send})
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
}
showlist(e){
  // this.setState({loggedin:false});
  fetch('http://172.27.27.87:3000/getlist', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authentication: '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
      },
      body : JSON.stringify({"username":this.state.username})
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      var newd=[];
      for(let i=0;i<responseJson.citynames.length;i++){
            fetch(`http://api.waqi.info/feed/geo:${responseJson.citynames[i].lat};${responseJson.citynames[i].lon}/?token=6bb4237574756ba29f05cea553bd22576596c11e`, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                }
              })
              .then((response) => response.json())
              .then((responseJson) => {
                var obj={};
                obj["city_name"]=responseJson["data"]["city"]["name"];
                obj["aqi"]=responseJson["data"]["aqi"];
                obj["latitude"]=responseJson["data"]["city"]["geo"][0];
                obj["longitude"]=responseJson["data"]["city"]["geo"][1];
                newd.push(obj);
                console.log(newd);
              });
      }
      this.setState({
        // isLoading: false,
        // locationdata: responseJson,
        cities: newd,
      }, function(){
      });
    });
    // this.findCoordinates();
}
getcolour(aqi){
  if(aqi<=100)
  return "#00ff00";
  else if(aqi <=200)
  return "#ffff00";
  else return "#ff0000";
}
  render(){

    if(this.state.loggedin){
    return (
      <View style={styles.container}>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Button
          title="Logout"
          color="#ff0000"
          onPress={this.logout.bind(this,1)}
        />
        <Button
            title="Save History"
            color="#00ff00"
            onPress={this.savelist.bind(this,1)}
          />
          <Button
              title="Show History"
              color="#0000ff"
              onPress={this.showlist.bind(this,1)}
            />
      <Button
          title="Find AQI at your location"
          color="#f194ff"
          onPress={this.findCoordinates}
        />
              <FlatList
              data={this.state.cities}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              //Item Separator View
              renderItem={({ item }) => (
                <React.Fragment>
                <Button
                    title={item.city_name+" "+item.aqi}
                    color={this.getcolour(item.aqi)}
                    // value={item.name}
                    // onPress={this.newCoordinates.bind(this,item)}
                  />
                  <Button title="remove" color="#f194ff" onPress={e=>this.remove(e,item.city_name)}
                  />
                  </React.Fragment>
              )}
              enableEmptySections={true}
              style={{ marginTop: 10 }}
              keyExtractor={(item, index) => index.toString()}
            />
            <SearchBar
                  round
                  searchIcon={{ size: 24 }}
                  onChangeText={text => this.SearchFilterFunction(text)}
                  onClear={text => this.SearchFilterFunction('')}
                  placeholder="Type Here..."
                  value={this.state.search}
                  />
                  <FlatList
                  data={this.state.dataSource}
                  ItemSeparatorComponent={this.ListViewItemSeparator}
                  //Item Separator View
                  renderItem={({ item }) => (
                    // Single Comes here which will be repeatative for the FlatListItems
                    // <Text style={styles.textStyle}>{item.name},{item.state} </Text>
                    <Button
                        title={item.name}
                        color="#000000"
                        // value={item.name}
                        onPress={this.newCoordinates.bind(this,item)}
                      />
                      // </Button>
                  )}
                  enableEmptySections={true}
                  style={{ marginTop: 10 }}
                  keyExtractor={(item, index) => index.toString()}
                />
      </View>
    );}
    else{
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
                      secureTextEntry={true}
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
                      secureTextEntry={true}
                      // value={this.state.username}
        />
        <Button
            title="Signup"
            color="#f194ff"
            onPress={this.loginsingup.bind(this,0)}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor:'white',
    marginTop: Platform.OS == 'ios'? 30 : 0
  },
  textStyle: {
    padding: 10,
  },
});
