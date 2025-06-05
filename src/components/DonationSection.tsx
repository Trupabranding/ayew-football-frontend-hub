
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';

const DonationSection = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorName, setDonorName] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  const predefinedAmounts = ['25', '50', '100', '250', '500'];

  const impactAreas = [
    {
      title: 'Equipment & Facilities',
      description: 'Provide quality training equipment and maintain our facilities',
      image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Player Development',
      description: 'Support young athletes with training, nutrition, and education',
      image: 'https://images.unsplash.com/photo-1594736797933-d0b22d3180c2?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Community Programs',
      description: 'Expand our reach to underserved communities across Ghana',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount || donationAmount;
    if (!amount || !donorEmail || !donorName) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success(`Thank you ${donorName}! Your donation of $${amount} will make a difference.`);
    setDonationAmount('');
    setDonorEmail('');
    setDonorName('');
    setCustomAmount('');
  };

  return (
    <section id="donations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-wine-red mb-6">
            Support Our Mission
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your donation helps us provide opportunities for young athletes and strengthen communities through football.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-wine-red mb-8">Your Impact</h3>
            <div className="space-y-6">
              {impactAreas.map((area, index) => (
                <Card key={index} className="flex items-center p-4 hover:shadow-lg transition-shadow">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-wine-red">{area.title}</h4>
                    <p className="text-sm text-gray-600">{area.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card className="border-2 border-wine-red">
              <CardHeader>
                <CardTitle className="text-2xl text-wine-red text-center">Make a Donation</CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-wine-red hover:bg-wine-red/90 text-lg py-3">
                      Donate Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-wine-red">Make a Donation</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleDonationSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Select Amount (USD)</label>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          {predefinedAmounts.map((amount) => (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => {
                                setDonationAmount(amount);
                                setCustomAmount('');
                              }}
                              className={`py-2 px-3 border rounded-md text-sm font-medium transition-colors ${
                                donationAmount === amount
                                  ? 'bg-wine-red text-white border-wine-red'
                                  : 'border-gray-300 hover:border-wine-red'
                              }`}
                            >
                              ${amount}
                            </button>
                          ))}
                        </div>
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setDonationAmount('');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red"
                          placeholder="Custom amount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-wine-red hover:bg-wine-red/90">
                        Complete Donation
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="mt-6 text-center">
                  <h4 className="font-semibold text-wine-red mb-2">Quick Impact Examples:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>$25 - Provides a training kit for one young player</p>
                    <p>$50 - Funds one week of nutritional support</p>
                    <p>$100 - Covers transportation for team matches</p>
                    <p>$250 - Sponsors a player for one month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
