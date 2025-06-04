import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';

const MatchesSection = () => {
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
    }
  ];

  return (
    <section id="matches" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Matches
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our upcoming fixtures and recent results as we compete 
            against top academies across the region.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upcoming Matches */}
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-8 flex items-center">
              <Calendar className="mr-3 text-wine-red" size={24} />
              Upcoming Matches
            </h3>
            <div className="space-y-6">
              {upcomingMatches.map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-lg text-secondary">
                          {match.isHome ? 'Mafarah Ayew' : match.opponent}
                          <span className="mx-2 text-wine-red">vs</span>
                          {match.isHome ? match.opponent : 'Mafarah Ayew'}
                        </h4>
                        <Badge variant="outline" className="mt-2">
                          {match.competition}
                        </Badge>
                      </div>
                      <Badge className={match.isHome ? "bg-wine-red" : "bg-gray-500"}>
                        {match.isHome ? "Home" : "Away"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        <span>{new Date(match.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        <span>{match.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2" />
                        <span>{match.venue}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Results */}
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-8 flex items-center">
              <Trophy className="mr-3 text-wine-red" size={24} />
              Recent Results
            </h3>
            <div className="space-y-6">
              {recentResults.map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-lg text-secondary mb-2">
                          {match.isHome ? 'Mafarah Ayew' : match.opponent}
                          <span className="mx-4 text-2xl font-bold text-wine-red">
                            {match.isHome ? match.homeScore : match.awayScore}
                          </span>
                          <span className="text-gray-400">-</span>
                          <span className="mx-4 text-2xl font-bold text-wine-red">
                            {match.isHome ? match.awayScore : match.homeScore}
                          </span>
                          {match.isHome ? match.opponent : 'Mafarah Ayew'}
                        </h4>
                        <Badge variant="outline" className="mb-2">
                          {match.competition}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(match.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {match.scorers && (
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">Scorers: </span>
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
