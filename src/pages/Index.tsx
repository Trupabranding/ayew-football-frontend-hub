
import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PlayersSection from '@/components/PlayersSection';
import InvestmentSection from '@/components/InvestmentSection';
import DonationSection from '@/components/DonationSection';
import MatchesSection from '@/components/MatchesSection';
import NewsSection from '@/components/NewsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
    });

    // Refresh AOS when the component mounts
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <div className="bg-gray-50" data-aos="fade-up">
        <AboutSection />
      </div>
      <div className="bg-wine-red" data-aos="fade-up">
        <PlayersSection />
      </div>
      <div className="bg-gray-50" data-aos="fade-up">
        <InvestmentSection />
      </div>
      <DonationSection />
      <div className="bg-black" data-aos="fade-up">
        <MatchesSection />
      </div>
      <div className="bg-gray-50" data-aos="fade-up">
        <NewsSection />
      </div>
      <div className="bg-wine-red" data-aos="fade-up">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
