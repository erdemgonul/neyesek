import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
const AuthScreen = ({ navigation }) => {
    let [currentBet, setCurrentBet] = useState(null);


    return (
        <View style={{ flex: 1 }}>

            <View style={{ flexDirection: "row-reverse", }}>

                <TouchableOpacity style={{
                    marginTop: 20, borderColor: 'gray', borderWidth: 1, height: 40, marginRight: 20,
                    borderRadius: 20, width: 100, justifyContent: "center"
                }} onPress={() => { navigation.navigate('Home') }} >

                    <Text style={{ color: 'white', fontSize: 18, textAlignVertical: "center", textAlign: "center" }}>atla</Text>

                </TouchableOpacity>
            </View>



            <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", flex: 1, }}>


                <Text style={{ color: 'white', fontSize: 30, fontWeight: "bold" }}>PredictApp</Text>
            </View>


            <View style={{ justifyContent: "flex-end", alignContent: "center", flex: 1, marginBottom: 80 }}>


                <TouchableOpacity style={{
                    flexDirection: "row", marginTop: 30, marginHorizontal: 30, borderColor: 'gray', borderWidth: 1, height: 50, alignItems: 'center',
                    justifyContent: 'center', borderRadius: 20
                }}>
                    <FontAwesome name="facebook-square" style={{ color: '#4080FF', marginRight: 20, textAlignVertical: "center" }} size={30} />
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: "bold", textAlignVertical: "center" }}>Facebook ile devam et</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flexDirection: "row", marginTop: 30, marginHorizontal: 30, borderColor: 'gray', borderWidth: 1, height: 50, alignItems: 'center',
                    justifyContent: 'center', borderRadius: 20
                }}>
                    <FontAwesome name="google" style={{ color: '#EA4335', marginRight: 20, textAlignVertical: "center" }} size={30} />
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: "bold", textAlignVertical: "center" }}>Google ile devam et</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flexDirection: "row", marginTop: 30, marginHorizontal: 30, borderColor: 'gray', borderWidth: 1, height: 50, alignItems: 'center',
                    justifyContent: 'center', borderRadius: 20
                }}  onPress={() => { navigation.navigate('SignupScreen') }}>
                    <Feather name="mail" style={{ color: '#EA4335', marginRight: 20, textAlignVertical: "center" }} size={30} />
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: "bold", textAlignVertical: "center" }}>E-posta ile devam et</Text>

                </TouchableOpacity>


            </View>
        </View>
    );
};
AuthScreen.navigationOptions = ({ navigation }) => {
    return {

        headerLeft: () => null,
        headerRight: () => null,

        headerTitle: 'Giriş yap ya da kaydol',

    }
};
const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 10,
        color: '#ffffff',
        marginBottom: 10
    },
    jetonButtonStyle: {
        borderColor: 'white',
        borderWidth: 1,
        height: 50, borderRadius: 10,
        justifyContent: "center",
        width: 70,
        marginLeft: 10
    },
    jettonButtonTextStyle: {
        alignSelf: "center",
        textAlign: "center",
        color: '#FAFAFA',
        fontWeight: "bold",
        fontSize: 14
    },
    jetonInputViewStyle: {
        flexDirection: "row",
        backgroundColor: "#eaeaea",
        height: 50,
        flex: 1,
        borderRadius: 10,
        marginHorizontal: 10
    },
    jetonInputStyle: {
        fontSize: 18,
        marginLeft: 10,
        color: '#272727',
        width: 100
    },
    textView: {
        flexDirection: "row",
        marginTop: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
    },
    textStyle: {
        color: 'white',
        fontSize: 12,
        flex: 1,
        fontWeight: "bold"
    },
    submitButtonStyle: {
        backgroundColor: '#00ae7d',
        height: 60,
        borderRadius: 0,
        justifyContent: "center",
        width: '100%'
    },
    submitButtonTextStyle: {
        alignSelf: "center",
        textAlign: "center",
        color: '#FAFAFA',
        fontWeight: "bold",
        fontSize: 16
    }

});

export default AuthScreen;