import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput, FlatList, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker, Circle } from 'react-native-maps';
import Slider from "react-native-slider";
const SignInScreen = ({ route, navigation }) => {

  const window = Dimensions.get('window');
  const { width, height } = window;
  let LATITUD_DELTA = 0.009;
  const LONGITUDE_DELTA = LATITUD_DELTA / 1000 * (width / height)
  let [location, setLocation] = useState(null);
  let [markerLocation, setMarkerLocation] = useState(null);
  let [isLoaded, setLoaded] = useState(false);
  let [areaRadius, setAreaRadius] = useState(250);
  let [restaurants, setRestaurants] = useState(null);

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

  useEffect(() => {

    getLocationAsync();

  }, []);
  useEffect(() => {

    if (navigation.getParam('data')) {
      if(navigation.getParam('data').geometry==='mylocation'){
        getLocationAsync();
      }else
      setLocationAndMarkerLocation(navigation.getParam('data').geometry.location);

    }
    


  }, [navigation.getParam('data')]);
  function deneme() {
    console.log("deneme");
  }
  async function findNearbyRestaurants() {
    try {
      if (location) {
        let response = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
          + location.latitude + ',' + location.longitude + '&radius=' + areaRadius + '&type=restaurant&key=AIzaSyBEdjggEtqRTaBc2GNmBNm62t6bv9Q1bKU&opennow');
        let responseJson = await response.json();

        console.log(responseJson);
        if (!responseJson.error_message) {
          setRestaurants(responseJson.results);

        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  function fitZoomArea(value) {
    if (mapRef != null) {
      const points = get4PointsAroundCircumference(markerLocation.latitude, markerLocation.longitude, value);

      mapRef.fitToCoordinates(points, {
        animated: true
      })
      setAreaRadius(value);

      findNearbyRestaurants();
    }
  }


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
  async function getLocationAsync() {
    console.log("fuck");
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
    fitZoomArea(250);

    setLoaded(true);


    findNearbyRestaurants();
  };

  return (

    <View style={styles.container}>

      {isLoaded &&
        <View>
          <MapView style={styles.map} region={location} ref={(ref) => mapRef = ref} >

            <Marker
              coordinate={markerLocation}
              title={'deneme'}
            ></Marker>
            <Circle
              center={markerLocation}
              radius={areaRadius}
              fillColor="rgba(0, 0, 900, 0.1)"
              strokeColor="rgba(0,0,0,0.1)"
              zIndex={2}

            />
          </MapView>


          <View style={{ marginHorizontal: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, }}>

              <Text style={{ fontSize: 16 }}>Mesafeyi Ayarlayın</Text>
              <Text style={{}}>{areaRadius} METRE</Text>
            </View>
            <Slider
              onValueChange={value => fitZoomArea(value)}
              minimumValue={250}
              maximumValue={2000}
              value={areaRadius}
              step={250}
            />

          </View>

          <View style={{ marginHorizontal: 10 }}>
            <TouchableOpacity onPress={() => { navigation.navigate('ChangeLocation') }} style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>Konumu Değiştir</Text>
            </TouchableOpacity>

            <FlatList
              data={restaurants}
              extraData={restaurants}
              renderItem={({ item }) => (
                <View style={styles.restaurantView}>
                  <Text style={styles.restaurantNames}>{item.name}</Text>
                </View>

              )}
            />
          </View>

          <View>

          </View>
        </View>}
    </View>


  );
}
SignInScreen.navigationOptions = ({ navigation, route }) => {
  return {



  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
  restaurantView: {

    borderTopWidth: 1,
    borderColor: '#EBEBEB'
  },
  restaurantNames: {
    fontSize: 15,
    marginVertical: 5,
    marginHorizontal: 10
  }
});


export default SignInScreen;
