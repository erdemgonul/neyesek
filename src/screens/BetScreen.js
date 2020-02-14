import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

import { HeaderBackButton } from 'react-navigation-stack';
const BetScreen = ({ navigation }) => {
    let [currentBet, setCurrentBet] = useState(null);


    return (

        <View style={{ flex: 1 }}>

            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, paddingBottom: 20 }}>

                <View style={{ flexDirection: "row", marginTop: 20, marginHorizontal: 20 }}>
                    <FontAwesome name="question-circle-o" style={{ color: '#9b89f8', marginRight: 20 }} size={30} />
                    <Text style={{ color: 'white', fontSize: 14, flex: 1, fontWeight: "bold", textAlignVertical: "center" }}>Angers - Rennes</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10, marginHorizontal: 20, paddingHorizontal: 10 }}>
                    <MaterialIcons name="question-answer" size={20} style={{ color: '#9b89f8', marginRight: 15 }} />
                    <Text style={{ color: 'white', fontSize: 14, flex: 1, fontWeight: "bold" }}>Kazanır</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10, marginHorizontal: 20, paddingHorizontal: 10 }}>
                    <Ionicons name="ios-stats" size={20} style={{ color: '#9b89f8', marginRight: 20 }} />
                    <Text style={{ color: 'white', fontSize: 14, flex: 1, fontWeight: "bold" }}>Oynayanların %33'ü bu tahmini yaptı</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: 10, marginTop: 10 }}>
                    <MaterialIcons name="people" size={25} style={{ color: '#f96e45', marginRight: 10 }} />
                    <Text style={{ color: 'white', textAlignVertical: "center", fontWeight: 'bold', fontSize: 12 }}>1000+ kişi oynadı</Text>
                </View>

            </View>

            <View style={{ position: "absolute", bottom: 0, borderTopWidth: 1, borderTopColor: 'gray', paddingTop: 20, }}>

                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity style={styles.jetonButtonStyle}>
                        <Text style={styles.jettonButtonTextStyle}>50</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.jetonButtonStyle}>
                        <Text style={styles.jettonButtonTextStyle}>100</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.jetonButtonStyle}>
                        <Text style={styles.jettonButtonTextStyle}>500</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.jetonButtonStyle}>
                        <Text style={styles.jettonButtonTextStyle}>1000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.jetonButtonStyle}>
                        <Text style={styles.jettonButtonTextStyle}>Tümü</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <View style={styles.jetonInputViewStyle}>
                        <FontAwesome name="money" size={30} style={{ alignSelf: "center", marginLeft: 10 }} />
                        <TextInput placeholder="jeton..." style={styles.jetonInputStyle} />
                    </View>
                </View>

                <View style={styles.textView}>
                    <Text style={styles.textStyle}>Tahmin:</Text>
                    <Text style={{ color: 'white', fontSize: 12 }}>DENEME</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.textStyle}>Tahmin:</Text>
                    <Text style={{ color: 'white', fontSize: 12 }}>DENEME</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.textStyle}>Tahmin:</Text>
                    <Text style={{ color: 'white', fontSize: 12 }}>DENEME</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.submitButtonStyle}>
                        <Text style={styles.submitButtonTextStyle}>HEMEN O YNA</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};
BetScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'Tahmin Onayla',
        headerLeft: () => <HeaderBackButton onPress={() => { navigation.goBack(); }} tintColor="#fff" />,
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

export default BetScreen;