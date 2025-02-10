import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown: false,     

    }}>
        <Tabs.Screen name='home' options={{
            tabBarLabel:"Home",
            tabBarIcon:({color,size})=>
          <FontAwesome name="home" size={size} color={color} />, 
        }}/>
        <Tabs.Screen name='booking' options={{
            tabBarLabel:"Booking",
            tabBarIcon:({color,size})=>
        <FontAwesome name="calendar" size={size} color={color} />    
    }}/>
        <Tabs.Screen name='services' options={{
            tabBarLabel:"Services",
            tabBarIcon:({color,size})=>
        <MaterialIcons name="work-outline" size={size} color={color} />
        }}/>
        <Tabs.Screen name='chat' options={{
            tabBarLabel:"Chat",
            tabBarIcon:({color,size})=>
        <Ionicons name="chatbubble" size={size} color={color} />    
    }}/>
        <Tabs.Screen name='profile' options={{
            tabBarLabel:"Profile",
            tabBarIcon:({color,size})=>
        <FontAwesome name="user-circle" size={size} color={color} />      
        }}/>
    </Tabs>
  )
}