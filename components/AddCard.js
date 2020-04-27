import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
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

  addCardToDeck({key,card})
  
  this.setState(() => ({ question: null, answer: null }))

  // Navigate to Deck View
 

}

export default class AddCard extends Component {
  state = {
    question: null,
    answer: null
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
    padding: 20,
    backgroundColor: white
  },
  iosSubmitBtn: {
    backgroundColor: purple,
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
    width: 200,
    height:200
  }
})
