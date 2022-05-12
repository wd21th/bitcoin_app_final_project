import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 
import Main_Screen from './screens/Main_Screen';
import Settings_Screen from './screens/Settings_Screen';
import Profile_Screen from './screens/Profile_Screen';
import Support_Screen from './screens/Support_Screen';
import Wallet_Screen from './screens/Wallet_Screen';


const Tab = createBottomTabNavigator();

const tabBarOptions={
    showLabel: true,
    style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
        elevation: 0
    }
}


const screenOptions=({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Main_Screen') {
iconName = "home"
size = focused ? 30: 20
         // return <AntDesign name="home" size={30} color="black" />
      } else if (route.name === 'Settings') {
        iconName = "setting"
        size = focused ? 30: 20
      }else if(route.name === 'Wallet'){
        iconName = "wallet"
        size = focused ? 30: 20
      }else if(route.name === 'Profile'){
      size = focused ? 30: 20
        iconName = "profile"
      }else if(route.name === 'Support'){
        size = focused ? 30: 20
        iconName = "customerservice"
      }


      // You can return any component that you like here!
      return <AntDesign name={iconName} size={size} color={color} />;
    },

    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  })


export default function(){
    return(
        <NavigationContainer>
        <Tab.Navigator
        tabBarOptions={tabBarOptions}
        screenOptions={screenOptions}
        >
            
        <Tab.Screen  name="Main_Screen" component={Main_Screen} />
        <Tab.Screen name="Settings" component={Settings_Screen} />
        <Tab.Screen name="Support" component={Support_Screen} />
        <Tab.Screen name="Wallet" component={Wallet_Screen} />
        <Tab.Screen name="Profile" component={Profile_Screen} />

        </Tab.Navigator>
        </NavigationContainer>
        )
    }