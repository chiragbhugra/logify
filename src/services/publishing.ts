import axios from 'axios';

export async function publishToTwitter(message: string) {
  const response = await axios.post('https://api.twitter.com/2/tweets', {
    text: message,
  }, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
  });

  return response.data;
}