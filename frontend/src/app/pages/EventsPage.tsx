import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { EventCard } from '../../components/EventCard';
import { mockEvents } from '../../data/mockData';
import { filterBySector, formatDate } from '../../utils/helpers';
import { Calendar as CalendarIcon, List, Filter } from 'lucide-react';

export function EventsPage() {
  const { currentUser } = useAuth();
  const [selectedType, setSelectedType] = useState<string>('all');

  if (!currentUser) return null;

  const userEvents = filterBySector(mockEvents, currentUser.sector);

  const filteredEvents = selectedType === 'all' 
    ? userEvents 
    : userEvents.filter(event => event.type === selectedType);

  const upcomingEvents = filteredEvents.filter(
    event => new Date(event.date) >= new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = filteredEvents.filter(
    event => new Date(event.date) < new Date()
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const eventTypes = [
    { value: 'all', label: 'Todos', count: userEvents.length },
    { value: 'meeting', label: 'Reuniões', count: userEvents.filter(e => e.type === 'meeting').length },
    { value: 'deadline', label: 'Prazos', count: userEvents.filter(e => e.type === 'deadline').length },
    { value: 'holiday', label: 'Feriados', count: userEvents.filter(e => e.type === 'holiday').length },
    { value: 'training', label: 'Treinamentos', count: userEvents.filter(e => e.type === 'training').length },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Eventos e Calendário</h1>
        <p className="text-muted-foreground">
          Acompanhe reuniões, prazos, feriados e treinamentos
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filtrar por tipo:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type.value)}
              >
                {type.label}
                <Badge 
                  variant="secondary" 
                  className="ml-2"
                >
                  {type.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Janelas de Eventos */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming" className="gap-2">
            <CalendarIcon className="size-4" />
            Próximos ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="gap-2">
            <List className="size-4" />
            Passados ({pastEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <CalendarIcon className="size-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Nenhum evento próximo encontrado
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <List className="size-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Nenhum evento passado encontrado
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
