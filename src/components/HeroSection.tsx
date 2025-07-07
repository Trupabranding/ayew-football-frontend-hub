
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from '@/components/ui/carousel';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  const slides = [
    {
      title: "Elite Football Academy",
      subtitle: "Professional Training Program", 
      description: "Developing the next generation of football stars through world-class coaching, modern facilities, and comprehensive player development programs.",
      image: "https://images.unsplash.com/photo-1594736797933-d0d6147d9c95?auto=format&fit=crop&q=80&w=1920",
      cta: "Join Academy"
    },
    {
      title: "Smart Investment Hub",
      subtitle: "Partner With Champions",
      description: "Join our investment platform to support talented young players while earning attractive returns through strategic football development investments.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=1920",
      cta: "Explore Investments"
    },
    {
      title: "Community Empowerment",
      subtitle: "NGO & Social Impact",
      description: "Making a difference in Ghanaian communities through sports education, youth mentorship, and sustainable development programs.",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1920",
      cta: "Make a Donation"
    },
    {
      title: "Championship Matches",
      subtitle: "Competitive Excellence",
      description: "Experience thrilling football action as our academy teams compete in regional and national tournaments, showcasing emerging talent.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1920",
      cta: "View Matches"
    },
    {
      title: "Success Stories",
      subtitle: "Latest Updates",
      description: "Follow inspiring journeys of our players, academy achievements, and breakthrough moments that define our commitment to excellence.",
      image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=1920",
      cta: "Read News"
    }
  ];

  useEffect(() => {
    if (!api) return;

    // Set up auto-sliding
    const timer = setInterval(() => {
      api.scrollNext();
    }, 5000);

    // Listen for slide changes to update activeSlide
    const onSelect = () => {
      setActiveSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect(); // Set initial state

    return () => {
      clearInterval(timer);
      api.off("select", onSelect);
    };
  }, [api]);

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

  const handleIndicatorClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <Carousel className="w-full h-screen" setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative">
              <div className="relative min-h-screen flex items-center">
                {/* Enhanced dark overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10"></div>
                <img
                  src={slide.image}
                  alt={`${slide.title} - Mafarah Ayew Football Academy`}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
                />
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 z-20 w-full">
                  <div className="max-w-2xl md:max-w-3xl animate-fade-in">
                    <div className="mb-3 md:mb-4" data-aos="fade-up" data-aos-delay="200">
                      <span className="inline-block bg-wine-red text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold">
                        {slide.subtitle}
                      </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-white drop-shadow-lg" data-aos="fade-up" data-aos-delay="400">
                      {slide.title.split(' ').map((word, i) => (
                        <span key={i} className={i === slide.title.split(' ').length - 1 ? "block text-wine-red" : ""}>
                          {word}{i !== slide.title.split(' ').length - 1 ? ' ' : ''}
                        </span>
                      ))}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-100 leading-relaxed drop-shadow-md" data-aos="fade-up" data-aos-delay="600">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4" data-aos="fade-up" data-aos-delay="800">
                      <Button 
                        size="lg" 
                        className="bg-wine-red hover:bg-wine-red/90 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                        onClick={() => handleSlideClick(slide.cta)}
                      >
                        {slide.cta}
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-2 border-white/80 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-wine-red px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold transition-all duration-300 shadow-lg"
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
        <CarouselPrevious className="left-2 md:left-4 w-10 h-10 md:w-12 md:h-12 bg-wine-red/80 text-white border-wine-red hover:bg-wine-red hover:border-wine-red backdrop-blur-sm z-30" />
        <CarouselNext className="right-2 md:right-4 w-10 h-10 md:w-12 md:h-12 bg-wine-red/80 text-white border-wine-red hover:bg-wine-red hover:border-wine-red backdrop-blur-sm z-30" />
      </Carousel>

      {/* Slide indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30" data-aos="fade-up" data-aos-delay="1000">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === activeSlide ? 'bg-wine-red shadow-lg' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
