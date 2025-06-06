
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Elite Football Academy",
      subtitle: "Professional Training Program",
      description: "Developing the next generation of football stars through world-class coaching, modern facilities, and comprehensive player development programs.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1920",
      cta: "Join Academy"
    },
    {
      title: "Smart Investment Hub",
      subtitle: "Partner With Champions",
      description: "Join our investment platform to support talented young players while earning attractive returns through strategic football development investments.",
      image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=1920",
      cta: "Explore Investments"
    },
    {
      title: "Community Empowerment",
      subtitle: "NGO & Social Impact",
      description: "Making a difference in Ghanaian communities through sports education, youth mentorship, and sustainable development programs.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1920",
      cta: "Make a Donation"
    },
    {
      title: "Championship Matches",
      subtitle: "Competitive Excellence",
      description: "Experience thrilling football action as our academy teams compete in regional and national tournaments, showcasing emerging talent.",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1920",
      cta: "View Matches"
    },
    {
      title: "Success Stories",
      subtitle: "Latest Updates",
      description: "Follow inspiring journeys of our players, academy achievements, and breakthrough moments that define our commitment to excellence.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=1920",
      cta: "Read News"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSlideClick = (cta: string) => {
    switch (cta) {
      case "Join Academy":
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case "Explore Investments":
        document.getElementById('investment')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case "Make a Donation":
        document.getElementById('donations')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case "View Matches":
        document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case "Read News":
        document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <Carousel className="w-full h-screen">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative">
              <div className="relative min-h-screen flex items-center">
                <div className="absolute inset-0 bg-black/70"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                ></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
                  <div className="max-w-3xl animate-fade-in">
                    <div className="mb-4">
                      <span className="inline-block bg-wine-red text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {slide.subtitle}
                      </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
                      {slide.title.split(' ').map((word, i) => (
                        <span key={i} className={i === slide.title.split(' ').length - 1 ? "block text-wine-red" : ""}>
                          {word}{i !== slide.title.split(' ').length - 1 ? ' ' : ''}
                        </span>
                      ))}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        size="lg" 
                        className="bg-wine-red hover:bg-wine-red/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                        onClick={() => handleSlideClick(slide.cta)}
                      >
                        {slide.cta}
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-white text-white hover:bg-white hover:text-secondary px-8 py-4 text-lg font-semibold transition-all duration-300"
                        onClick={() => document.getElementById('players')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        View Players
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 text-white border-white hover:bg-wine-red hover:border-wine-red" />
        <CarouselNext className="right-4 text-white border-white hover:bg-wine-red hover:border-wine-red" />
      </Carousel>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeSlide ? 'bg-wine-red' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
