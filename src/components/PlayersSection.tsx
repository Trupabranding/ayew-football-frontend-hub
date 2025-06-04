
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PlayersSection = () => {
  const players = [
    {
      id: 1,
      name: "Kwame Asante",
      position: "Forward",
      age: 17,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=400",
      stats: { goals: 24, assists: 8, appearances: 32 },
      nationality: "Ghana"
    },
    {
      id: 2,
      name: "Joseph Mensah",
      position: "Midfielder",
      age: 16,
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&q=80&w=400",
      stats: { goals: 12, assists: 18, appearances: 30 },
      nationality: "Ghana"
    },
    {
      id: 3,
      name: "Emmanuel Tetteh",
      position: "Defender",
      age: 18,
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80&w=400",
      stats: { goals: 3, assists: 5, appearances: 35 },
      nationality: "Ghana"
    },
    {
      id: 4,
      name: "Samuel Boateng",
      position: "Goalkeeper",
      age: 17,
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&q=80&w=400",
      stats: { saves: 89, cleanSheets: 18, appearances: 28 },
      nationality: "Ghana"
    }
  ];

  return (
    <section id="players" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Our Players
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Meet our talented athletes who represent the future of football. 
            Each player brings unique skills and dedication to our academy.
          </p>
          <Button className="bg-wine-red hover:bg-wine-red/90 text-white">
            View All Players
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {players.map((player) => (
            <Card key={player.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="relative">
                <img 
                  src={player.image} 
                  alt={player.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-4 right-4 bg-wine-red text-white">
                  {player.position}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-secondary mb-2">{player.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Age: {player.age}</span>
                  <span className="text-sm text-gray-500">{player.nationality}</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-secondary">Season Stats:</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {player.position === 'Goalkeeper' ? (
                      <>
                        <div className="text-center">
                          <div className="font-bold text-wine-red">{player.stats.saves}</div>
                          <div className="text-gray-500">Saves</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-wine-red">{player.stats.cleanSheets}</div>
                          <div className="text-gray-500">Clean Sheets</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-wine-red">{player.stats.appearances}</div>
                          <div className="text-gray-500">Apps</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-center">
                          <div className="font-bold text-wine-red">{player.stats.goals}</div>
                          <div className="text-gray-500">Goals</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-wine-red">{player.stats.assists}</div>
                          <div className="text-gray-500">Assists</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-wine-red">{player.stats.appearances}</div>
                          <div className="text-gray-500">Apps</div>
                        </div>
                      </>
                    )}
                  </div>
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
