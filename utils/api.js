import { AsyncStorage } from 'react-native'
export const DECK_STORAGE_KEY = 'MobileFlashcards:decks'

export function saveDeckTitle (key) {
  let entry = { title: key, questions: [] }
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function removeTitle (key, decks) {
  delete decks.key
  AsyncStorage.clear()
  return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
}

export function addCardToDeck (key, card, decks) {
  decks = {
    ...decks,
    [key] : {
      ...decks[key],
      questions: decks[key].questions.concat({question: card.question, answer: card.answer})
    }
  }
  AsyncStorage.clear()
  return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
}

export function getDeck (key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data[key]
    })
}

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(formatDeckResults)
}

export function formatDeckResults (decks) {
  return ((decks === null) || (Object.keys(JSON.parse(decks)).length === 0))
  ? setDummyData()
  : JSON.parse(decks)
}

function setDummyData () {
  const dummyData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}


 