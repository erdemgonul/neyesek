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
             width:300,
              backgroundColor: '#fff',
            }}
            resizeMode="cover"
            source={require('../assets/location.json')}
          />
          <Text style={{ marginTop: 0, fontSize: 20 ,fontStyle:'italic'}}>bölgedeki açık restoranlar aranıyor</Text>
        </View>

    );
};


const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingBottom:100
      },
});

export default Loading;