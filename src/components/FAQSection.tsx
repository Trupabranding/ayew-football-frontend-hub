
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AOS from 'aos';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  is_active: boolean;
  sort_order: number;
}

const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const groupedFAQs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4 md:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8">
            Find answers to common questions about our academy, programs, and services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {Object.entries(groupedFAQs).map(([category, categoryFAQs], categoryIndex) => (
            <div key={category} className="mb-8" data-aos="fade-up" data-aos-delay={categoryIndex * 100}>
              <h3 className="text-xl md:text-2xl font-bold text-wine-red mb-6 capitalize">
                {category.replace('_', ' ')}
              </h3>
              <div className="space-y-4">
                {categoryFAQs.map((faq, index) => (
                  <Card key={faq.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-300" data-aos="fade-up" data-aos-delay={categoryIndex * 100 + index * 50}>
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full text-left p-4 md:p-6 focus:outline-none focus:ring-2 focus:ring-wine-red focus:ring-inset"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-base md:text-lg font-semibold text-secondary pr-4">
                            {faq.question}
                          </h4>
                          {openFAQ === faq.id ? (
                            <ChevronUp className="h-5 w-5 text-wine-red flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-wine-red flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      {openFAQ === faq.id && (
                        <div className="px-4 md:px-6 pb-4 md:pb-6">
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
