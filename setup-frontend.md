# Frontend Development Guide for GitHub-Twitter Integration SaaS Tool

## Overview

This guide will walk you through building the frontend for the GitHub-Twitter Integration SaaS Tool using **Next.js**. Since both the frontend and backend are in the same repository, we'll leverage Next.js for server-side rendering (SSR) and API routes for the backend. The application allows users to connect their GitHub repositories and Twitter accounts, enabling them to automatically tweet commit messages whenever they push code to their GitHub repos.

### Key Features:

- User authentication
- GitHub and Twitter integration
- Dynamic form handling
- State management using Zustand
- Responsive and modern UI using Tailwind CSS and ShadCN components
- API routes for backend integration

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18.x or later)
- **npm** or **yarn**
- Basic understanding of **React**, **TypeScript**, **Tailwind CSS**, and **Next.js**

## Project Setup

1. **Create a New Next.js Project:**

   If you haven't already set up your project, begin by creating a new Next.js project.

   ```bash
   npx create-next-app@latest github-twitter-integration --typescript
   cd github-twitter-integration
   Install Required Dependencies:
   ```

Install Tailwind CSS, Zustand, and ShadCN components.

bash
Copy code
npm install tailwindcss postcss autoprefixer zustand @shadcn/ui axios
Setup Tailwind CSS:

Initialize Tailwind CSS by creating the necessary configuration files.

bash
Copy code
npx tailwindcss init -p
Update your tailwind.config.js:

javascript
Copy code
/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: [
'./pages/**/_.{js,ts,jsx,tsx}',
'./components/\*\*/_.{js,ts,jsx,tsx}',
'./app/\*_/_.{js,ts,jsx,tsx}',
],
theme: {
extend: {},
},
plugins: [],
};
Add Tailwind to your global CSS in styles/globals.css:

css
Copy code
@tailwind base;
@tailwind components;
@tailwind utilities;
Folder Structure
Organize your project structure as follows:

arduino
Copy code
github-twitter-integration/
│
├── pages/
│ ├── api/
│ │ ├── auth/
│ │ │ ├── [...nextauth].ts
│ │ ├── github/
│ │ │ └── connect.ts
│ │ ├── twitter/
│ │ │ └── connect.ts
│ ├── \_app.tsx
│ ├── index.tsx
│ ├── settings.tsx
│ ├── profile.tsx
│
├── components/
│ ├── Layout.tsx
│ ├── Navbar.tsx
│ ├── Footer.tsx
│ ├── Card.tsx
│ └── Form.tsx
│
├── styles/
│ ├── globals.css
│
├── store/
│ └── index.ts
│
├── public/
│ └── ...
│
├── utils/
│ └── api.ts
│
└── tailwind.config.js
UI/UX Design

1. Home Page (Dashboard)
   Purpose: A landing page that shows an overview of the user’s connected services (GitHub, Twitter).
   Design: Use a minimal, aesthetic, and modern design. Utilize ShadCN UI components for a consistent look.
   Components to Use: Card, Button, Input, Form, Navbar, Footer
   Implementation:
   Create a navigation bar with links to the Home, Profile, and Settings pages.

Display cards showing the status of GitHub and Twitter integration.

Include buttons to "Connect GitHub" and "Connect Twitter."

Example Tailwind Classes:

jsx
Copy code
import { Card, Button } from '@shadcn/ui';

export default function Home() {
return (

<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
<h1 className="text-4xl font-bold text-blue-500">Dashboard</h1>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
<Card className="p-6">
<h2 className="text-2xl font-semibold">GitHub</h2>
<p>Status: Not Connected</p>
<Button className="mt-4">Connect GitHub</Button>
</Card>
<Card className="p-6">
<h2 className="text-2xl font-semibold">Twitter</h2>
<p>Status: Not Connected</p>
<Button className="mt-4">Connect Twitter</Button>
</Card>
</div>
</div>
);
} 2. Settings Page
Purpose: Allow users to input GitHub and Twitter API credentials and preferences for tweet content.
Design: Form-based UI where users can input and save their credentials and preferences.
Components to Use: Form, Input, Button, Toggle, Textarea
Implementation:
Create a form that captures GitHub Repository URL, Twitter API Keys, and tweet templates.

Provide toggles for options like auto-publish.

Example form layout using Tailwind CSS:

