
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-gradient-to-r from-secondary to-wine-red text-white min-h-screen flex items-center">
      <div className="absolute inset-0 bg-black/40"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&q=80&w=1920')"
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Elite Football
            <span className="block text-wine-red">Development</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            Nurturing tomorrow's football stars through professional training, 
            academic excellence, and community impact at Mafarah Ayew Football Academy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-wine-red hover:bg-wine-red/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Join Our Academy
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-secondary px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              View Players
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
