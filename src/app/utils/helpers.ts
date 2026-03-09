import { User, QuickLink, Event, Announcement, FAQ, Document } from '../types';

export function filterByProfile(items: QuickLink[], user: User | null): QuickLink[] {
  if (!user) return [];
  return items.filter((item) => item.profiles.includes(user.profile));
}

export function filterBySector<T extends { sectors?: string[] }>(
  items: T[],
  sector: string
): T[] {
  return items.filter((item) => !item.sectors || item.sectors.includes(sector));
}

export function searchItems<T extends { title?: string; question?: string; answer?: string }>(
  items: T[],
  query: string
): T[] {
  const lowerQuery = query.toLowerCase();
  return items.filter((item) => {
    const searchText = [
      item.title,
      'question' in item ? item.question : '',
      'answer' in item ? item.answer : '',
    ]
      .join(' ')
      .toLowerCase();
    return searchText.includes(lowerQuery);
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatDateTime(dateString: string, timeString?: string): string {
  const formattedDate = formatDate(dateString);
  return timeString ? `${formattedDate} às ${timeString}` : formattedDate;
}

export function getUpcomingEvents(events: Event[], days: number = 7): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + days);

  return events
    .filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today && eventDate <= futureDate;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getRecentAnnouncements(announcements: Announcement[], count: number = 5): Announcement[] {
  return announcements
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
