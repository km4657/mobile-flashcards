import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { white, lightPurp, black, gray } from '../utils/colors'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import SubmitButton from './SubmitButton'
import {CommonActions} from '@react-navigation/native'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'


class Quiz extends Component {
  state = {
    questionIndex: 0,
    numCorrect: 0,
    complete: false,
    showAnswer: false
  }

  submitIncorrect = () => {
    this.state.questionIndex < this.props.numQuestions -1 
      ? this.setState(prevState => ({
        questionIndex: prevState.questionIndex + 1,
        showAnswer: false
      }))
      : this.setState(prevState => ({
        questionIndex: 0,
        complete : true,
        showAnswer: false
      }))
  }

  submitCorrect = () => {
    this.state.questionIndex < this.props.numQuestions -1
      ? this.setState(prevState => ({
        questionIndex: prevState.questionIndex + 1,
        numCorrect: prevState.numCorrect + 1,
        showAnswer: false
      }))
      : this.setState(prevState => ({
        questionIndex: 0,
        complete : true,
        numCorrect: prevState.numCorrect + 1,
        showAnswer: false
      }))
  }

  showAnswer = () => {
    this.setState(prevState => ({
        showAnswer: true
      }))
  }

  finishQuiz = () => {
    this.props.navigation.dispatch(
        CommonActions.goBack({
            key: 'Quiz',
        }))
    // Clear local notification
    clearLocalNotification()
    .then(setLocalNotification)
  } 
  restart = () => {
    this.setState(prevState => ({
      questionIndex: 0,
      numCorrect: 0,
      showAnswer: false,
      complete: false
    }))
     // Clear local notification
     clearLocalNotification()
     .then(setLocalNotification)
  } 


  render () {
    const { questionIndex, numCorrect, complete, showAnswer } = this.state
    const { title, questions, numQuestions} = this.props
    return (
      <View style={styles.container}>
        {complete
          ? <View>
            <Text style={styles.quizText}>Quiz is complete</Text>
            <Text style={styles.quizText}>{numCorrect} Correct</Text>
            <SubmitButton text='Restart Quiz' onPress={this.restart} />
            <SubmitButton text='Back to Deck' onPress={this.finishQuiz} />
            </View>
          : <View>
            <Text style={styles.quizText}>{questionIndex + 1}/{numQuestions}</Text>
            <Text style={styles.quizText}>{showAnswer? questions[questionIndex].answer : questions[questionIndex].question}</Text>
            <TextButton onPress={this.showAnswer} style={{margin: 20}}>Show Answer</TextButton>
            <SubmitButton text='Correct' onPress={this.submitCorrect} />
            <SubmitButton text='Incorrect' onPress={this.submitIncorrect} />
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
  quizText: {
    fontSize: 22,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
  }
})


function mapStateToProps(decks, {route}) {
  const title = route.params.title
  const deck = decks[title]
  const questions = deck.questions
  const numQuestions = questions.length

  return ({
          title,
          questions,
          numQuestions
      }
  )
}

export default connect(mapStateToProps)(Quiz)