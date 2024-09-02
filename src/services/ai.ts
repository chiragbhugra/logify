import axios from 'axios';

export async function analyzeCommitMessage(message: string) {
  const response = await axios.post('https://api.example.com/analyze', {
    message,
  });

  return response.data;
}