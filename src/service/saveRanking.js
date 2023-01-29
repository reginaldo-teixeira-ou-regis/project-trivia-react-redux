export const getRanking = () => {
  const listRanking = JSON.parse(localStorage.getItem('ranking'));
  return listRanking;
};

export const setRankingLocalStorage = (newPlayer) => {
  const arrCurrent = getRanking();

  const newArrPlayer = arrCurrent ? [...arrCurrent, newPlayer] : [newPlayer];
  localStorage.setItem('ranking', JSON.stringify(newArrPlayer));
};
