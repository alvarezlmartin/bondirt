import React from "react";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HorariosScreen from "@/components/HorariosScreen";
import CalculadoraScreen from "@/components/CalculadoraScreen";


const Tab = createMaterialBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen
        name="Paradas"
        component={MapScreen}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Horarios"
        component={HorariosScreen}
        options={{
          tabBarLabel: 'Horarios',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clock" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Calculadora"
        component={CalculadoraScreen}
        options={{
          tabBarLabel: 'Calculadora',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calculator" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}