import React, { Component } from 'react'
import { View, StyleSheet, Text} from 'react-native'
import {connect} from 'react-redux'
import {removeDeck} from "../actions"
import {removeTitle} from '../utils/api'
import { white, lightPurp } from '../utils/colors'
import TextButton from './TextButton'


class Deck extends Component {
  setTitle = (title) => {
    if (!title) return

    this.props.navigation.setOptions({
        title 
    })
  }

  delete = () => {
    const {remove, goBack, title, decks } = this.props
    remove()
    goBack()
    removeTitle(title, decks)
  }

  render() {
    const {title, decks} = this.props
    this.setTitle(title);
    return (
      <View style={styles.container}>
         <Text>{title}</Text>
         <TextButton onPress={this.delete} style={{margin: 20}}>Delete Deck</TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: white,
      padding: 15
  },
  deckTitleButton: {
    backgroundColor: lightPurp,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginRight: 40
  },
  deckTitleText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  noDecksText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

function mapStateToProps(decks, {route}) {
  const title = route.params.title
  return ({
          title,
          decks
      }
  )
}

function mapDispatchToProps(dispatch, {route, navigation}) {
  const title = route.params.title
  return {
      remove: () => dispatch(removeDeck(title)),
      goBack: () => navigation.goBack()
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Deck)