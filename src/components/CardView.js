import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, } from 'react-native';

const CardView = ({ question, backgroundColor, clickedBet }) => {
    let buttons=[];
    let question1=question;
    question.choices.forEach(item => {
        
        
         question1.clicked={
             choice:item.choice,
             rate:item.rate
         };
        buttons.push(
            <TouchableOpacity onPress={() => clickedBet( question1)} style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>{item.choice}</Text>
                <Text style={styles.buttonRateStyle}>{item.rate}</Text>
            </TouchableOpacity>
        );
    }
    );

    return (
        <View style={[styles.backgroundStyle, { backgroundColor: backgroundColor }]}>

            <Text style={styles.headerStyle}>{question.title}</Text>
            <Text style={styles.textStyle}>{question.description}</Text>
            <View style={styles.buttonViewStyle}>
                {buttons}
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        marginBottom: 15,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,

    },

    iconStyle: {
        alignSelf: "center",
        marginLeft: 5
    },
    textInputStyle: {
        fontSize: 20,
        flex: 1,
        marginLeft: 10
    },
    headerStyle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    textStyle: {
        color: '#dedede',
        fontSize: 14
    },
    buttonViewStyle: {
        flexDirection: "row",
        marginTop: 15,
        borderRadius: 10,
        paddingVertical: 10,
    },
    buttonStyle: {
        borderRadius: 10,
        backgroundColor: "#FAFAFA",
        paddingHorizontal: 20,
        marginHorizontal: 5,
        height: 50,
        justifyContent: "center"
    },
    buttonTextStyle: {
        fontWeight: '400',
    },
    buttonRateStyle: {
        fontWeight: 'bold',
        textAlign: "center",
        borderRadius: 8
    }

});

export default CardView;