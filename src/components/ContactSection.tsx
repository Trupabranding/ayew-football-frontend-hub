
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to join our academy or learn more about our programs? 
            Contact us today and take the first step towards excellence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-8">Contact Information</h3>
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex items-center">
                  <div className="bg-wine-red text-white p-3 rounded-full mr-4">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary">Phone</h4>
                    <p className="text-gray-600">+233 20 456 7890</p>
                    <p className="text-gray-600">+233 54 123 4567</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex items-center">
                  <div className="bg-wine-red text-white p-3 rounded-full mr-4">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary">Email</h4>
                    <p className="text-gray-600">info@mafarahayew.com</p>
                    <p className="text-gray-600">academy@mafarahayew.org</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex items-center">
                  <div className="bg-wine-red text-white p-3 rounded-full mr-4">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary">Location</h4>
                    <p className="text-gray-600">Mafarah Ayew Football Academy<br />East Legon, Accra<br />Greater Accra Region, Ghana</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex items-center">
                  <div className="bg-wine-red text-white p-3 rounded-full mr-4">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary">Training Hours</h4>
                    <p className="text-gray-600">Mon-Fri: 3:00 PM - 7:00 PM<br />Sat-Sun: 8:00 AM - 12:00 PM</p>
                    <p className="text-gray-500 text-sm mt-1">Office Hours: Mon-Fri 9:00 AM - 5:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-8">Send us a Message</h3>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input 
                        id="firstName" 
                        type="text" 
                        placeholder="Enter your first name"
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input 
                        id="lastName" 
                        type="text" 
                        placeholder="Enter your last name"
                        className="w-full"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Enter your phone number"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input 
                      id="subject" 
                      type="text" 
                      placeholder="What is this regarding?"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea 
                      id="message" 
                      rows={5}
                      placeholder="Tell us about your interest in the academy, investment opportunities, or how we can help you..."
                      className="w-full"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-wine-red hover:bg-wine-red/90 text-white py-3"
                  >
                    Send Message
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    We typically respond within 24 hours during business days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
