import React, { useState } from 'react';
import { View, StyleSheet, Text ,TouchableOpacity,UIManager,LayoutAnimation} from 'react-native';
import { MaterialIcons} from '@expo/vector-icons';
import Slider from "@brlja/react-native-slider";


const DistanceSetter = ({ navigation ,onSliderChange , areaRadius, locationName}) => {
    let [expanded, setExpanded] = useState(false);
  
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    function changeLayout() {

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
      }

    return (
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
                  style={{ backgroundColor: '#6CD5AD', paddingVertical: 5, borderRadius: 15 }}>
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
                onValueChange={value => onSliderChange(value)}
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
     
    );
};


const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
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
  modalInsideView: {
    paddingVertical: 10, marginHorizontal: 10, paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-between",
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
    backgroundColor: '#6CD5AD',
    borderRadius: 20,
    width: 70
  },
  ratingText: {
    fontSize: 12, paddingLeft: 10, paddingVertical: 5, color: 'white',
    fontWeight: "bold"
  }
});
export default DistanceSetter;