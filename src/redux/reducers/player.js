import { SAVE_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default playerReducer;
