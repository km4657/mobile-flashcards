import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import { lightPurp, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import Constants from 'expo-constants'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator();

const TabNav = () => (
    <Tabs.Navigator
    initialRouteName="Deck List"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;
        if (route.name === "Add Deck") {
          icon = (
            <FontAwesome name="plus-square" size={size} color={color} />
          );
        } else if (route.name === "Deck List") {
          icon = (
            <Ionicons name="ios-bookmarks" size={size} color={color} />
          );
        }
        return icon;
      }
    })}
    tabBarOptions={{
      activeTintColor: Platform.OS === "ios" ? lightPurp : white,
      style: {
        height: 80,
        backgroundColor: Platform.OS === "ios" ? white : lightPurp,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }}>
      <Tabs.Screen name="Add Deck" component={AddDeck} />
      <Tabs.Screen name="Deck List" component={DeckList} />
    </Tabs.Navigator>
)

const Stack = createStackNavigator()
const MainNav = () => (
  <Stack.Navigator headerMode="screen">
      <Stack.Screen
          name="Home"
          component={TabNav}
          options={{headerShown: false}}/>
      <Stack.Screen
          name="Deck"
          component={Deck}
          options={{
              headerTintColor: white, headerStyle: {
                  backgroundColor: lightPurp,
              }
          }}/>
      <Stack.Screen
          name="AddCard"
          component={AddCard}
          options={{
              headerTintColor: white, headerStyle: {
                  backgroundColor: lightPurp,
              }
          }}/>
      <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{
              headerTintColor: white, headerStyle: {
                  backgroundColor: lightPurp,
              }
          }}/>
  </Stack.Navigator>
)

export default class App extends Component {
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <UdaciStatusBar backgroundColor={lightPurp} barStyle="light-content" />
          <MainNav/>
        </NavigationContainer>
      </View>
      </Provider>
    )
  }
}