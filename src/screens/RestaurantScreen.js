import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
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
      setLocationAndMarkerLocation(navigation.getParam('restaurant').geometry.location);
    }
  }, [navigation.getParam('restaurant')]);
  useEffect(() => {
  }, [restaurant]);
  useEffect(() => {
    setLoaded(true);
  }, [location]);
  function setLocationAndMarkerLocation(latlng) {
    setMarkerLocation({
      latitude: latlng.lat,
      longitude: latlng.lng,
    });
    setLocation({
      latitude: latlng.lat,
      longitude: latlng.lng,
      latitudeDelta: LATITUD_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }
  return (

    <SafeAreaView style={styles.container}>
      {isLoaded &&
        <View style={styles.mainView}>

          <View style={styles.nameView}>
            <Text style={{ fontSize: 20 }}>{restaurant.name}</Text>
          </View>

          <View style={styles.clockView}>
            <AntDesign name="clockcircle" size={20}
              style={styles.clockIcon} />
            <Text style={{ fontSize: 14 }}>Şuan Açık</Text>
          </View>

          <View style={styles.ratingView}>
            <AntDesign name="star" size={20}
              style={styles.ratingIcon} />
            <Text style={styles.ratingText}>{restaurant.rating} / 5</Text>
          </View>

          <View style={styles.addressView}>
            <Text style={{ fontSize: 14 }}>Adres : {restaurant.formatted_address}</Text>
          </View>

          <View style={styles.phoneView}>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>
                Telefon : {restaurant.formatted_phone_number}</Text>
            </View>
            <View >
              <TouchableOpacity style={styles.phoneButtonView}
                onPress={() => Linking.openURL(
                  'tel:' + restaurant.formatted_phone_number)}>
                <MaterialIcons name="call" size={20}
                  style={styles.callIcon} />
                <Text style={{ fontSize: 16, color: 'white' }}>Ara</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View style={{ flex: 2 / 5 }}>
            <FlatList style={{ marginTop: 10, marginHorizontal: 5 }}
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
            <Marker coordinate={markerLocation}></Marker>
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
    backgroundColor: 'white'
  },
  mainView: { flex: 1, marginHorizontal: 10, marginTop: 20 },
  nameView: { paddingVertical: 10, marginBottom: 15, marginHorizontal: 5 },
  clockView: { flexDirection: "row", justifyContent: "flex-end", marginRight: 10 },
  clockIcon: {
    color: '#9bdeac', marginRight: 5, alignSelf: "center",
  },
  ratingView: {
    flexDirection: "row", backgroundColor: '#97aeff',
    borderRadius: 20, width: 140, marginLeft: 5
  },
  ratingIcon: {
    color: 'white', marginLeft: 20, alignSelf: "center",
  },
  ratingText: {
    fontSize: 14, paddingLeft: 10, paddingVertical: 10, color: 'white',
    fontWeight: "bold", fontSize: 14
  },
  addressView: {
    paddingVertical: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  callIcon: {
    color: 'white', marginRight: 5, alignSelf: "center",
  },
  map: {
    marginBottom: 30,
    flex: 4 / 5,//height 300 def
  },
  buttonStyle: {
    borderRadius: 20,
    backgroundColor: '#FB4D6A',
    marginBottom: 20
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 10
  },
  restaurantView: {
    paddingVertical: 8,
    backgroundColor: '#9bdeac',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10
  },
  phoneView: {
    flexDirection: "row", justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#EBEBEB', paddingBottom: 20
  },
  phoneButtonView: {
    paddingVertical: 10,
    backgroundColor: '#FB4D6A',
    borderRadius: 30,
    paddingHorizontal: 25,
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 10
  },
  restaurantNames: {
    color: 'white',
    fontWeight: "bold"
  }
});


export default RestaurantScreen;
