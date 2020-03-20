import { createAppContainer } from 'react-navigation';
import { createStackNavigator ,TransitionPresets} from 'react-navigation-stack';
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
      ...TransitionPresets.SlideFromRightIOS,
      cardStyle: {
        backgroundColor: '#F1F0F1'
      },
      headerStyle: {
        backgroundColor: '#F53B50',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    },
    
  });

export default createAppContainer(navigator);
