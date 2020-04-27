import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { getDecks } from '../utils/api'
import { white, lightPurp } from '../utils/colors'
import { AppLoading} from 'expo'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

function Item({ title, numQuestions }) {
  // add onPress
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.deckTitleButton}>
        <Text style={styles.deckTitleText}>{title}, {numQuestions} Cards</Text>
      </TouchableOpacity> 
    </View>
  );
}

class DeckList extends Component {
  state = {
    ready: false
  }

  componentDidMount () {
    const { dispatch } = this.props
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  keyExtractor = item => item.title

  render() {
    const { ready } = this.state
    const { decks } = this.props
    if (ready === false) {
      return <AppLoading />
    }
    return (
        <View>
        { decks !== null
          ? <View>
              <FlatList
                keyExtractor={this.keyExtractor}  
                data={Object.values(decks)}
                renderItem={({ item }) => 
                  <Item 
                  title={item.title} 
                  numQuestions={item.questions? item.questions.length : 0}
                  />}
              />
            </View>
          : <View style={styles.item}>
              <Text style={styles.noDecksText}>
                You didn't create any decks yet.
              </Text>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
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

function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(DeckList)