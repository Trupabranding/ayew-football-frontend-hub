
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Calendar, Download, Play } from 'lucide-react';
import AOS from 'aos';

interface Player {
  id: string;
  name: string;
  position: string | null;
  nationality: string | null;
  date_of_birth: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  photo_url: string | null;
  cv_url: string | null;
  highlight_video_url: string | null;
  bio: string | null;
  goals: number | null;
  assists: number | null;
  appearances: number | null;
  saves: number | null;
  is_featured: boolean | null;
  season: string | null;
  squad: string | null;
}

const PlayersSection = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  // Static players data
  const players: Player[] = [
    {
      id: '1',
      name: 'Kwame Asante',
      position: 'Forward',
      nationality: 'Ghana',
      date_of_birth: '2006-03-15',
      height_cm: 175,
      weight_kg: 68,
      photo_url: 'https://images.unsplash.com/photo-1594736797933-d0d6147d9c95?auto=format&fit=crop&q=80&w=300',
      cv_url: null,
      highlight_video_url: null,
      bio: 'A promising young forward with excellent dribbling skills and goal-scoring ability.',
      goals: 15,
      assists: 8,
      appearances: 22,
      saves: null,
      is_featured: true,
      season: '2023/24',
      squad: 'U-18'
    },
    {
      id: '2',
      name: 'Abena Osei',
      position: 'Midfielder',
      nationality: 'Ghana',
      date_of_birth: '2007-08-20',
      height_cm: 165,
      weight_kg: 58,
      photo_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=300',
      cv_url: null,
      highlight_video_url: null,
      bio: 'Dynamic midfielder with great vision and passing accuracy.',
      goals: 6,
      assists: 12,
      appearances: 20,
      saves: null,
      is_featured: true,
      season: '2023/24',
      squad: 'U-17'
    },
    {
      id: '3',
      name: 'Kofi Mensah',
      position: 'Goalkeeper',
      nationality: 'Ghana',
      date_of_birth: '2005-12-10',
      height_cm: 185,
      weight_kg: 75,
      photo_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=300',
      cv_url: null,
      highlight_video_url: null,
      bio: 'Reliable goalkeeper with quick reflexes and strong leadership qualities.',
      goals: 0,
      assists: 0,
      appearances: 18,
      saves: 45,
      is_featured: false,
      season: '2023/24',
      squad: 'U-18'
    },
    {
      id: '4',
      name: 'Ama Adjei',
      position: 'Defender',
      nationality: 'Ghana',
      date_of_birth: '2006-06-25',
      height_cm: 170,
      weight_kg: 62,
      photo_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300',
      cv_url: null,
      highlight_video_url: null,
      bio: 'Solid defender with excellent tackling and aerial ability.',
      goals: 2,
      assists: 4,
      appearances: 19,
      saves: null,
      is_featured: false,
      season: '2023/24',
      squad: 'U-17'
    }
  ];

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <section id="players" className="py-12 md:py-20 bg-wine-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Our Players
          </h2>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Meet the talented athletes who represent our academy with passion, skill, and dedication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {players.map((player, index) => (
            <Card key={player.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 relative" data-aos="fade-up" data-aos-delay={index * 100}>
              <CardContent className="p-6">
                <div className="text-center">
                  {player.photo_url ? (
                    <img
                      src={player.photo_url}
                      alt={player.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white/30"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-white/20 flex items-center justify-center border-4 border-white/30">
                      <User className="h-12 w-12 text-white/60" />
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-white mb-2">{player.name}</h3>
                  
                  {player.position && (
                    <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
                      {player.position}
                    </Badge>
                  )}

                  <div className="space-y-2 text-white/80 text-sm mb-4">
                    {player.nationality && (
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{player.nationality}</span>
                      </div>
                    )}
                    {player.date_of_birth && (
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Age: {calculateAge(player.date_of_birth)}</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-white/10 rounded p-2">
                      <div className="text-lg font-bold text-white">{player.goals || 0}</div>
                      <div className="text-xs text-white/70">Goals</div>
                    </div>
                    <div className="bg-white/10 rounded p-2">
                      <div className="text-lg font-bold text-white">{player.assists || 0}</div>
                      <div className="text-xs text-white/70">Assists</div>
                    </div>
                    <div className="bg-white/10 rounded p-2">
                      <div className="text-lg font-bold text-white">{player.appearances || 0}</div>
                      <div className="text-xs text-white/70">Apps</div>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="secondary" 
                        className="w-full bg-white/20 text-white hover:bg-white/30 border-white/30"
                        onClick={() => setSelectedPlayer(player)}
                      >
                        View Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      {selectedPlayer && (
                        <>
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{selectedPlayer.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="text-center">
                              {selectedPlayer.photo_url ? (
                                <img
                                  src={selectedPlayer.photo_url}
                                  alt={selectedPlayer.name}
                                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                />
                              ) : (
                                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center">
                                  <User className="h-16 w-16 text-gray-400" />
                                </div>
                              )}
                              <div className="space-y-2">
                                {selectedPlayer.position && (
                                  <Badge variant="outline">{selectedPlayer.position}</Badge>
                                )}
                                {selectedPlayer.squad && (
                                  <Badge variant="secondary">{selectedPlayer.squad}</Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                {selectedPlayer.nationality && (
                                  <div>
                                    <span className="font-medium">Nationality:</span>
                                    <p>{selectedPlayer.nationality}</p>
                                  </div>
                                )}
                                {selectedPlayer.date_of_birth && (
                                  <div>
                                    <span className="font-medium">Age:</span>
                                    <p>{calculateAge(selectedPlayer.date_of_birth)}</p>
                                  </div>
                                )}
                                {selectedPlayer.height_cm && (
                                  <div>
                                    <span className="font-medium">Height:</span>
                                    <p>{selectedPlayer.height_cm} cm</p>
                                  </div>
                                )}
                                {selectedPlayer.weight_kg && (
                                  <div>
                                    <span className="font-medium">Weight:</span>
                                    <p>{selectedPlayer.weight_kg} kg</p>
                                  </div>
                                )}
                              </div>

                              <div className="grid grid-cols-4 gap-2 text-center">
                                <div className="bg-gray-50 rounded p-2">
                                  <div className="font-bold text-lg">{selectedPlayer.goals || 0}</div>
                                  <div className="text-xs text-gray-600">Goals</div>
                                </div>
                                <div className="bg-gray-50 rounded p-2">
                                  <div className="font-bold text-lg">{selectedPlayer.assists || 0}</div>
                                  <div className="text-xs text-gray-600">Assists</div>
                                </div>
                                <div className="bg-gray-50 rounded p-2">
                                  <div className="font-bold text-lg">{selectedPlayer.appearances || 0}</div>
                                  <div className="text-xs text-gray-600">Apps</div>
                                </div>
                                {selectedPlayer.position === 'Goalkeeper' && (
                                  <div className="bg-gray-50 rounded p-2">
                                    <div className="font-bold text-lg">{selectedPlayer.saves || 0}</div>
                                    <div className="text-xs text-gray-600">Saves</div>
                                  </div>
                                )}
                              </div>

                              {selectedPlayer.bio && (
                                <div>
                                  <span className="font-medium">Biography:</span>
                                  <p className="text-sm text-gray-600 mt-1">{selectedPlayer.bio}</p>
                                </div>
                              )}

                              <div className="flex gap-2">
                                {selectedPlayer.cv_url && (
                                  <Button asChild size="sm" variant="outline">
                                    <a href={selectedPlayer.cv_url} target="_blank" rel="noopener noreferrer">
                                      <Download className="h-4 w-4 mr-1" />
                                      Download CV
                                    </a>
                                  </Button>
                                )}
                                {selectedPlayer.highlight_video_url && (
                                  <Button asChild size="sm" variant="outline">
                                    <a href={selectedPlayer.highlight_video_url} target="_blank" rel="noopener noreferrer">
                                      <Play className="h-4 w-4 mr-1" />
                                      Watch Highlights
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>

                  {player.is_featured && (
                    <Badge className="absolute top-2 right-2 bg-yellow-500 text-yellow-900">
                      Featured
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlayersSection;
