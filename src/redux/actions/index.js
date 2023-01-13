import fetchQuestion from '../../service/fetchQuestion';

export const SAVE_LOGIN = 'SAVE_LOGIN';
export const saveLogin = (playerInfo) => ({
  type: SAVE_LOGIN,
  payload: playerInfo,
});

export const GET_REQUEST_QUESTION = 'GET_REQUEST_QUESTION';
export const getRequestQuestion = (payload) => ({
  type: GET_REQUEST_QUESTION,
  payload,
});

export const fetch = (token) => async (dispatch) => {
  try {
    const response = await fetchQuestion(token);
    dispatch(getRequestQuestion(response));
  } catch (error) {
    console.log(error);
  }
};
