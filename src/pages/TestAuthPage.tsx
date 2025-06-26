import { AuthTest } from '@/components/AuthTest';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestAuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 container py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Authentication Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-6">
              This is a test page for authentication. You can sign up, sign in, and test authentication flows.
            </p>
            <AuthTest />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
