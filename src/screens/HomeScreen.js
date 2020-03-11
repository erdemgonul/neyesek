import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, FlatList, SafeAreaView, LayoutAnimation, Platform, UIManager, } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker, Circle } from 'react-native-maps';
import Slider from "@brlja/react-native-slider";
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
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
  let [expanded, setExpanded] = useState(false);
  let [locationName, setLocationName] = useState('Mevcut Konum');

  let [areaRadius, setAreaRadius] = useState(1000);
  let [restaurants, setRestaurants] = useState(null);
  let [visibleRestaurants, setVisibleRestaurants] = useState([]);

  let mapRef = null;
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
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


  function changeLayout() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
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
      if (navigation.getParam('data').geometry === 'mylocation') {
        getLocationAsync();
        setLocationName("Mevcut Konumum");
      } else {
        setLocationAndMarkerLocation(navigation.getParam('data').geometry.location);
        setLocationName(navigation.getParam('data').name);
      }
    }
  }, [navigation.getParam('data')]);

  async function findNearbyRestaurants() {
    try {
      if (location) {

        if(true){
          
          let response = await fetch(url + '/api/getNearbyRestaurants', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             location:location,
             areaRadius:areaRadius
            }),
          });
          console.log("debene");
          let responseJson = await response.json();
          let arr=[];
          for (let i = 0; i < responseJson.length; i++) {
            const element = responseJson[i];
            console.log(responseJson[i]);
            let obj=responseJson[i];
            obj.geometry={"location":null};
            obj.geometry.location={"lat":0,"lng":0};
            obj.geometry.location.lat=responseJson[i].location.coordinates[1];
            obj.geometry.location.lng=responseJson[i].location.coordinates[0];
            arr.push(obj);
          }
          setRestaurants(arr);

          console.log(responseJson);
        }

        /*
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
        */
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
      console.log(place_id);
      let obj=responseJson;
      obj.geometry={"location":null};
      obj.geometry.location={"lat":0,"lng":0};
      obj.geometry.location.lat=responseJson.location.coordinates[1];
      obj.geometry.location.lng=responseJson.location.coordinates[0];
      navigation.navigate('RestaurantScreen',
        { restaurant: obj })
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
    fitZoomArea(areaRadius);
    setLoaded(true);
  };

  return (

    <SafeAreaView style={styles.container}>

      {isLoaded &&
        <View style={{ flex: 1 }}>

          <View>
            <TouchableOpacity onPress={() => { changeLayout() }} >
              <View style={{
                borderRadius: 40,
                paddingHorizontal: 10,
                backgroundColor: '#ffffff',
                paddingVertical: 5,
                marginHorizontal: 5,
                marginVertical: 5,

              }}>

                <View style={{
                  borderBottomWidth: expanded ? 1 : 0, borderColor: '#EBEBEB', paddingBottom: expanded ? 10 : 0,
                  marginBottom: expanded ? 10 : 0,
                }}>

                  <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: expanded ? 10 : 0,
                    marginBottom: expanded ? 10 : 0,
                  }}>

                    <View style={{ flexDirection: "row", }}>
                      <MaterialIcons name="location-on" size={35} style={styles.locationIcon} />
                      <View>
                        <Text style={styles.currentLocationText}>{locationName.substring(0, 40)}{locationName.length > 40 ? "..." : ""}</Text>
                        <Text style={styles.currentMeterText}>{areaRadius} metre çevresindeki restaurantlar</Text>
                      </View>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={35} style={styles.rightArrowIcon} />

                  </View>
                  <View style={{
                    height: expanded ? null : 0, overflow: 'hidden',
                    paddingHorizontal: 10,
                    backgroundColor: '#ffffff',
                    marginHorizontal: 5,

                  }}>

                    <TouchableOpacity onPress={() => { navigation.navigate('ChangeLocation') }}
                      style={{ backgroundColor: '#9bdeac', paddingVertical: 5, borderRadius: 20 }}>
                      <Text style={styles.buttonTextStyle}>Konumunu Değiştir</Text>
                    </TouchableOpacity>

                  </View>
                </View>


                <View style={{
                  height: expanded ? null : 0, overflow: 'hidden',
                  paddingHorizontal: 10,
                  backgroundColor: '#ffffff',
                  marginHorizontal: 5,

                }}>

                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5 }}>
                    <Text style={{ fontSize: 14 }}>Mesafeyi Ayarlayın</Text>
                    <Text style={{ fontSize: 14 }}>{areaRadius} METRE</Text>
                  </View>
                  <Slider
                    onValueChange={value => fitZoomArea(value)}
                    minimumValue={250}
                    maximumValue={2000}
                    value={areaRadius}
                    step={250}
                    thumbTintColor={'#FF7478'}
                    trackStyle={{ backgroundColor: '#EBEBEB' }}
                    minimumTrackTintColor={'#dbdbdb'}
                  />
                </View>

              </View>



            </TouchableOpacity>

          </View>

          <MapView style={styles.map} region={location} ref={(ref) => mapRef = ref} >
            <Marker coordinate={markerLocation}></Marker>
            <Circle center={markerLocation} radius={areaRadius} fillColor="rgba(20, 0, 0, 0.1)"
              strokeColor="rgba(0,0,0,0.1)" zIndex={2} />
          </MapView>

          <View style={styles.mainView}>
            <View style={styles.filterView}>
              <Text style={{ fontSize: 18, textAlignVertical: "center" }}>Açık Restaurantlar</Text>
              <FontAwesome name="filter" size={30} style={styles.filterIcon} />

            </View>
            <FlatList style={{ marginBottom: 10, paddingHorizontal: 10 }}
              data={visibleRestaurants}
              extraData={visibleRestaurants}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.restaurantView}>
                  <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }}
                    onPress={() => { getPlaceDetails(item.place_id) }}>
                    <Text style={styles.restaurantNames}>{item.name}</Text>
                    <View style={styles.ratingView}>
                      <AntDesign name="star" size={15} style={styles.starIcon} />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />

          </View>

        </View>}

      <View>

      </View>

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
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 5
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
  restaurantView: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#EBEBEB',
  },
  restaurantNames: {
    fontSize: 15,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  locationIcon: {
    alignSelf: "center",
    marginLeft: 5,
    color: 'black'
  },
  rightArrowIcon: {
    alignSelf: "center",
    color: 'black'
  },
  filterIcon: {
    alignSelf: "center",
    color: '#3a3a3a',
  },
  starIcon: {
    color: 'white',
    marginLeft: 10,
    alignSelf: "center",
  },
  currentLocationText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#272727',

  },
  currentMeterText: {
    fontSize: 12,
    marginLeft: 10,
    color: '#272727',
  },
  ratingView: {
    alignSelf: "flex-end",
    flexDirection: "row",
    backgroundColor: '#9cafff',
    borderRadius: 20,
    width: 70
  },
  ratingText: {
    fontSize: 12, paddingLeft: 10, paddingVertical: 5, color: 'white',
    fontWeight: "bold"
  }
});


export default HomeScreen;
