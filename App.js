import { createAppContainer } from 'react-navigation';
import { createStackNavigator ,TransitionPresets} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import ChangeLocation from './src/screens/ChangeLocation';
import RestaurantScreen from './src/screens/RestaurantScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
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
