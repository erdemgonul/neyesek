import React, { useState, useEffect }  from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView ,{Marker} from 'react-native-maps';
const SignInScreen = () => {
    let [location, setLocation] = useState(null);
    let [markerLocation, setMarkerLocation] = useState(null);
    let [isLoaded, setLoaded] = useState(false);

    let [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          
          } else {
            getLocationAsync();
          }
      }, []);



  async function getLocationAsync(){
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied');
    }
   
    let x = await Location.getCurrentPositionAsync({});
    setLocation({
        latitude:x.coords.latitude,
        longitude:x.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    setMarkerLocation({
        latitude:x.coords.latitude,
        longitude:x.coords.longitude,
    });
    setLoaded(true);
  };

  return(
      
          <View style={styles.container}>
         
          { isLoaded &&
            <MapView style={styles.map}      initialRegion={location}>

<Marker
                      coordinate={markerLocation}
                title={'deneme'}
                ></Marker>
          </MapView>
              
          }
          <Text>Konumunu belirle</Text>
       
      </View>
      
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  map:{

      height:500
  }
});

export default SignInScreen;