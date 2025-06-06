
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Users, Heart, Target } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';

const AboutSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
    });
  }, []);

  const values = [
    {
      icon: Trophy,
      title: "Excellence",
      description: "Striving for the highest standards in football development and academic achievement."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building strong connections and supporting our local community through sports."
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Fostering honesty, respect, and sportsmanship in everything we do."
    },
    {
      icon: Target,
      title: "Development",
      description: "Comprehensive player development both on and off the field."
    }
  ];

  return (
    <section id="about" className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4 md:mb-6">
            About Mafarah Ayew
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Founded with a vision to develop exceptional football talent while making a positive 
            impact in our community through our NGO sporting club.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 md:mb-16">
          <div data-aos="fade-right" data-aos-delay="200">
            <div className="mb-6">
              <img 
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=600" 
                alt="Young soccer players training"
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4 md:mb-6">Football Academy</h3>
            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed">
              Our academy provides world-class football training for young athletes aged 8-18. 
              With state-of-the-art facilities and experienced coaching staff, we focus on developing 
              technical skills, tactical understanding, and mental resilience.
            </p>
            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed">
              We believe in holistic development, combining intensive football training with 
              academic education to prepare our players for success both on and off the pitch.
            </p>
            <div className="bg-wine-red text-white p-4 md:p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Our Mission</h4>
              <p className="text-sm">
                To nurture young football talent while building character, discipline, 
                and leadership skills that will serve our players throughout their lives.
              </p>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="400">
            <div className="mb-6">
              <img 
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600" 
                alt="Kids playing soccer together"
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4 md:mb-6">NGO Sporting Club</h3>
            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed">
              Beyond football, our NGO sporting club promotes various sports and activities 
              to strengthen community bonds and provide opportunities for personal growth 
              across different athletic disciplines.
            </p>
            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed">
              We organize community tournaments, provide sports equipment to underprivileged 
              youth, and create safe spaces for young people to develop their athletic abilities 
              and life skills.
            </p>
            <div className="bg-secondary text-white p-4 md:p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Community Impact</h4>
              <p className="text-sm">
                Through sports, we're building stronger communities, creating opportunities, 
                and inspiring the next generation of athletes and leaders.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {values.map((value, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300" data-aos="fade-up" data-aos-delay={600 + index * 100}>
              <CardContent className="p-4 md:p-6 text-center">
                <div className="bg-wine-red text-white p-3 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <value.icon size={24} />
                </div>
                <h4 className="font-bold text-lg text-secondary mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
