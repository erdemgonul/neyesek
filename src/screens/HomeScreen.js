import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker, Circle } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import DistanceSetter from '../components/DistanceSetter.js';
import ListItem from '../components/ListItem.js';
import SortModal from '../components/SortModal.js';
import Loading from '../components/Loading.js';
const HomeScreen = ({ navigation }) => {
  const apiKey = 'AIzaSyAGPyw4u1dk7j05KfUQOq8BliHI8MDJMEI';
  const url = 'http://192.168.1.193:3000';
  const window = Dimensions.get('window');
  const { width, height } = window;
  let LATITUD_DELTA = 0.009;
  const LONGITUDE_DELTA = LATITUD_DELTA / 1000 * (width / height)
  let [location, setLocation] = useState(null);
  let [markerLocation, setMarkerLocation] = useState(null);
  let [isLoaded, setLoaded] = useState(false);
  let [modalVisible, setModalVisible] = useState(false);
  let [areaRadius, setAreaRadius] = useState(1000);
  let [restaurants, setRestaurants] = useState(null);
  let [visibleRestaurants, setVisibleRestaurants] = useState(null);
  let [sortMethod, setSortMethod] = useState(false); // false means rating, true means distance
  let [locationName, setLocationName] = useState('Mevcut Konum');
  let [animationEnd, setAnimationEnd] = useState(false);

  let mapRef = null;
  let animationRef = null;

  //first screen loaded
  useEffect(() => {
    getLocationAsync();
  }, []);
 
  //if location changes
  useEffect(() => {
    findNearbyRestaurants();
  }, [location]);
  useEffect(() => {
    if(restaurants && isLoaded)
    filterNearbyRestaurants();
  }, [areaRadius]);
  useEffect(() => {
    if (visibleRestaurants && visibleRestaurants.length > 0) {
     if(!isLoaded){
      
        navigation.setParams({
          isLoading: false,
        });
        setLoaded(true);
     }else{
      fitZoomArea(areaRadius);
     }
      
    }
  }, [visibleRestaurants]);
  //if location changes
  useEffect(() => {
    if (restaurants && restaurants.length > 0)
      filterNearbyRestaurants();
  }, [restaurants]);
  //if new location selected
  useEffect(() => {

    if (navigation.getParam('data')) {
      if (navigation.getParam('data').geometry === 'mylocation') {
        getLocationAsync();
        setLocationName("Mevcut Konumum");
      } else {
        setLocationAndMarkerLocation(navigation.getParam('data').geometry.location);
        setLocationName(navigation.getParam('data').name);
      }
    }
  }, [navigation.getParam('data')]);

  async function getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted')
      setErrorMessage('Permission to access location was denied');
    else {
      let x = await Location.getCurrentPositionAsync({});
      let locationTuple = { lat: x.coords.latitude, lng: x.coords.longitude };
      setLocationAndMarkerLocation(locationTuple);
      
    }
  };
  async function findNearbyRestaurants() {
    try {
      if (location) {
          let response = await fetch(url + '/api/getNearbyRestaurants', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              location: location,
              areaRadius: areaRadius
            }),
          });
          let responseJson = await response.json();
          let arr = [];
          for (let i = 0; i < responseJson.length; i++) {
            let obj = responseJson[i];
            obj.geometry = { "location": null };
            obj.geometry.location = { "lat": 0, "lng": 0 };
            obj.geometry.location.lat = responseJson[i].location.coordinates[1];
            obj.geometry.location.lng = responseJson[i].location.coordinates[0];
            arr.push(obj);           
          }
          console.log(arr);
          setRestaurants(arr);  
      }
    } catch (error) {
      console.error(error);
    }
  }
  function filterNearbyRestaurants() {
    let restaurantArray = [];
    restaurants.forEach(restaurant => {
      let distance = measure(restaurant.geometry.location.lat, restaurant.geometry.location.lng,
        location.latitude,
        location.longitude);
      if (restaurant.isOpen && distance < areaRadius) {
        restaurant.distance = distance;
        restaurantArray.push(restaurant);
      }
    });
    console.log(restaurantArray.length);
    let sortedRestaurants=sortRestaurants(true,restaurantArray);
    setVisibleRestaurants(sortedRestaurants);
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
      let obj = responseJson;
      obj.geometry = { "location": null };
      obj.geometry.location = { "lat": 0, "lng": 0 };
      obj.geometry.location.lat = responseJson.location.coordinates[1];
      obj.geometry.location.lng = responseJson.location.coordinates[0];
      navigation.navigate('RestaurantScreen',
        { restaurant: obj })
    } catch (error) {
      console.error(error);
    }
  }
 
  function fitZoomArea(value) {
   
      if (mapRef != null) {
        const points = get4PointsAroundCircumference(markerLocation.latitude, markerLocation.longitude, value);
              console.log("DENEME");

        mapRef.fitToCoordinates( points,100);
        
      }
  }

  return (

    <SafeAreaView style={styles.container}>

      {isLoaded &&
        <View style={{ flex: 1 }}>

          <DistanceSetter navigation={navigation} onSliderChange={newValue => setAreaRadius(newValue)}
            areaRadius={areaRadius} locationName={locationName} />

          <MapView style={styles.map} region={location} ref={(ref) => mapRef = ref}  onMapReady={() => setTimeout(()=>fitZoomArea(areaRadius),1000)}>
            <Marker coordinate={markerLocation}></Marker>
            <Circle center={markerLocation} radius={areaRadius} fillColor="rgba(20, 0, 0, 0.1)"
              strokeColor="rgba(0,0,0,0.1)" zIndex={2} />
          </MapView>

          <View style={styles.mainView}>
            <View style={styles.filterView}>
              <Text style={{ fontSize: 18, textAlignVertical: "center" }}>Açık Restaurantlar</Text>
              <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }}>
                <FontAwesome name="filter" size={30} style={styles.filterIcon} /></TouchableOpacity>
            </View>
            <FlatList style={{ marginBottom: 10, paddingHorizontal: 10 }}
              data={visibleRestaurants} extraData={visibleRestaurants}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem onClicked={clickedPlaceID => getPlaceDetails(clickedPlaceID)} item={item} />
              )}
            />
          </View>
        </View>
      }

      {!isLoaded &&
        <Loading animationRef={animationRef} />
      }
      <SortModal modalVisible={modalVisible} sortMethod={sortMethod}
        changeSortMethod={() => setSortMethod(!sortMethod)} sortRestaurants={() => sortRestaurants(false)}
        backdropPress={() => setModalVisible(false)} />
    </SafeAreaView>
  );
  function sortRestaurants(isFirstLoad,restaurantsUnsorted) {
    if (!isFirstLoad)
      setModalVisible(!modalVisible);
    let unsortedRestaurants = restaurantsUnsorted;
    if (sortMethod) {
      // sort by rating
      unsortedRestaurants.sort(function (a, b) {
        return +(a.distance > b.distance) || -(a.distance < b.distance);
      });
    } else {
      // sort by distance
      unsortedRestaurants.sort(function (a, b) {
        return (a.rating === null || a.rating === undefined) - (b.rating === null || b.rating === undefined)
          || -(a.rating > b.rating) || +(a.rating < b.rating);
      });
    }
    return unsortedRestaurants;
  }
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
HomeScreen.navigationOptions = ({ navigation }) => {
  if (navigation.state.params && navigation.state.params.isLoading == false) {
    //Hide Header by returning null
    return { headerShown: true };
  } else {
    //Show Header by returning header
    return { headerShown: false };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0F1"
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  map: {
    flex: 1 / 2,//height 300 def
  },
  mainView: {
    marginHorizontal: 5,
    flex: 1,
    backgroundColor: '#FCFCFC',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 15
  },
  filterView: {
    paddingVertical: 10, marginHorizontal: 10, paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: '#EBEBEB'
  },
  filterIcon: {
    alignSelf: "center",
    color: '#3a3a3a',
  },
});


export default HomeScreen;
