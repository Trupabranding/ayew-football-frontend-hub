
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DonationSection = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorName, setDonorName] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

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
    <section id="donations" className="py-12 md:py-20 bg-wine-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Support Our Mission
          </h2>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Your donation helps us provide opportunities for young athletes and strengthen communities through football.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
          <div data-aos="fade-right">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Your Impact</h3>
            <div className="space-y-4 md:space-y-6">
              {impactAreas.map((area, index) => (
                <Card key={index} className="flex flex-col sm:flex-row items-start sm:items-center p-4 hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm" data-aos="fade-up" data-aos-delay={index * 100}>
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full sm:w-16 h-32 sm:h-16 rounded-lg object-cover mb-3 sm:mb-0 sm:mr-4 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-wine-red text-sm md:text-base">{area.title}</h4>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{area.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div data-aos="fade-left">
            <Card className="border-2 border-white bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl text-wine-red text-center">Make a Donation</CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-wine-red hover:bg-wine-red/90 text-lg py-3 transition-all duration-300 hover:scale-105">
                      Donate Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md mx-4">
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
                              className={`py-2 px-2 md:px-3 border rounded-md text-xs md:text-sm font-medium transition-colors ${
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red text-sm md:text-base"
                          placeholder="Custom amount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red text-sm md:text-base"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red text-sm md:text-base"
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
                  <h4 className="font-semibold text-wine-red mb-2 text-sm md:text-base">Quick Impact Examples:</h4>
                  <div className="text-xs md:text-sm text-gray-600 space-y-1">
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
