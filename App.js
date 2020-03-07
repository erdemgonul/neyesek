import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import BetScreen from './src/screens/BetScreen';
import AuthScreen from './src/screens/AuthScreen';
import SignupScreen from './src/screens/SignupScreen';
import SignInScreen from './src/screens/SignInScreen';
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
        backgroundColor: '#F1F0F1'
      },
      headerStyle: {
        backgroundColor: '#9bdeac',
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

export default createAppContainer(navigator);
