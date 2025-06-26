
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect authenticated users to home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "Successfully logged in.",
          });
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, firstName, lastName);
        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created",
            description: "Please check your email to confirm your account.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (type: 'admin' | 'investor' | 'player') => {
    const accounts = {
      admin: { email: 'admin@mafarah.com', password: 'admin123' },
      investor: { email: 'investor@mafarah.com', password: 'investor123' },
      player: { email: 'player@mafarah.com', password: 'player123' }
    };
    
    setEmail(accounts[type].email);
    setPassword(accounts[type].password);
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-wine-red text-white p-3 rounded-lg">
              <span className="font-bold text-2xl">MA</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-secondary">
            Mafarah Ayew Football Academy
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Enter your credentials to access your account' 
                : 'Fill in your details to create a new account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-wine-red hover:bg-wine-red/90"
                disabled={loading}
              >
                {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </Button>
            </form>

            {isLogin && (
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-3">Demo Accounts:</p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoAccount('admin')}
                    className="w-full text-xs"
                  >
                    Admin Demo (admin@mafarah.com)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoAccount('investor')}
                    className="w-full text-xs"
                  >
                    Investor Demo (investor@mafarah.com)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoAccount('player')}
                    className="w-full text-xs"
                  >
                    Player Demo (player@mafarah.com)
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-wine-red hover:text-wine-red/80 text-sm"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
