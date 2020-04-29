import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { white, lightPurp, black, gray } from '../utils/colors'
import { addCardToDeck } from '../utils/api'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.iosSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>ADD CARD</Text>
    </TouchableOpacity>
  )
}


export default class AddCard extends Component {
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
    const key = this.props.title
    const card = this.state
  
    //addCardToDeck({key,card})
    
    this.setState(() => ({ question: null, answer: null }))
  
    // Navigate to Deck View
   
  
  }

  render () {
    const {question, answer} = this.state
    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.input}
          value={question}
          onChange={this.handleQuestionChange}>
        </TextInput>
        <TextInput 
          style={styles.input}
          value={answer}
          onChange={this.handleAnswerChange}>
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
    marginRight: 40,
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
