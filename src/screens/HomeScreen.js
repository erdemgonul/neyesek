import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker, Circle } from 'react-native-maps';
import Slider from "@brlja/react-native-slider";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ route, navigation }) => {
  const apiKey = 'AIzaSyAGPyw4u1dk7j05KfUQOq8BliHI8MDJMEI';
  const url = 'https://neyesekback.herokuapp.com';
  const window = Dimensions.get('window');
  const { width, height } = window;
  let LATITUD_DELTA = 0.009;
  const LONGITUDE_DELTA = LATITUD_DELTA / 1000 * (width / height)
  let [location, setLocation] = useState(null);
  let [markerLocation, setMarkerLocation] = useState(null);
  let [isLoaded, setLoaded] = useState(false);
  let [areaRadius, setAreaRadius] = useState(250);
  let [restaurants, setRestaurants] = useState(null);
  let [visibleRestaurants, setVisibleRestaurants] = useState([]);

  let mapRef = null;

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
  //first screen loaded
  useEffect(() => {
    getLocationAsync();
  }, []);
  //if location changes
  useEffect(() => {
    findNearbyRestaurants();
  }, [location]);
  //if location changes
  useEffect(() => {
    if (restaurants)
      filterNearbyRestaurants();
  }, [restaurants]);
  //if new location selected
  useEffect(() => {

    if (navigation.getParam('data')) {
      if (navigation.getParam('data').geometry === 'mylocation')
        getLocationAsync();
      else
        setLocationAndMarkerLocation(navigation.getParam('data').geometry.location);
    }
  }, [navigation.getParam('data')]);

  async function findNearbyRestaurants() {
    try {
      if (location) {
        let response = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
          + location.latitude + ',' + location.longitude + '&radius=2000' + '&type=restaurant&key=' + apiKey);
        let responseJson = await response.json();
        if (!responseJson.error_message)
          setRestaurants(responseJson.results);

        fetch(url + '/api/addRestaurants', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurants: responseJson.results
          }),
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getPlaceDetails(place_id) {
    try {
      let response = await fetch(url + '/api/getPlaceDetails', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rest_id: place_id
        }),
      });
      let responseJson = await response.json();
      navigation.navigate('RestaurantScreen',
        { restaurant: responseJson })
    } catch (error) {
      console.error(error);
    }
  }
  function filterNearbyRestaurants() {
    let restaurantArray = [];
    restaurants.forEach(restaurant => {
      if (measure(restaurant.geometry.location.lat, restaurant.geometry.location.lng, location.latitude,
        location.longitude) <= areaRadius) {
        restaurantArray.push(restaurant);
      }
    });
    setVisibleRestaurants(restaurantArray);
  }
  function fitZoomArea(value) {
    if (value % 250 == 0) { // DÜZELTMEYİ UNUTMA
      setAreaRadius(value);

      if (mapRef != null) {
        const points = get4PointsAroundCircumference(markerLocation.latitude, markerLocation.longitude, value);

        mapRef.fitToCoordinates(points, {
          animated: true
        })
        filterNearbyRestaurants();
      }
    }
  }

  async function getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied');
    }

    let x = await Location.getCurrentPositionAsync({});

    setLocation({
      latitude: x.coords.latitude,
      longitude: x.coords.longitude,
      latitudeDelta: LATITUD_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    setMarkerLocation({
      latitude: x.coords.latitude,
      longitude: x.coords.longitude,
    });
    findNearbyRestaurants();
    fitZoomArea(250);

    setLoaded(true);


  };

  return (

    <SafeAreaView style={styles.container}>

      {isLoaded &&
        <View style={{ flex: 1 }}>

          <View>
            <TouchableOpacity onPress={() => { navigation.navigate('ChangeLocation')}} style={styles.location}>
              <View style={{flexDirection:"row"}}>
                <MaterialIcons name="location-on" size={35} style={styles.locationIcon} />
                <View>
                  <Text style={styles.currentLocationText}>Anlık Konumum</Text>
                  <Text style={styles.currentMeterText}>200 metre çevresindeki restaurantlar</Text>
                </View>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={35} style={styles.rightArrowIcon} />
            </TouchableOpacity>
          </View>

          <MapView style={styles.map} region={location} ref={(ref) => mapRef = ref} >
            <Marker coordinate={markerLocation}></Marker>
            <Circle center={markerLocation} radius={areaRadius} fillColor="rgba(20, 0, 0, 0.1)"
              strokeColor="rgba(0,0,0,0.1)" zIndex={2} />
          </MapView>

          <View style={styles.mainView}>

            <View style={{ paddingVertical: 10, marginBottom: 15, paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 18, }}>Açık Restaurantlar</Text>
            </View>
            <FlatList style={{ marginBottom: 10, paddingHorizontal: 10 }}
              data={visibleRestaurants}
              extraData={visibleRestaurants}
              renderItem={({ item }) => (
                <View style={styles.restaurantView}>
                  <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }}
                    onPress={() => { getPlaceDetails(item.place_id) }}>
                    <Text style={styles.restaurantNames}>{item.name}</Text>
                    <View style={{
                      alignSelf: "flex-end",
                      flexDirection: "row", backgroundColor: '#9cafff',
                      borderRadius: 20, width: 70
                    }}>
                      <AntDesign name="star" size={15}
                        style={{
                          color: 'white', marginLeft: 10, alignSelf: "center",
                        }} />
                      <Text style={{
                        fontSize: 12, paddingLeft: 10, paddingVertical: 5, color: 'white',
                        fontWeight: "bold"
                      }}>{item.rating}</Text>

                    </View>
                  </TouchableOpacity>
                </View>

              )}

            />


          </View>


        </View>}
        
    </SafeAreaView>


  );

  function get4PointsAroundCircumference(latitude, longitude, radius) {
    const earthRadius = 6378.1 //Km
    const lat0 = latitude + (-radius / earthRadius) * 1 / 1000 * (180 / Math.PI)
    const lat1 = latitude + (radius / earthRadius) * 1 / 1000 * (180 / Math.PI)
    const lng0 = longitude + (-radius / earthRadius) * 1 / 1000 * (180 / Math.PI) / Math.cos(latitude * Math.PI / 180);
    const lng1 = longitude + (radius / earthRadius) * 1 / 1000 * (180 / Math.PI) / Math.cos(latitude * Math.PI / 180);

    return [{
      latitude: lat0,
      longitude: longitude
    }, //bottom
    {
      latitude: latitude,
      longitude: lng0
    }, //left
    {
      latitude: lat1,
      longitude: longitude
    }, //top
    {
      latitude: latitude,
      longitude: lng1
    } //right
    ]
  }
}
function measure(lat1, lon1, lat2, lon2) {  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000; // meters
}
HomeScreen.navigationOptions = ({ navigation, route }) => {
  return {
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0F1"
  },
  location:{
    flexDirection: "row",
    borderRadius: 40,
    paddingHorizontal: 10,
    backgroundColor:'#ffffff',
    paddingVertical:5,
    marginHorizontal:5,
    marginVertical:5,
    justifyContent:"space-between"
  },
  map: {
    flex: 1 / 2,//height 300 def
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: "#FB4D6A"
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 10
  },
  mainView:{
    marginHorizontal: 5,
    flex: 1,
    backgroundColor: '#FCFCFC',
    marginTop: 10,
    marginBottom:20,
    borderRadius: 15
  },
  restaurantView: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#EBEBEB',
  },
  restaurantNames: {
    fontSize: 15,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  locationIcon:{
    alignSelf: "center",
    marginLeft: 5,
    color:'black'
  },
  rightArrowIcon:{
    alignSelf: "center",
    color:'black'
  },
  currentLocationText:{
    fontSize: 14,
    fontWeight:'bold',
    marginLeft: 10,
    color: '#272727',
  },
  currentMeterText:{
    fontSize: 12,
    marginLeft: 10,
    color: '#272727',
  }
});


export default HomeScreen;
