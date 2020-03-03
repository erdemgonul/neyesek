import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker, Circle } from 'react-native-maps';
import Slider from "@brlja/react-native-slider";
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ route, navigation }) => {
  const apiKey='AIzaSyAGPyw4u1dk7j05KfUQOq8BliHI8MDJMEI';
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
     if(restaurants)
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
          + location.latitude + ',' + location.longitude + '&radius=2000'  + '&type=restaurant&key=' + apiKey);
        let responseJson = await response.json();
        if (!responseJson.error_message)
          setRestaurants(responseJson.results);
        
      }
    } catch (error) {
      console.error(error);
    }
  }

  function filterNearbyRestaurants() {
    let restaurantArray=[];
          restaurants.forEach(restaurant => {
            if(measure(restaurant.geometry.location.lat,restaurant.geometry.location.lng,location.latitude,
              location.longitude)<=areaRadius){
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
    fitZoomArea(250);

    setLoaded(true);


  };

  return (

    <SafeAreaView style={styles.container}>

      {isLoaded &&
        <View style={{ flex: 1 }}>
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
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginHorizontal: 5 }}>

              <Text style={{ fontSize: 16 }}>Mesafeyi Ayarlayın</Text>
              <Text style={{}}>{areaRadius} METRE</Text>
            </View>
            <Slider
              onValueChange={value => fitZoomArea(value)}
              minimumValue={250}
              maximumValue={2000}
              value={areaRadius}
              step={250}
              thumbTintColor={'#FB4D6A'}
              trackStyle={{ backgroundColor: '#EBEBEB' }}
              minimumTrackTintColor={'#dbdbdb'}
            />

          </View>

          <View style={{ marginHorizontal: 10, flex: 1 }}>
            <TouchableOpacity onPress={() => { navigation.navigate('ChangeLocation') }} style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>Konumu Değiştir</Text>
            </TouchableOpacity>
            <View style={{ paddingVertical: 10, marginBottom: 15 }}>
              <Text style={{ fontSize: 18, }}>Açık Restaurantlar</Text>
            </View>
            <FlatList style={{ marginBottom: 10 }}
              data={visibleRestaurants}
              extraData={visibleRestaurants}
              renderItem={({ item }) => (
                <View style={styles.restaurantView}>
                  <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between" }}
                   onPress={() => { navigation.navigate('RestaurantScreen', 
                   { restaurant: item }) }}>
                    <Text style={styles.restaurantNames}>{item.name}</Text>
                    <View style={{ alignSelf:"flex-end",
                      flexDirection: "row", backgroundColor: '#5abab7',
                      borderRadius: 20, width: 70
                    }}>
                      <AntDesign name="star" size={15}
                        style={{
                          color: 'white',marginLeft:10, alignSelf: "center",
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

          <View>
            <TouchableOpacity onPress={() => { navigation.navigate('ChangeLocation') }} style={styles.buttonStyle, { backgroundColor: '#FB4D6A', paddingVertical: 5 }}>
              <Text style={styles.buttonTextStyle}>Tüm Restaurantları Listele</Text>
            </TouchableOpacity>
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
function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
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

  },
  map: {
    flex: 1 / 2,//height 300 def
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: "#9bdeac"
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 10
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
  }
});


export default HomeScreen;
