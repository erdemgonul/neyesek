import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome } from '@expo/vector-icons';

const SortModal = ({ modalVisible, sortMethod, changeSortMethod, sortRestaurants,backdropPress }) => {

    return (
        <Modal isVisible={modalVisible} onBackdropPress={() => backdropPress(!modalVisible)}>
            <View style={styles.modalView}>
                <View title="Show modal">
                    <TouchableOpacity style={styles.modalInsideView} onPress={() => { changeSortMethod() }}>

                        <Text style={styles.textSort}>Sıralama </Text>
                        <View style={{flexDirection:"row"}}>
                        <Text style={styles.text}>
                            {!sortMethod && "Restaurant Puanına Göre"}
                            {sortMethod && "Mesafeye Göre"}
                        </Text>
                        <FontAwesome name="filter" size={25} style={styles.filterIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { sortRestaurants(false) }}
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>Filtreyi Uygula</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    modalView: { backgroundColor: 'white', justifyContent: "center", alignSelf: "center", width: '100%', borderRadius: 20, paddingVertical: 30 },
    modalInsideView: {paddingVertical: 10, marginHorizontal: 10, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between"},
    textSort: { fontSize: 16, textAlign: "center", fontWeight: "bold",alignSelf:"center",color:'#3a3a3a' },
    text: { fontSize: 15,alignSelf:"center",marginRight:10},
    buttonTextStyle: {color: '#FFFFFF',fontSize: 16,textAlign: "center",paddingVertical: 5},
    buttonStyle: { backgroundColor: '#6CD5AD', paddingVertical: 5, borderRadius: 10, marginHorizontal: 20, marginTop: 20 },
    filterIcon: {
        alignSelf: "center",
        color: '#3a3a3a',
      },
});

export default SortModal;