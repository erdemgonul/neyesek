import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

const SortModal = ({ modalVisible, sortMethod, changeSortMethod, sortRestaurants,backdropPress }) => {

    return (
        <Modal isVisible={modalVisible} onBackdropPress={() => backdropPress(!modalVisible)}>
            <View style={styles.modalView}>
                <View title="Show modal">
                    <TouchableOpacity style={styles.modalInsideView} onPress={() => { changeSortMethod() }}>
                        <Text style={styles.textSort}>Sıralama </Text>
                        <Text style={styles.text}>
                            {!sortMethod && "Restaurant Puanına Göre"}
                            {sortMethod && "Mesafeye Göre"}
                        </Text>
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
    modalInsideView: {paddingVertical: 10, marginHorizontal: 10, paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-between"},
    textSort: { fontSize: 16, textAlign: "center", fontWeight: "bold" },
    text: { fontSize: 14, textAlign: "center" },
    buttonTextStyle: {color: '#FFFFFF',fontSize: 14,textAlign: "center",paddingVertical: 5},
    buttonStyle: { backgroundColor: '#6CD5AD', paddingVertical: 5, borderRadius: 10, marginHorizontal: 20, marginTop: 20 }
});

export default SortModal;