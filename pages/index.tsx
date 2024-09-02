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
}