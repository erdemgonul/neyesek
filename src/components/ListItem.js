import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ListItem = ({ onClicked, item }) => {

    return (
        <View style={styles.restaurantView}>
            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }}
                onPress={() => { onClicked(item.place_id) }}>
                <Text style={styles.restaurantNames}>{item.name}</Text>
                {item.rating != null ?
                    <View style={styles.ratingView}>
                        <AntDesign name="star" size={15} style={styles.starIcon} />
                        <Text style={styles.ratingText}>{item.rating != null ? item.rating : "yeni"}</Text>
                    </View>
                    :
                    <View style={styles.noRatingView}>
                        <Text style={styles.noRatingText}>Yeni</Text>
                    </View>
                }
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    restaurantView: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#EBEBEB',
    },
    restaurantNames: {
        fontSize: 13,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    starIcon: {
        color: 'white',
        marginLeft: 10,
        alignSelf: "center",
    },
    ratingView: {
        alignSelf: "flex-end",
        flexDirection: "row",
        backgroundColor: '#6CD5AD',
        borderRadius: 20,
        width: 70
    },
    noRatingView: {
        alignSelf: "flex-end",
        flexDirection: "row",
        backgroundColor: 'pink',
        borderRadius: 20,
        paddingHorizontal: 22,

    },
    ratingText: {
        fontSize: 12, paddingLeft: 10, paddingVertical: 5, color: 'white',
        fontWeight: "bold"
    },
    noRatingText: {
        fontSize: 12, paddingVertical: 5, color: 'white',
        fontWeight: "bold"
    }
});

export default ListItem;