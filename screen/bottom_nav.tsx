import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListDone from './listDone';
import ListTodo from './todo';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'to-Do') {
          iconName = 'loader';
        } else if (route.name === 'Done') {
          iconName = 'check-square';
        }

        // You can return any component that you like here!
  
        return <FeatherIcon color="#FD6B69" name={iconName} size={36} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name="to-Do" component={ListTodo}/>
      <Tab.Screen name="Done" component={ListDone} />
    </Tab.Navigator>
  );
}

export default BottomTab