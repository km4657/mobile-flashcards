import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_CARD :
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions.push({[action.card.question]: [action.card.answer]})
        }
      }
    case ADD_DECK :
      return {
        ...state,
        [action.title]: {
          title: [action.title],
          questions: []
        }
      }
    default :
      return state
  }
}
export default entries 