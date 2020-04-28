import React, { Component } from 'react'
import { View, StyleSheet, Text} from 'react-native'
import {connect} from 'react-redux'
import {removeDeck} from "../actions"
import {removeTitle} from '../utils/api'
import { white, lightPurp, black, gray } from '../utils/colors'
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
    this.setTitle(title)
    let numQuestions = 0
    if (decks[title] && decks[title].questions) numQuestions = decks[title].questions.length  
    return (
      <View style={styles.container}>
         <Text style={styles.deckTitleText}>My {title} Deck</Text>
         <Text style={styles.deckCardText}>{numQuestions} {numQuestions==1 ? 'card' : 'cards'}</Text>
         <TextButton onPress={this.delete} style={{margin: 20}}>Delete Deck</TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: white,
      padding: 15,
      alignItems: 'center',
      marginLeft: 30,
      justifyContent: 'center',
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
    color: black,
    fontSize: 26,
    textAlign: 'center'
  },
  deckCardText: {
    color: gray,
    fontSize: 18,
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