jsx
Copy code
import { Input, Button, Textarea, Toggle } from '@shadcn/ui';
import { useAppStore } from '@/store';

export default function Settings() {
const { githubRepo, setGitHubRepo, twitterApiKey, setTwitterApiKey, tweetTemplate, setTweetTemplate, autoPublish, setAutoPublish } = useAppStore();

const handleSave = async () => {
// Call the API to save settings
};

return (

<div className="container mx-auto px-4 py-10">
<h2 className="text-3xl font-bold">Settings</h2>
<form className="mt-6 space-y-4" onSubmit={handleSave}>
<div className="flex flex-col">
<label className="mb-2 font-medium">GitHub Repository URL</label>
<Input className="p-3 border rounded" type="text" value={githubRepo} onChange={(e) => setGitHubRepo(e.target.value)} placeholder="https://github.com/user/repo" />
</div>
<div className="flex flex-col">
<label className="mb-2 font-medium">Twitter API Key</label>
<Input className="p-3 border rounded" type="text" value={twitterApiKey} onChange={(e) => setTwitterApiKey(e.target.value)} placeholder="Your Twitter API Key" />
</div>
<div className="flex flex-col">
<label className="mb-2 font-medium">Tweet Template</label>
<Textarea className="p-3 border rounded" value={tweetTemplate} onChange={(e) => setTweetTemplate(e.target.value)} placeholder="Commit message: {{message}}" />
</div>
<div className="flex items-center">
<label className="mr-3 font-medium">Auto-publish Tweets</label>
<Toggle checked={autoPublish} onChange={(e) => setAutoPublish(e.target.checked)} />
</div>
<Button className="mt-4 bg-blue-500 text-white" type="submit">Save Settings</Button>
</form>
</div>
);
} 3. Profile Page
Purpose: Display the user’s profile information and connected services.
Design: A clean and straightforward layout showcasing user details and connected services.
Components to Use: Avatar, Button, Card
Implementation:
Use cards to display profile details and service connections.

Add an avatar and allow users to update their profile.

Example Profile Layout:

jsx
Copy code
import { Card } from '@shadcn/ui';

export default function Profile() {
return (

<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
<img className="w-24 h-24 rounded-full" src="/path/to/profile.jpg" alt="User Avatar" />
<h2 className="mt-4 text-3xl font-semibold">John Doe</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
<Card className="p-6">
<h3 className="text-xl font-semibold">GitHub</h3>
<p>Connected Repository: <a href="#" className="text-blue-500">https://github.com/user/repo</a></p>
</Card>
<Card className="p-6">
<h3 className="text-xl font-semibold">Twitter</h3>
<p>Status: Connected</p>
</Card>
</div>
</div>
);
}
State Management
Utilize Zustand for state management, ensuring a lightweight and simple approach to manage global state.

Create a Store in store/index.ts:

typescript
Copy code
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
Access the Store in Components:

Import and use the store in any component where you need access to global state.

typescript
Copy code
import { useAppStore } from '@/store';

const githubRepo = useAppStore((state) => state.githubRepo);
const setGitHubRepo = useAppStore((state) => state.setGitHubRepo);
API Integration
Setup API Routes:

Use Next.js API routes to handle GitHub and Twitter integrations.

Example route to handle GitHub connection:

typescript
Copy code
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method === 'POST') {
// Handle GitHub connection logic
res.status(200).json({ message: 'GitHub connected successfully' });
} else {
res.status(405).json({ message: 'Method not allowed' });
}
}
Connect API in Frontend:

Use axios to interact with your API routes from the frontend.

typescript
Copy code
import axios from 'axios';

const connectGitHub = async () => {
try {
const response = await axios.post('/api/github/connect');
console.log(response.data);
} catch (error) {
console.error('Error connecting GitHub:', error);
}
};
Responsive Design
Ensure the application is fully responsive using Tailwind CSS utilities.
Test across different devices and screen sizes.
Deployment
Once the frontend is complete, you can deploy the application using services like Vercel, Netlify, or any platform that supports Next.js. Ensure all environment variables are set correctly for production.

Conclusion
This guide outlines the basic steps to create the frontend of your SaaS tool using Next.js, with integrated backend routes in the same repository. Customize the design and features as needed, and make sure to follow best practices in both frontend and backend development.
