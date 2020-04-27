import { AsyncStorage } from 'react-native'
export const DECK_STORAGE_KEY = 'MobileFlashcards:decks'

export function saveDeckTitle (key) {
  let entry = { title: key, questions: [] }
  console.log('saveDeckTitle entry')
  console.log(entry)
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function addCardToDeck ({ key, card }) {
  let deck = getDeck(key)
  deck = {
    ...deck,
    questions: (deck && deck.questions) 
             ? deck.questions.push({ 'question': card.question, 'answer' : card.answer })
             : [{ 'question' : card.question, 'answer' : card.answer }]
  }
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: { deck }
  }))
}

export function getDeck (key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data[key]
    })
}

export function getDecks () {
  //remove clear
  //AsyncStorage.clear()
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(formatDeckResults)
}

export function formatDeckResults (decks) {
  return decks === null
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


 