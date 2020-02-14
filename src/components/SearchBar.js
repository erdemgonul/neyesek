import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';


const SearchBar = ({ onChangeSearchText }) => {


    return (
        <View style={styles.backgroundStyle}>
            <Feather name="search" size={30} style={styles.iconStyle} />
            <TextInput placeholder="search..." onChangeText={newText => onChangeSearchText(newText)}
                style={styles.textInputStyle}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        flexDirection: "row",
        backgroundColor: "#676767",
        height: 40,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 10
    },
    iconStyle: {
        alignSelf: "center",
        marginLeft: 5
    },
    textInputStyle: {
        fontSize: 18,
        flex: 1,
        marginLeft: 10,
        color: '#272727'
    }

});

export default SearchBar;