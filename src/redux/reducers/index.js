import { combineReducers } from 'redux';
import playerReducer from './player';
import questionsReducer from './questions';

const rootReducer = combineReducers({
  player: playerReducer,
  questions: questionsReducer,
});

export default rootReducer;
