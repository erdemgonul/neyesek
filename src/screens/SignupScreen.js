import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
const SignupScreen = ({ navigation }) => {
    let [currentBet, setCurrentBet] = useState(null);

    return (
        <View style={{ flex: 1 }}>

            <View>

                <View style={{ marginTop: 30, marginHorizontal: 30, }}>
                    <Text style={{ color: '#e6e6e6', fontSize: 14 }}>İsim</Text>
                    <TextInput style={styles.inputStyle} />
                </View>
                <View style={{ marginTop: 30, marginHorizontal: 30,}}>
                    <Text style={{ color: '#e6e6e6', fontSize: 14 }}>E-posta</Text>
                    <TextInput style={styles.inputStyle} />
                </View>
                <View style={{ marginTop: 30, marginHorizontal: 30, }}>
                    <Text style={{ color: '#e6e6e6', fontSize: 14 }}>Şifre</Text>
                    <TextInput style={styles.inputStyle} />
                </View>
                <View style={{ marginTop: 30, marginHorizontal: 30,  }}>
                    <Text style={{ color: '#e6e6e6', fontSize: 14 }}>Şifreni onayla</Text>
                    <TextInput style={styles.inputStyle} />
                </View>

            </View>

            <View>
                <TouchableOpacity style={{
                    flexDirection: "row", marginTop: 80, marginHorizontal: 30, height: 50, alignItems: 'center',backgroundColor:'#00ae7d',
                    justifyContent: 'center', borderRadius: 20
                }}>
                    
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: "bold", textAlignVertical: "center" }}>Devam et</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('AuthScreen') }}>
                <Text style={{textAlign:"center",marginTop:20,color:'white'}}>Zaten bir hesabın var mı? Giriş yap</Text>

                </TouchableOpacity>
            </View>

        </View>
    );
};
SignupScreen.navigationOptions = ({ navigation }) => {
    return {

        headerLeft: () => null,
        headerRight: () => null,

        headerTitle: 'kaydol',

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
    inputStyle: {
        fontSize: 16,
        color: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 10
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

export default SignupScreen;