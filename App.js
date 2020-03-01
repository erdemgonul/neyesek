import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from './src/screens/HomeScreen';
import BetScreen from './src/screens/BetScreen';
import AuthScreen from './src/screens/AuthScreen';
import SignupScreen from './src/screens/SignupScreen';
import SignInScreen from './src/screens/SignInScreen';

import { TouchableOpacity } from 'react-native';

import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import ChangeLocation from './src/screens/ChangeLocation';
import RestaurantScreen from './src/screens/RestaurantScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    BetScreen: BetScreen,
    AuthScreen: AuthScreen,
    SignupScreen: SignupScreen,
    SignInScreen: SignInScreen,
    ChangeLocation : ChangeLocation,
    RestaurantScreen:RestaurantScreen
  },
  {
    initialRouteName: 'Home',
    unmountInactiveRoutes: true,
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerTitle:'neyesek',
      cardStyle: {
        backgroundColor: '#FCFCFC'
      },
      headerStyle: {
        backgroundColor: '#FB4D6A',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },/*
      headerRight: () => (
        <FontAwesome name="user-circle-o" size={30} style={{ color: 'white', marginRight: 10 }} />
      ),
      /*headerLeft: () => <TouchableOpacity onPress={() => { navigation.openDrawer() }} >
        <FontAwesome name="navicon" size={30} style={{ color: 'white', marginLeft: 10 }} />
      </TouchableOpacity>*/
    }
  });
const drawerNavigator = createDrawerNavigator({
  Home: {
    screen: navigator,
  },
  AuthScreen: {
    screen: AuthScreen,
  }
},
  {
    drawerBackgroundColor: '#292C34',
    drawerType: 'back',
    contentOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      itemStyle: {
        borderTopWidth: 1,
        fontSize: 20,
        borderColor: 'gray',
        paddingHorizontal: 10
      },
      itemsContainerStyle: {
        marginTop: 50,
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
  }
);



export default createAppContainer(drawerNavigator);
