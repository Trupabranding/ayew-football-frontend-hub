
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User } from 'lucide-react';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Academy Wins Regional Youth Championship",
      excerpt: "Our U-17 team secured a decisive 3-1 victory in the final match, showcasing exceptional teamwork and skill development.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=600",
      date: "2024-05-30",
      author: "Coach Williams",
      category: "Match Report"
    },
    {
      id: 2,
      title: "New Training Facility Opens",
      excerpt: "State-of-the-art training complex with modern equipment and FIFA-standard pitches now available for all academy programs.",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80&w=600",
      date: "2024-05-25",
      author: "Academy Director",
      category: "Facility News"
    },
    {
      id: 3,
      title: "Community Outreach Program Launch",
      excerpt: "Our NGO sporting club initiates new community programs, providing free training and equipment to underprivileged youth.",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&q=80&w=600",
      date: "2024-05-20",
      author: "NGO Coordinator",
      category: "Community"
    }
  ];

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Latest News
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Stay updated with the latest happenings at Mafarah Ayew Football Academy 
            and our community initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.map((article) => (
            <Card key={article.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
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
              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-secondary mb-3 leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
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

        <div className="text-center">
          <Button className="bg-wine-red hover:bg-wine-red/90 text-white px-8 py-3">
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
