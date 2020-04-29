import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { white, lightPurp, black, gray } from '../utils/colors'
import { connect } from 'react-redux'

function CorrectBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.iosSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>CORRECT</Text>
    </TouchableOpacity>
  )
}

function IncorrectBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.iosSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>INCORRECT</Text>
    </TouchableOpacity>
  )
}


class Quiz extends Component {
  state = {
    questionIndex: 0,
    numCorrect: 0,
    complete: false
  }

  submitIncorrect = () => {
    this.state.questionIndex < this.props.numQuestions -1 
      ? this.setState(prevState => ({
        questionIndex: prevState.questionIndex + 1
      }))
      : this.setState(prevState => ({
        questionIndex: 0,
        complete : true
      }))
  }

  submitCorrect = () => {
    this.state.questionIndex < this.props.numQuestions -1
      ? this.setState(prevState => ({
        questionIndex: prevState.questionIndex + 1,
        numCorrect: prevState.numCorrect + 1 
      }))
      : this.setState(prevState => ({
        questionIndex: 0,
        complete : true,
        numCorrect: prevState.numCorrect + 1 
      }))
  }


  render () {
    const { questionIndex, numCorrect, complete } = this.state
    const { title, questions } = this.props
    return (
      <View style={styles.container}>
        <Text>{title}</Text>
        {complete
          ? <View>
            <Text>Quiz is complete</Text>
            <Text>{numCorrect}</Text>
            </View>
          : <View>
            <Text>{questions[questionIndex].question}</Text>
            <CorrectBtn onPress={this.submitCorrect} />
            <IncorrectBtn onPress={this.submitIncorrect} />
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
  iosSubmitBtn: {
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
  submitBtnText: {
    color: white,
    fontSize: 22,
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