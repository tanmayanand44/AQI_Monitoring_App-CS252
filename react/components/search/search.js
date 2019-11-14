import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';
import {  StyleSheet, ListView, TextInput, Alert, Platform } from 'react-native';
// import base from "re-base";
import { SearchBar } from 'react-native-elements';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,text: '',search:''}
    this.arrayholder = [] ;
  }
  SearchFilterFunction(text) {
  //passing the inserted text in textinput
  const newData = this.arrayholder.filter(function(item) {
    console.log(item.city);
    //applying filter for the inserted text in search bar
    const itemData = item.city ? item.city.toUpperCase() : ''.toUpperCase();
    const textData = text.toUpperCase();
    const itemtype=item.pollutant_id;
    const pm= "PM2.5";
    // console.log(itemtype,pm,itemtype.indexOf(pm));
    return (itemData.indexOf(textData) > -1)&& (itemtype.indexOf(pm) > -1);

  });
  this.setState({
    //setting the filtered newData on datasource
    //After setting the data it will automatically re-render the view
    dataSource: newData,
    search:text,
  });
}
  componentDidMount(){
    return fetch('https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd0000013f616473a0e64816428b1c6085f3844f&format=xml&offset=0&limit=1000', {
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
        console.log(responseJson['records'])
        this.setState({
          isLoading: false,
          dataSource: responseJson['records'],
        }, function(){
          this.arrayholder=responseJson['records'];
        });
        this.SearchFilterFunction("");
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  search = text => {
      console.log(text);
    }
    clear = () => {
     this.search.clear();
   }

 ListViewItemSeparator = () => {
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
  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    // return(
    //   <View style={{flex: 1, paddingTop:20}}>
    //     <FlatList
    //       data={this.state.dataSource}
    //       renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
    //       keyExtractor={({id}, index) => id}
    //     />
    //   </View>
    // );
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
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
            <Text style={styles.textStyle}>{item.city} {item.station} {item.pollutant_avg}</Text>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
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
