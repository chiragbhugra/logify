import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { analyzeCommitMessage } from '@/services/ai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const event = req.headers['x-github-event'];
  const payload = req.body;

  if (event === 'push') {
    const commits = payload.commits.map(async (commit: any) => {
      const analysis = await analyzeCommitMessage(commit.message);
      return {
        repo_id: payload.repository.id,
        commit_message: commit.message,
        analysis,
        author: commit.author.name,
        timestamp: commit.timestamp,
      };
    });

    const results = await Promise.all(commits);

    const { error } = await supabase.from('commits').insert(results);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.status(200).json({ message: 'Webhook received' });
}