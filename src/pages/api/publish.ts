import { publishToTwitter } from '@/services/publishing';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;
  const result = await publishToTwitter(message);

  res.status(200).json(result);
}