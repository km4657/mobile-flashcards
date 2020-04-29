import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { white, lightPurp, black, gray } from '../utils/colors'
import { addCard } from '../actions'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'
import {CommonActions} from '@react-navigation/native'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.iosSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>ADD CARD</Text>
    </TouchableOpacity>
  )
}


class AddCard extends Component {
  state = {
    question: null,
    answer: null
  }


  handleQuestionChange = (question) => {
    this.setState(() => ({
      question
    }))
  }
  
  handleAnswerChange = (answer) => {
    this.setState(() => ({
      answer
    }))
  }
  
  submit = () => {
    
    const {title, decks } = this.props
    const card = this.state

    this.props.dispatch(addCard(title, card))
  
    this.setState(() => ({ question: null, answer: null }))

    this.toHome()

    addCardToDeck(title, card, decks)
  
  }

  toHome = () => {
    this.props.navigation.dispatch(
        CommonActions.goBack({
            key: 'AddCard',
        }))
  } 

  render () {
    const { question, answer } = this.state
    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.input}
          value={question}
          onChangeText={this.handleQuestionChange}
          placeholder='Question'>
        </TextInput>
        <TextInput 
          style={styles.input}
          value={answer}
          onChangeText={this.handleAnswerChange}
          placeholder='Answer'>
        </TextInput>
        <SubmitBtn onPress={this.submit} />
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
  iosSubmitBtn: {
    backgroundColor: lightPurp,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  input: {
    height: 40, 
    width: 200,
    borderColor: 'gray', 
    borderWidth: 1
  },
})


function mapStateToProps(decks, {route}) {
  const title = route.params.title
  return ({
          title,
          decks
      }
  )
}

export default connect(mapStateToProps)(AddCard)
