
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Users, Heart, Target } from 'lucide-react';

const AboutSection = () => {
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
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            About Mafarah Ayew
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded with a vision to develop exceptional football talent while making a positive 
            impact in our community through our NGO sporting club.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="animate-fade-in">
            <h3 className="text-3xl font-bold text-secondary mb-6">Football Academy</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our academy provides world-class football training for young athletes aged 8-18. 
              With state-of-the-art facilities and experienced coaching staff, we focus on developing 
              technical skills, tactical understanding, and mental resilience.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe in holistic development, combining intensive football training with 
              academic education to prepare our players for success both on and off the pitch.
            </p>
            <div className="bg-wine-red text-white p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Our Mission</h4>
              <p className="text-sm">
                To nurture young football talent while building character, discipline, 
                and leadership skills that will serve our players throughout their lives.
              </p>
            </div>
          </div>

          <div className="animate-fade-in">
            <h3 className="text-3xl font-bold text-secondary mb-6">NGO Sporting Club</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Beyond football, our NGO sporting club promotes various sports and activities 
              to strengthen community bonds and provide opportunities for personal growth 
              across different athletic disciplines.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We organize community tournaments, provide sports equipment to underprivileged 
              youth, and create safe spaces for young people to develop their athletic abilities 
              and life skills.
            </p>
            <div className="bg-secondary text-white p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Community Impact</h4>
              <p className="text-sm">
                Through sports, we're building stronger communities, creating opportunities, 
                and inspiring the next generation of athletes and leaders.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="bg-wine-red text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
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
