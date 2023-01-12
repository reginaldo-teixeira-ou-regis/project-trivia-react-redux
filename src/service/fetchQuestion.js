const fetchQuestion = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const data = await fetch(url);
  const result = await data.json();
  return result;
};

export default fetchQuestion;
