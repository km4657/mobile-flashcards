import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'
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
        <TouchableOpacity style={styles.deckTitleButton} onPress={() => this.props.navigation.navigate(
          'AddCard',
          { title }
          )}>
            <Text style={styles.deckButtonText}>
              Add Card
            </Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.deckTitleButton} onPress={() => this.props.navigation.navigate(
          'Quiz',
          { title }
          )}>
            <Text style={styles.deckButtonText}>
              Start Quiz
            </Text>
        </TouchableOpacity> 
        <TextButton onPress={this.delete} style={{margin: 20}}>Delete Deck</TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: white,
      borderRadius: 16,
      padding: 20,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 17,
      alignItems: 'center',
      justifyContent: 'center',
      shadowRadius: 3,
      shadowOpacity: 0.8,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
  },
  deckTitleButton: {
    backgroundColor: lightPurp,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  deckTitleText: {
    color: lightPurp,
    fontSize: 26,
    textAlign: 'center'
  },
  deckButtonText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10
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