import React,{useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from "lottie-react-native";

const Loading = ({ animationRef }) => {
    useEffect(() => {
        if (animationRef != null) {
    
          animationRef.play();
        }
      }, []);
    return (
        <View style={styles.animationContainer}>
          <LottieView
            ref={(ref) => animationRef = ref}
            style={{
              flex: 1,

              backgroundColor: '#fff',
            }}
            source={require('../assets/location.json')}
          />
          <Text style={{ marginTop: 200, fontSize: 16 }}>Etrafındaki Açık Restaurantlar Aranıyor</Text>
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
});

export default Loading;