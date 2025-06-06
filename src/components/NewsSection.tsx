
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';

const NewsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
    });
  }, []);

  const news = [
    {
      id: 1,
      title: "Academy Wins Regional Youth Championship",
      excerpt: "Our U-17 team secured a decisive 3-1 victory in the final match, showcasing exceptional teamwork and skill development.",
      image: "https://images.unsplash.com/photo-1580722316149-95c2b0c64b50?auto=format&fit=crop&q=80&w=600",
      date: "2024-05-30",
      author: "Coach Williams",
      category: "Match Report"
    },
    {
      id: 2,
      title: "New Training Facility Opens",
      excerpt: "State-of-the-art training complex with modern equipment and FIFA-standard pitches now available for all academy programs.",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
      date: "2024-05-25",
      author: "Academy Director",
      category: "Facility News"
    },
    {
      id: 3,
      title: "Community Outreach Program Launch",
      excerpt: "Our NGO sporting club initiates new community programs, providing free training and equipment to underprivileged youth.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=600",
      date: "2024-05-20",
      author: "NGO Coordinator",
      category: "Community"
    }
  ];

  return (
    <section id="news" className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4 md:mb-6">
            Latest News
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8">
            Stay updated with the latest happenings at Mafarah Ayew Football Academy 
            and our community initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {news.map((article, index) => (
            <Card key={article.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" data-aos="fade-up" data-aos-delay={200 + index * 100}>
              <div className="relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-wine-red text-white px-2 py-1 text-xs font-semibold rounded">
                    {article.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-4 md:p-6">
                <h3 className="font-bold text-lg md:text-xl text-secondary mb-3 leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    <span>{article.author}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center" data-aos="fade-up" data-aos-delay="500">
          <Button className="bg-wine-red hover:bg-wine-red/90 text-white px-6 md:px-8 py-2 md:py-3">
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
