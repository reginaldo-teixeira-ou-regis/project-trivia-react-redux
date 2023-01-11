export const SAVE_LOGIN = 'SAVE_LOGIN';
export const saveLogin = (playerInfo) => ({
  type: SAVE_LOGIN,
  payload: playerInfo,
});
