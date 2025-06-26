import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AuthTest = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  
  const { 
    user, 
    signIn, 
    signUp, 
    signOut, 
    checkUserExists,
    resendConfirmationEmail 
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, firstName, lastName);
        if (error) {
          setMessage(`Sign up failed: ${error.message}`);
        } else {
          setMessage('Check your email to confirm your account!');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setMessage(`Sign in failed: ${error.message}`);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setMessage('An unexpected error occurred');
    }
  };

  const handleCheckUser = async () => {
    const exists = await checkUserExists(email);
    setMessage(exists ? 'User exists!' : 'User does not exist');
  };

  const handleResendConfirmation = async () => {
    const { message } = await resendConfirmationEmail(email);
    setMessage(message);
  };

  if (user) {
    return (
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Welcome, {user.email}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">You are signed in.</p>
          <Button onClick={signOut} className="w-full">
            Sign Out
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>{isSignUp ? 'Create an Account' : 'Sign In'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required={isSignUp}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required={isSignUp}
                />
              </div>
            </>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <div className={`p-3 rounded-md ${
              message.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {message}
            </div>
          )}

          <div className="flex flex-col space-y-2">
            <Button type="submit" className="w-full">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Button>

            <div className="flex space-x-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={handleCheckUser}
                className="flex-1"
              >
                Check User
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={handleResendConfirmation}
                className="flex-1"
              >
                Resend Confirmation
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthTest;
