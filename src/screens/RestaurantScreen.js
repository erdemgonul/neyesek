import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { Linking } from 'expo';
const RestaurantScreen = ({ navigation }) => {

  const window = Dimensions.get('window');
  const { width, height } = window;
  let LATITUD_DELTA = 0.009;
  const LONGITUDE_DELTA = LATITUD_DELTA / 1000 * (width / height)
  let [location, setLocation] = useState(null);
  let [markerLocation, setMarkerLocation] = useState(null);
  let [isLoaded, setLoaded] = useState(false);
  let [restaurant, setRestaurant] = useState(null);

  //first screen loaded
  useEffect(() => {
  }, []);
  //when page loaded
  useEffect(() => {

    if (navigation.getParam('restaurant')) {
      setRestaurant(navigation.getParam('restaurant'));
      setLocationAndMarkerLocation(navigation.getParam('restaurant').location);
    }
  }, [navigation.getParam('restaurant')]);
  useEffect(() => {
    console.log(restaurant);

  }, [restaurant]);
  useEffect(() => {
    setLoaded(true);
  }, [location]);
  function setLocationAndMarkerLocation(latlng) {
    setMarkerLocation({
      latitude: latlng.latitude,
      longitude: latlng.longitude,
    });
    setLocation({
      latitude: latlng.latitude,
      longitude: latlng.longitude,
      latitudeDelta: LATITUD_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }
  return (

    <SafeAreaView style={styles.container}>
      {isLoaded &&
        <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>

          <View style={{ flex: 1 / 12, paddingVertical: 10, marginBottom: 15 }}>
            <Text style={{ fontSize: 20 }}>{restaurant.name}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <AntDesign name="clockcircle" size={20}
              style={{
                color: '#9bdeac', marginRight: 5, alignSelf: "center",
              }} />
            <Text style={{ fontSize: 14 }}>Şuan Açık</Text>

          </View>

          <View style={{
            flexDirection: "row", backgroundColor: '#9bdeac',
            borderRadius: 20, width: 140
          }}>
            <AntDesign name="star" size={20}
              style={{
                color: 'white', marginLeft: 20, alignSelf: "center",
              }} />
            <Text style={{
              fontSize: 14, paddingLeft: 10, paddingVertical: 10, color: 'white',
              fontWeight: "bold", fontSize: 14
            }}>{restaurant.rating} / 5</Text>

          </View>
          <View style={{ paddingVertical: 10, marginBottom: 15, marginHorizontal: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 15 }}>Adres : {restaurant.vicinity}</Text>
          </View>
          <View>
            <FlatList style={{ marginBottom: 10, marginHorizontal: 5 }}
              data={restaurant.types}
              extraData={restaurant.types}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <View style={styles.restaurantView}>

                  <Text style={styles.restaurantNames}>{item}</Text>

                </View>

              )}
              numColumns={3}
              horizontal={false}
            />
          </View>

          <MapView style={styles.map} region={location} ref={(ref) => mapRef = ref} >

            <Marker
              coordinate={markerLocation}
              title={'deneme'}
            ></Marker>

          </MapView>

          <TouchableOpacity onPress={() => Linking.openURL('google.navigation:q=' + //add ios support
            location.latitude + "+" + location.longitude)}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Haritada Göster</Text>
          </TouchableOpacity>



        </View>
      }
    </SafeAreaView>


  );

}
RestaurantScreen.navigationOptions = ({ navigation, route }) => {
  return {



  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  map: {
    marginVertical: 50,
    flex: 4 / 5,//height 300 def
  },
  buttonStyle: {
    borderRadius: 20,
    backgroundColor: '#FB4D6A'
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 10
  },
  restaurantView: {
    paddingVertical: 8,
    backgroundColor: '#9c559c',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10
  },
  restaurantNames: {
    color: 'white',
    fontWeight: "bold"
  }
});


export default RestaurantScreen;
