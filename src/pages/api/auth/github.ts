import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const code = req.query.code as string;

    const githubToken = await axios.post(`https://github.com/login/oauth/access_token`, {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    });

    const githubUser = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${githubToken.data.access_token}`,
      },
    });

    const { data } = githubUser;

    const { error } = await supabase.from('users').upsert({
      email: data.email,
      github_id: data.id.toString(),
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'GitHub authentication successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}