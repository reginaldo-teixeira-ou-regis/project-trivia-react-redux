const fetchToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchToken;
