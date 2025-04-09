import axios from 'axios';

let n = [];
const WINDOW_SIZE = 10;

const thirdPartyEndpoints = {
  p: 'http://20.244.56.144/evaluation-service/primes',
  f: 'http://20.244.56.144/evaluation-service/fibo',
  e: 'http://20.244.56.144/evaluation-service/even',
  r: 'http://20.244.56.144/evaluation-service/rand',
};

export default async function handler(req, res) {
  const { numberid } = req.query;
  const endpoint = thirdPartyEndpoints[numberid];

  if (!endpoint) {
    return res.status(400).json({ error: 'Invalid number type ID' });
  }

  const windowPrevState = [...n];

  try {
    const source = axios.CancelToken.source();
    const timeout = setTimeout(() => source.cancel(), 500);

    const response = await axios.get(endpoint, { cancelToken: source.token });
    clearTimeout(timeout);

    const newNumbers = response.data.numbers || [];
    const uniqueNew = newNumbers.filter(num => !n.includes(num));

    n.push(...uniqueNew);
    if (n.length > WINDOW_SIZE) {
      n = n.slice(-WINDOW_SIZE);
    }

    const avg = (n.reduce((sum, val) => sum + val, 0) / n.length).toFixed(2);

    return res.status(200).json({
      windowPrevState,
      windowCurrState: n,
      numbers: newNumbers,
      avg: parseFloat(avg),
    });

  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch or timeout occurred' });
  }
}
