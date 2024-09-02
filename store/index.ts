import create from 'zustand';

interface AppState {
  githubRepo: string;
  setGitHubRepo: (repo: string) => void;
  twitterApiKey: string;
  setTwitterApiKey: (key: string) => void;
  tweetTemplate: string;
  setTweetTemplate: (template: string) => void;
  autoPublish: boolean;
  setAutoPublish: (publish: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  githubRepo: '',
  setGitHubRepo: (repo) => set({ githubRepo: repo }),
  twitterApiKey: '',
  setTwitterApiKey: (key) => set({ twitterApiKey: key }),
  tweetTemplate: '',
  setTweetTemplate: (template) => set({ tweetTemplate: template }),
  autoPublish: false,
  setAutoPublish: (publish) => set({ autoPublish: publish }),
}));