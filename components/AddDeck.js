import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { purple, white } from '../utils/colors'
import {CommonActions} from '@react-navigation/native'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.iosSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}


class AddDeck extends Component {
  state = {
    title: null
  }

  handleTitleChange = (title) => {
    this.setState(() => ({
      title
    }))
  }
  
  
  submit = () => {
    const title = this.state.title

    this.props.dispatch(addDeck(title))
  
    this.setState(() => ({ title: null }))
  
    // Navigate to Deck View or Home?
    this.toHome()
    
    saveDeckTitle(title)
   
  }
  
  toHome = () => {
    this.props.navigation.dispatch(
        CommonActions.goBack({
            key: 'AddDeck',
        }))
  } 

  render () {
    const title = this.state.title
    return (
      <View style={styles.container}>
        <Text style={styles.newTitleText}>
                What is the title of your new deck?
        </Text>
        <TextInput 
          style={styles.input}
          value={title}
          onChangeText={this.handleTitleChange}>
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
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  newTitleText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

export default connect()(AddDeck)