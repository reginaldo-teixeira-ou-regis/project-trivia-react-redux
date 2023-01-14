export const getRanking = () => {
  const listRanking = JSON.parse(localStorage.getItem('ranking'));
  return listRanking;
};

export const setRankingLocalStorage = (newPlayer) => {
  const arrCurrent = getRanking();

  if (arrCurrent && arrCurrent.find((elem) => elem.name === newPlayer.name)) {
    const getArrCurrent = arrCurrent.filter((player) => player.name !== newPlayer.name);
    const addArr = getArrCurrent.push([newPlayer]);
    localStorage.setItem('ranking', JSON.stringify(addArr));
  }

  const newArrPlayer = arrCurrent ? [...arrCurrent, newPlayer] : [newPlayer];
  localStorage.setItem('ranking', JSON.stringify(newArrPlayer));
};
