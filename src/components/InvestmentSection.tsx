
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';

const InvestmentSection = () => {
  const [email, setEmail] = useState('');
  const [selectedInvestment, setSelectedInvestment] = useState('');

  const investmentOptions = [
    {
      id: 'organization',
      title: 'Invest in Organization',
      description: 'Support our entire academy infrastructure and programs',
      minAmount: '$5,000',
      returns: '8-12% annually',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'team',
      title: 'Invest in Teams',
      description: 'Back specific teams and share in their success',
      minAmount: '$2,500',
      returns: '10-15% annually',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'player',
      title: 'Invest in Players',
      description: 'Sponsor individual talented players and their development',
      minAmount: '$1,000',
      returns: '15-25% annually',
      image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedInvestment) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Added to investment waitlist!');
    setEmail('');
    setSelectedInvestment('');
  };

  return (
    <section id="investment" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-wine-red mb-6">
            Investment Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us in developing the next generation of football talent while earning attractive returns on your investment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {investmentOptions.map((option) => (
            <Card key={option.id} className="hover:shadow-xl transition-shadow duration-300 border-2 hover:border-wine-red">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-wine-red">{option.title}</CardTitle>
                <p className="text-gray-600">{option.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Minimum Investment:</span>
                    <Badge variant="outline" className="border-wine-red text-wine-red">
                      {option.minAmount}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Expected Returns:</span>
                    <Badge className="bg-wine-red">
                      {option.returns}
                    </Badge>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-wine-red hover:bg-wine-red/90"
                        onClick={() => setSelectedInvestment(option.id)}
                      >
                        Join Waitlist
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-wine-red">Join Investment Waitlist</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Investment Type</label>
                          <p className="text-wine-red font-semibold">{option.title}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-wine-red hover:bg-wine-red/90">
                          Join Waitlist
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            * Investment opportunities are subject to regulatory approval and due diligence
          </p>
          <Badge variant="outline" className="border-wine-red text-wine-red">
            Early investors get priority access and better terms
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default InvestmentSection;
