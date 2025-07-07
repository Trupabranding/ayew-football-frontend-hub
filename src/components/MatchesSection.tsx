
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Trophy, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';

const MatchesSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
    });
  }, []);

  const upcomingMatches = [
    {
      id: 1,
      opponent: "Accra Lions Academy",
      date: "2024-06-15",
      time: "15:00",
      venue: "Mafarah Ayew Training Ground",
      competition: "Youth League",
      isHome: true
    },
    {
      id: 2,
      opponent: "Golden Eagles FC",
      date: "2024-06-22",
      time: "14:30",
      venue: "Eagles Stadium",
      competition: "Regional Cup",
      isHome: false
    }
  ];

  const recentResults = [
    {
      id: 1,
      opponent: "Tema Youth FC",
      date: "2024-05-28",
      homeScore: 3,
      awayScore: 1,
      competition: "Youth League",
      isHome: true,
      scorers: ["K. Asante (2)", "J. Mensah"]
    },
    {
      id: 2,
      opponent: "Cape Coast Academy",
      date: "2024-05-21",
      homeScore: 2,
      awayScore: 2,
      competition: "Friendly",
      isHome: false,
      scorers: ["E. Tetteh", "K. Asante"]
    },
    {
      id: 3,
      opponent: "Volta Stars FC",
      date: "2024-05-14",
      homeScore: 4,
      awayScore: 0,
      competition: "Youth League",
      isHome: true,
      scorers: ["K. Asante (3)", "S. Boateng"]
    },
    {
      id: 4,
      opponent: "Ashanti Rovers",
      date: "2024-05-07",
      homeScore: 1,
      awayScore: 3,
      competition: "Regional Cup",
      isHome: false,
      scorers: ["J. Mensah"]
    },
    {
      id: 5,
      opponent: "Northern Stars",
      date: "2024-04-30",
      homeScore: 2,
      awayScore: 1,
      competition: "Youth League",
      isHome: true,
      scorers: ["E. Tetteh", "K. Asante"]
    }
  ];

  return (
    <section id="matches" className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4 md:mb-6">
            Matches
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our upcoming fixtures and recent results as we compete 
            against top academies across the region.
          </p>
        </div>

        <div className="space-y-12 lg:space-y-16">
          {/* Upcoming Matches */}
          <div data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-secondary flex items-center">
                <Calendar className="mr-3 text-wine-red" size={28} />
                Upcoming Matches
              </h3>
            </div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {upcomingMatches.map((match, index) => (
                <Card key={match.id} className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay={300 + index * 100}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg md:text-xl text-secondary mb-2">
                          <span className={match.isHome ? "text-wine-red" : "text-secondary"}>
                            {match.isHome ? 'Mafarah Ayew' : match.opponent}
                          </span>
                          <span className="mx-2 text-wine-red font-bold">VS</span>
                          <span className={!match.isHome ? "text-wine-red" : "text-secondary"}>
                            {match.isHome ? match.opponent : 'Mafarah Ayew'}
                          </span>
                        </h4>
                        <Badge variant="outline" className="border-wine-red text-wine-red mb-3">
                          {match.competition}
                        </Badge>
                      </div>
                      <Badge className={`${match.isHome ? "bg-wine-red hover:bg-wine-red/90" : "bg-gray-600 hover:bg-gray-500"} text-white`}>
                        {match.isHome ? "Home" : "Away"}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-wine-red flex-shrink-0" />
                        <span>{new Date(match.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-wine-red flex-shrink-0" />
                        <span>{match.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-wine-red flex-shrink-0" />
                        <span className="truncate">{match.venue}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Results */}
          <div data-aos="fade-up" data-aos-delay="400">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-secondary flex items-center">
                <Trophy className="mr-3 text-wine-red" size={28} />
                Recent Results
              </h3>
              <Button variant="outline" className="border-wine-red text-wine-red hover:bg-wine-red hover:text-white transition-colors">
                <ExternalLink size={16} className="mr-2" />
                View All Matches
              </Button>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {recentResults.map((match, index) => (
                <Card key={match.id} className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay={500 + index * 100}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="text-center mb-3">
                          <div className="font-bold text-sm md:text-base text-secondary mb-2">
                            {match.isHome ? 'Mafarah Ayew' : match.opponent}
                          </div>
                          <div className="flex items-center justify-center space-x-4 text-2xl md:text-3xl font-bold">
                            <span className={`${(match.isHome && match.homeScore > match.awayScore) || (!match.isHome && match.awayScore > match.homeScore) ? 'text-green-600' : match.homeScore === match.awayScore ? 'text-yellow-600' : 'text-red-600'}`}>
                              {match.isHome ? match.homeScore : match.awayScore}
                            </span>
                            <span className="text-gray-400 text-lg">-</span>
                            <span className={`${(match.isHome && match.awayScore > match.homeScore) || (!match.isHome && match.homeScore > match.awayScore) ? 'text-green-600' : match.homeScore === match.awayScore ? 'text-yellow-600' : 'text-red-600'}`}>
                              {match.isHome ? match.awayScore : match.homeScore}
                            </span>
                          </div>
                          <div className="font-bold text-sm md:text-base text-secondary mt-2">
                            {match.isHome ? match.opponent : 'Mafarah Ayew'}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <Badge variant="outline" className="border-wine-red text-wine-red text-xs w-fit">
                            {match.competition}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(match.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {match.scorers && (
                      <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded border">
                        <span className="font-semibold text-wine-red">Scorers: </span>
                        {match.scorers.join(', ')}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchesSection;
