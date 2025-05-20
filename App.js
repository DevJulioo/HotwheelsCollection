import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CarDetailScreen from './src/screens/CarDetailScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import Toast from 'react-native-toast-message';
import { ItemsProvider } from './src/context/ItemsContext';
import EditCarScreen from './src/screens/EditCarScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ItemsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CarDetail" component={CarDetailScreen} />
          <Stack.Screen name="AddItem" component={AddItemScreen} />
           <Stack.Screen name="EditCar" component={EditCarScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </ItemsProvider>
  );
}
