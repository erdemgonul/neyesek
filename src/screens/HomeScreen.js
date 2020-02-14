import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar.js';
import CardView from '../components/CardView';
import {FontAwesome} from  '@expo/vector-icons';
const HomeScreen = ( {navigation}) => {
    let [searchText, setSearchText] = useState('');
    let [currentBet, setCurrentBet] = useState(null);
    let [swipeablePanelActive, setSwipeablePanelActive] = useState(false);


    const colorsBackground = ['#D90847', '#F55F4E', '#0096ff', '#9b89f8'];
    const questions = [
        {
            title: 'fenerbahçe yarın kazanır mı?',
            description: 'taraftar yarınki maçı devam mı tamam mı maçı olarak görüyor, sizce sonuç ne olacak?',
            choices: [
                {
                    choice: 'Kazanır',
                    rate: '1.20'
                },
                {
                    choice: 'Berabere',
                    rate: '1.50'
                },
                {
                    choice: 'Kaybeder',
                    rate: '2.20'
                }
            ]
        },
        {
            title: 'başakşehir yarın kazanır mı?',
            description: 'taraftar yarınki maçı devam mı tamam mı maçı olarak görüyor, sizce sonuç ne olacak?',
            choices: [
                {
                    choice: 'Kazanır',
                    rate: '1.20'
                },
                {
                    choice: 'Berabere',
                    rate: '1.50'
                },
                {
                    choice: 'Kaybeder',
                    rate: '2.20'
                }
            ]
        },
        {
            title: 'galatasaray yarın kazanır mı?',
            description: 'taraftar yarınki maçı devam mı tamam mı maçı olarak görüyor, sizce sonuç ne olacak?',
            choices: [
                {
                    choice: 'Kazanır',
                    rate: '1.20'
                },
                {
                    choice: 'Berabere',
                    rate: '1.50'
                },
                {
                    choice: 'Kaybeder',
                    rate: '2.20'
                }
            ]
        },
        {
            title: 'beşiktaş yarın kazanır mı?',
            description: 'taraftar yarınki maçı devam mı tamam mı maçı olarak görüyor, sizce sonuç ne olacak?',
            choices: [
                {
                    choice: 'Kazanır',
                    rate: '1.20'
                },
                {
                    choice: 'Berabere',
                    rate: '1.50'
                },
                {
                    choice: 'Kaybeder',
                    rate: '2.20'
                }
            ]
        },
    ];

    openPanel = () =>
        setSwipeablePanelActive(true);

    closePanel = () =>
        setSwipeablePanelActive(false);

    function addBet(bet) {
        navigation.navigate('BetScreen');
        setCurrentBet(bet);
        openPanel();
        
            
    };


    return (

        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, marginHorizontal: 10, backgroundColor: '#292C34' }}>

                <SearchBar onChangeSearchText={newText => setSearchText(newText)} />
                <FlatList ListHeaderComponent={<Text style={styles.header}>Günün Tahminleri</Text>}
                    data={questions}
                    keyExtractor={
                        question => question.title
                    }
                    renderItem={({ item }) =>

                        <CardView question={item} backgroundColor={colorsBackground[questions.indexOf(item) % colorsBackground.length]}
                            clickedBet={newBet => addBet(newBet)}
                        />
                    }
                />


            </View>
            {/*
            <SwipeablePanel
                 
                noBackgroundOpacity
                barStyle={{backgroundColor:'#e2e4e9'}}
                closeOnTouchOutside
                style={{backgroundColor:'#383c47',borderRadius:30}}
                isActive={swipeablePanelActive}
                onClose={closePanel}
                onPressCloseButton={closePanel}
            >

                {currentBet != null &&
                    <View style={{ marginHorizontal: 20, borderWidth: 0, height: 200, borderRadius: 20, padding: 20,paddingTop:5, borderColor: '#gagaga' }}>
                        <Text style={{ color:'white',textAlign: "center", fontSize: 18, fontWeight: "bold" }}>{currentBet.title}</Text>

                        <View style={{flexDirection:"row",marginTop:20}}>
                        <Text style={{color:'white', fontSize: 12, flex:1,fontWeight:"bold" }}>Tahmin:</Text>

                        <Text style={{color:'white', fontSize: 12 }}>{currentBet.clicked.choice}</Text>
                        </View>
                        <View style={{flexDirection:"row",marginTop:10}}>
                        <Text style={{color:'white', fontSize: 12, flex:1,fontWeight:"bold" }}>Tahmin oranı:</Text>

                        <Text style={{color:'white', fontSize: 12 }}>{currentBet.clicked.rate}</Text>
                        </View>
                        
                        <View style={{ flexDirection: "row",marginTop:40 }}>
                            <View style={{
                                flexDirection: "row",
                                backgroundColor: "#eaeaea",
                                height: 40,
                                flex:1,
                                marginRight: 5,
                                marginBottom: 10,
                                borderRadius: 10
                            }}>
                                <FontAwesome name="money" size={30} style={{
                                    alignSelf: "center",
                                    marginLeft: 10
                                }} />
                                <TextInput placeholder="jeton..."
                                    style={{
                                        fontSize: 18,
                                        marginLeft: 10,
                                        color: '#272727',
                                        width: 100
                                    }}
                                />

                            </View>
                            <Text style={{fontSize:20,textAlignVertical:"center",height:40,marginRight:20,marginLeft:10}}>/ 100</Text>
                            <TouchableOpacity style={{ backgroundColor: '#00ae7d', width: 100, height: 40, borderRadius: 10, justifyContent: "center" }}>
                                <Text style={{ alignSelf: "center", textAlign: "center", color: '#FAFAFA', fontWeight: "bold" }}>ONAYLA</Text>

                            </TouchableOpacity>
                        </View>



                    </View>
                }

            </SwipeablePanel>
                */}
        </View>
    );
};
HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        title:'PredictApp',
        headerLeft: () => <TouchableOpacity  onPress={() => { navigation.openDrawer() }} >
             <FontAwesome name="navicon" size={30} style={{ color: 'white', marginLeft: 10 }} />
        </TouchableOpacity>
        
    }
};
const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 10,
        color: '#ffffff',
        marginBottom: 10
    }
});

export default HomeScreen;