import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import SearchBar from '../components/SearchBar';
import { MaterialIcons } from '@expo/vector-icons';

const ChangeLocation = ({ navigation }) => {

  let [autoCompletePlaces, setAutoCompletePlaces] = useState('');
  const apiKey='AIzaSyAGPyw4u1dk7j05KfUQOq8BliHI8MDJMEI';
  useEffect(() => {
    autoComplete('İstanbul');
  }, []);

  async function autoComplete(input) {
    try {
      let response = await fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:tr&input="
        + input + "&types=geocode&key="+ apiKey);
      let responseJson = await response.json();
      setAutoCompletePlaces(responseJson.predictions);
    } catch (error) {
      console.error(error);
    }
  }
  async function changeLocation(location) {
    
    let locData;
    if(location==='mylocation')
      locData={
        "geometry":"mylocation"
      }
    else{
      let response = await fetch("https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
      location.place_id +"&fields=name,rating,formatted_phone_number,geometry&key="+apiKey);
      let responseJson = await response.json();
      locData=responseJson.result
    }
    navigation.navigate('Home', {
    data:locData
    });
  }
  return (

    <View style={styles.container}>
        <View style={{backgroundColor:'#ffffff',borderRadius:10,
      marginTop:0}}>
        <SearchBar onChangeSearchText={newText => autoComplete(newText)}  />
        </View>
        <View style={{backgroundColor:'#ffffff',borderRadius:10,
        paddingHorizontal:15,marginTop:20}}>
        <FlatList
          data={autoCompletePlaces}
          extraData={autoCompletePlaces}
          ListHeaderComponent={
            <TouchableOpacity onPress={() => {changeLocation('mylocation')}} style={styles.mylocation}>
              <MaterialIcons name="my-location" size={30} style={styles.mylocationIcon} />
              <Text style={styles.mylocationText}>Şuanki Konumunu Ayarla</Text>
            </TouchableOpacity>
          }
          renderItem={({ item }) => (
            <View style={styles.locationsView}>
              <TouchableOpacity onPress={() => { changeLocation(item) }}>
                <Text style={styles.locationsText}>{item.description}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
       </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0F1"
  },
  map: {
    height: 300
  },
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#999999',

  },
  buttonTextStyle: {
    color: '#9A9D98',
    fontSize: 18,
    textAlign: "center",
    padding: 5
  },
  locationsView: {

    borderTopWidth: 1,
    borderColor: '#EBEBEB',

  },
  locationsText: {
    fontSize: 16,
    paddingVertical: 10,
    marginHorizontal: 15
  },
  mylocation: {
    borderTopWidth: 1,
    borderColor: '#EBEBEB',
    flexDirection: "row",
    marginHorizontal:10
      },
  mylocationIcon: {
    paddingVertical: 10,
    color: '#DDDDDD'
  },
  mylocationText: {
    textAlignVertical: "center",
    marginHorizontal: 10,
    fontSize: 16,
    paddingVertical: 10,

  },

});


export default ChangeLocation;
