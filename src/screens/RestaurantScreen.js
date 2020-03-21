import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView,PixelRatio } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { Linking } from 'expo';
const RestaurantScreen = ({ navigation }) => {

  const window = Dimensions.get('window'),
        { width, height } = window;
  let LATITUD_DELTA = 0.009;
  const LONGITUDE_DELTA = LATITUD_DELTA / 1000 * (width / height);
  const DEFAULT_PADDING = { top: 60, right: 60, bottom: 60, left: 60 };
  let [location, setLocation] = useState(null),
      [markerLocation, setMarkerLocation] = useState(null),
      [isLoaded, setLoaded] = useState(false),
      [restaurant, setRestaurant] = useState(null),
      [userLocation, setUserLocation] = useState(null);
  let mapRef=null;
  //when page loaded with restaurant
  useEffect(() => {
    if (navigation.getParam('restaurant')) {
      setRestaurant(navigation.getParam('restaurant'));
      setLocationAndMarkerLocation(navigation.getParam('restaurant').geometry.location);
    }
  }, [navigation.getParam('restaurant')]);

  useEffect(() => {
    setLoaded(true);


  }, [userLocation]);
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
    setUserLocation(navigation.getParam('userLocation'));
  }
  function fitMarkers(){
    if(mapRef)
    mapRef.fitToCoordinates([markerLocation, userLocation], {
      edgePadding: generateEdgePadding(DEFAULT_PADDING),
      animated: true,
    });
  }

  function generateEdgePadding(edgePadding){

    if(Platform.OS === 'ios'){ return edgePadding; }
    
    return { top: PixelRatio.getPixelSizeForLayoutSize(edgePadding.top), right: PixelRatio.getPixelSizeForLayoutSize(edgePadding.right),
       left: PixelRatio.getPixelSizeForLayoutSize(edgePadding.left), bottom: PixelRatio.getPixelSizeForLayoutSize(edgePadding.bottom) }; 
      };

  return (

    <SafeAreaView style={styles.container}>
      {isLoaded &&
        <View style={styles.mainView}>

          <View style={styles.nameView}>
            <Text style={{ fontSize: 20 }}>{restaurant.name}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {restaurant.rating ?
              <View style={styles.ratingView}>
                <AntDesign name="star" size={20}
                  style={styles.ratingIcon} />
                <Text style={styles.ratingText}>{restaurant.rating} / 5</Text>
              </View>
              :
              <View style={styles.noRatingView}>
                <Text style={styles.noRatingText}>Yeni Restaurant!</Text>
              </View>
            }
            <View style={styles.clockView}>
              <AntDesign name="clockcircle" size={20}
                style={styles.clockIcon} />
              <Text style={{ fontSize: 14, alignSelf: "center" }}>Şuan Açık</Text>
            </View>


          </View>


          {restaurant.formatted_address &&
            <View style={styles.addressView}>
              <Text style={{ fontSize: 14 }}>Adres : {restaurant.formatted_address}</Text>
            </View>
          }
          {restaurant.formatted_phone_number &&
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
                  <Text style={{ fontSize: 16, color: 'white',fontWeight:"bold"}}>Ara</Text>
                </TouchableOpacity>
              </View>

            </View>
          }
          <View style={{ flex: 2 / 5 }}>

          </View>

          <MapView style={styles.map} initialRegion={location} ref={(ref) => mapRef = ref} onMapReady={()=> setTimeout(()=>fitMarkers(),1000)} ref={(ref) => mapRef = ref}  >
            <Marker coordinate={markerLocation} tracksViewChanges={false}>
              <MaterialIcons name="location-on" size={50} style={{ color: '#F53B50' }}></MaterialIcons>
            </Marker>
            <Marker coordinate={userLocation} tracksViewChanges={false}>
              <MaterialIcons name="person-pin-circle" size={70} style={{ color: 'black' }}></MaterialIcons>
            </Marker>
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
RestaurantScreen.navigationOptions = ({ }) => {
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
  clockView: { flexDirection: "row", justifyContent: "flex-end", marginRight: 10, alignSelf: "center" },
  clockIcon: {
    color: '#6CD5AD', marginRight: 5, alignSelf: "center",
  },
  ratingView: {
    flexDirection: "row", backgroundColor: '#6CD5AD', alignSelf: "center",
    borderRadius: 20, marginLeft: 5
  },
  noRatingView: {
    flexDirection: "row", backgroundColor: '#6CD5AD', alignSelf: "center",
    borderRadius: 20, marginLeft: 5
  },
  ratingIcon: {
    color: 'white', marginLeft: 20, alignSelf: "center",
  },
  ratingText: {
    fontSize: 14, paddingLeft: 10, paddingVertical: 10, color: 'white',
    fontWeight: "bold", fontSize: 12, paddingRight: 20
  },
  noRatingText: {
    fontSize: 14, paddingVertical: 10, color: 'white',
    fontWeight: "bold",paddingHorizontal:30
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
    borderRadius: 10,
    backgroundColor: '#FB4D6A',
    marginBottom: 20
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
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
    borderColor: '#EBEBEB', paddingBottom: 20, marginTop: 20
  },
  phoneButtonView: {
    paddingVertical: 10,
    backgroundColor: '#FB4D6A',
    borderRadius: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 10
  },

});


export default RestaurantScreen;
