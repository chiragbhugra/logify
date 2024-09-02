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