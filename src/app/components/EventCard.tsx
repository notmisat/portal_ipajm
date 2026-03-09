import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Event } from '../types';
import { formatDateTime } from '../utils/helpers';

interface EventCardProps {
  event: Event;
}

const eventTypeStyles = {
  meeting: { color: 'bg-blue-500', label: 'Reunião' },
  deadline: { color: 'bg-red-500', label: 'Prazo' },
  holiday: { color: 'bg-green-500', label: 'Feriado' },
  training: { color: 'bg-purple-500', label: 'Treinamento' },
};

export function EventCard({ event }: EventCardProps) {
  const typeStyle = eventTypeStyles[event.type];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{event.title}</CardTitle>
          <Badge className={`${typeStyle.color} text-white shrink-0`}>
            {typeStyle.label}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2 mt-2">
          <Calendar className="size-4" />
          {formatDateTime(event.date, event.time)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{event.description}</p>
      </CardContent>
    </Card>
  );
}
