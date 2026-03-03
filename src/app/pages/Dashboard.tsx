import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { EventCard } from '../components/EventCard';
import { AnnouncementCard } from '../components/AnnouncementCard';
import { 
  quickLinks, 
  mockEvents, 
  mockAnnouncements,
  mockHRHighlights 
} from '../data/mockData';
import { 
  filterByProfile, 
  filterBySector, 
  getUpcomingEvents,
  getRecentAnnouncements 
} from '../utils/helpers';
import { 
  Calendar, 
  Bell, 
  TrendingUp,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  const userLinks = filterByProfile(quickLinks, currentUser);
  const userEvents = filterBySector(
    getUpcomingEvents(mockEvents),
    currentUser.sector
  );
  const userAnnouncements = filterBySector(
    getRecentAnnouncements(mockAnnouncements, 3),
    currentUser.sector
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const profileLabels = {
    admin: 'Administrador',
    rh: 'Recursos Humanos',
    servidor: 'Servidor',
    gestor: 'Gestor',
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-green-700 to-green-900 text-white p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-6" />
            <span className="text-sm font-medium opacity-90">
              Portal Inteligente IPAJM-ES
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {getGreeting()}, {currentUser.name.split(' ')[0]}!
          </h1>
          <p className="text-green-100 max-w-2xl">
            Bem-vindo ao seu espaço personalizado. Aqui você encontra tudo o que precisa para o seu dia a dia de trabalho.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {profileLabels[currentUser.profile]}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {currentUser.sector}
            </Badge>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" asChild>
          <Link to="/events">
            <CardHeader className="pb-3">
              <CardDescription>Próximos Eventos</CardDescription>
              <CardTitle className="text-3xl">{userEvents.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4" />
                Nos próximos 7 dias
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" asChild>
          <Link to="/announcements">
            <CardHeader className="pb-3">
              <CardDescription>Comunicados Novos</CardDescription>
              <CardTitle className="text-3xl">{userAnnouncements.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bell className="size-4" />
                Últimas atualizações
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" asChild>
          <Link to="/quick-links">
            <CardHeader className="pb-3">
              <CardDescription>Links Rápidos</CardDescription>
              <CardTitle className="text-3xl">{userLinks.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="size-4" />
                Acessos do ambiente de trabalho
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Próximos Eventos</h2>
              <p className="text-muted-foreground">Agenda dos próximos dias</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/events">
                Ver todos
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {userEvents.length > 0 ? (
              userEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Nenhum evento próximo
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Recent Announcements */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Comunicados</h2>
              <p className="text-muted-foreground">Últimas atualizações</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/announcements">
                Ver todos
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {userAnnouncements.length > 0 ? (
              userAnnouncements.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Nenhum comunicado recente
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>

      {/* HR Highlights */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Destaques do RH</h2>
          <p className="text-muted-foreground">
            Informações importantes sobre benefícios, vagas e treinamentos
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {mockHRHighlights.map((highlight) => (
            <Card key={highlight.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <Badge className="w-fit mb-2" variant={
                  highlight.type === 'vacancy' ? 'default' : 
                  highlight.type === 'training' ? 'secondary' : 'outline'
                }>
                  {highlight.type === 'benefit' && 'Benefício'}
                  {highlight.type === 'vacancy' && 'Vaga'}
                  {highlight.type === 'training' && 'Treinamento'}
                  {highlight.type === 'news' && 'Novidade'}
                </Badge>
                <CardTitle className="text-base">{highlight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {highlight.description}
                </p>
                {highlight.link && (
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link to={highlight.link}>
                      Saiba mais
                      <ArrowRight className="ml-1 size-3" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}