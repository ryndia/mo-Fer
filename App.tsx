import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NewTodo, ListTodo, ListDone, BottomTab } from "./screen";

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='BottomTab'
      >
        <Stack.Screen
          name="ListTodo"
          component={ListTodo}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="NewTodo"
          component={NewTodo}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ListDone"
          component={ListDone}
          options={{
            headerShown: false
          }}
          />
          <Stack.Screen
            name='BottomTab'
            component={BottomTab}
            options={{
              headerShown: false
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}