import React, { useState, useEffect }  from 'react';
import { Platform, Text, View, StyleSheet ,Dimensions,TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView ,{Marker,Circle} from 'react-native-maps';
import Slider from "react-native-slider";
const SignInScreen = () => {

const window = Dimensions.get('window');
const { width, height }  = window;
let LATITUD_DELTA=0.009;
const LONGITUDE_DELTA = LATITUD_DELTA/1000 * (width / height)
    let [location, setLocation] = useState(null);
    let [markerLocation, setMarkerLocation] = useState(null);
    let [isLoaded, setLoaded] = useState(false);
    let [areaRadius, setAreaRadius] = useState(250);
    let  mapRef = null;
    useEffect(() => {
      
        if (Platform.OS === 'android' && !Constants.isDevice) {

          } else {
            getLocationAsync();
          }
      }, []);


  function fitZoomArea(value){
    const points= get4PointsAroundCircumference(markerLocation.latitude,markerLocation.longitude, value);
  
    mapRef.fitToCoordinates(points, {
      animated: true
    })
    setAreaRadius(value);
  }


  function get4PointsAroundCircumference(latitude, longitude, radius) {
    const earthRadius = 6378.1 //Km
    const lat0 = latitude + (-radius / earthRadius) * 1/1000 * (180 / Math.PI)
    const lat1 = latitude + (radius / earthRadius) * 1/1000 * (180 / Math.PI)
    const lng0 = longitude + (-radius / earthRadius) * 1/1000 * (180 / Math.PI) / Math.cos(latitude * Math.PI / 180);
    const lng1 = longitude + (radius / earthRadius) *  1/1000 * (180 / Math.PI) / Math.cos(latitude * Math.PI / 180);
  
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
  async function getLocationAsync(){
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied');
    }

    let x = await Location.getCurrentPositionAsync({});
    setLocation({
        latitude:x.coords.latitude,
        longitude:x.coords.longitude,
        latitudeDelta: LATITUD_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
    setMarkerLocation({
        latitude:x.coords.latitude,
        longitude:x.coords.longitude,
    });
    setLoaded(true);
    if(mapRef!=null)
    fitZoomArea(250);
  
  };

  return(

          <View style={styles.container}>

          { isLoaded &&
            <MapView style={styles.map}      initialRegion={location} ref={(ref) => mapRef = ref}>
                
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

          }
          <View style={{marginHorizontal:10}}>
          <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10,}}>
            
            <Text style={{fontSize:16}}>Mesafeyi Ayarlayın</Text>
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
         

          <View style={{}}>
          <TouchableOpacity  style={styles.buttonStyle}>
          <Text  style={styles.buttonTextStyle}>Konumu Değiştir</Text>
            </TouchableOpacity>
           
          </View>
      </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  map:{

      height:300
  },
  buttonStyle:{
    borderWidth:1,
    borderRadius:10,
    borderColor:'#999999',
    width:200
  },
  buttonTextStyle:{
    color:'#9A9D98',
    fontSize:18,
    textAlign:"center",
    padding:5
  }
});

export default SignInScreen;
